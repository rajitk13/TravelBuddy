const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        validate(value){
            if(value.includes('password')|| value.includes('qwerty')){
                throw new Error('Select a strong password');
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        toLowerCase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter validate Email');
            }
        }
    },
    identification:{
        type:String,
        required:true
    },
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }],
    phone:{
        type:String,
        required:true,
        validate(value){
            if(!value.length===10){
                throw new Error("Invalid Phone Number");
            }
        }
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
    }],
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateToken = async function(){
    const newId=this._id.toString();

    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    
    this.tokens=this.tokens.concat({token});
    
    await this.save();
    return token;
}

userSchema.methods.getProfile = async function(){
    const requiredFields = ['name','email','requests','identification','phone'];
    try {
        await this.populate({
            path:'requests',
            select:{
                name:1,
                from:1,
                to:1,
                when:1,
                interested:1,
                requiredStrength:1
            },
            populate:[{
                path:'interested',
                select:'name identification email phone -_id'
            },{
                path:'creator',
                select:'name -_id'
            }]
           
        });
        const profile = Object.fromEntries(requiredFields.map((key) => [key, this[key]]));
        return profile;
    } catch (error) {
        console.log(error);
        throw new Error("Could not populate profile");
    }
    
}


userSchema.statics.findByCredentials = async function(identification,password){
    
    const match = await User.findOne({identification});
    
    if(!match) throw new Error("Unable to login");
    
    const passwordIsMatch =await bcrypt.compare(password,match.password);

    if(!passwordIsMatch) throw new Error("Unable to login");
    return match;
  
}
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password =await  bcrypt.hash(this.password, 8);
    }
    next();
});
const User = mongoose.model('User',userSchema);
module.exports=User;