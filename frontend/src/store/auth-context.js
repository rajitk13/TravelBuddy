import React, { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    user:{},
    isLoggedIn:false,
    login: function(token){},
    logout: function(){}
});
let logoutTimer;


function getExpirationTime(expTime){
    const currentTime = new Date().getTime();
    const adjExpTime = new Date(expTime).getTime();
    return adjExpTime-currentTime;
}
function getStoredToken(){
    const initialToken = localStorage.getItem('token');
    const initialUser = localStorage.getItem('user');
    const storedExpDate = localStorage.getItem('expTime');
    
    const remainingTime = getExpirationTime(storedExpDate);
    if(remainingTime<=0){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expTime');
        return null;
    }
    return {
        token:initialToken,
        user:initialUser,
        duration:remainingTime
    };
}

export function AuthContextProvider(props){
    const store=getStoredToken();
    let initToken ='';
    let initUser ={};
    if(store){
        initToken=store.token;
        initUser=store.user;
    }
    const [token, setToken]=useState(initToken);
    const [user, setUser]=useState(initUser);
    const userIsLoggedIn = !!token;
    function logoutHandler(){
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    }
    function loginHandler(token,expTime,newUser){
        localStorage.setItem('token',token);
        localStorage.setItem('user',user);
        localStorage.setItem('expTime',expTime);
        setToken(token);
        setUser(newUser);
        const remainingTime = getExpirationTime(expTime);
        logoutTimer=setTimeout(logoutHandler,remainingTime);
    }
    const contextValue ={
        token,
        user,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    };
    return ( 
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;