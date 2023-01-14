const express = require("express");
const Request = require("../models/Request");
const requestRouter = new express.Router();
const authentication = require("../middleware/auth");
const mongoose = require("mongoose");
//get all requests
requestRouter.get("/requests", authentication, async function (req, res) {
  try {
    const allRequests = await Request.find().populate("creator", "name").lean();
    //***Check at the frontend that if request.interested.length === requiredStrength then disable the interested button***
    if (allRequests.length !== 0) {
      allRequests.forEach((request)=>{
        if(request.creator._id.toString()===req.user._id.toString()){
          request.disabled=true;
        } else {
          request.disabled=false;
        }
    });

      res.json(allRequests);
    } 
    else res.send(JSON.stringify({ empty: true }));
  } catch (e) {
    res.status(404).send(JSON.stringify({ error: true }));
  }
});

requestRouter.get("/requests/me", authentication, async function (req, res) {
  const _id = req.user._id;
  try {
    const allRequests = await Request.find({ creator: req.user._id }).populate([
      {
        path: "interested",
        select: "name identification email phone -_id",
      },
      {
        path: "creator",
        select: "name -_id",
      },
    ]);
    res.json({ allRequests });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "There was an error fetching documents" });
  }
});

requestRouter.delete(
  "/requests/:requestId",
  authentication,
  async function (req, res) {
    try {
      const foundRequest = await Request.findById(req.params.requestId);
      if (foundRequest.creator.toString() !== req.user._id.toString()) {
        return res.status(400).send("You cannot delete this request");
      }
      await Request.deleteOne({ _id: req.params.requestId });
      res.send("Successfully deleted the request");
    } catch (error) {
      res.status(404).send("There was error deleting the request" + error);
    }
  }
);

//Create new Request
requestRouter.post("/requests", authentication, async function (req, res) {
  const request = {
    _id: new mongoose.Types.ObjectId(),
    from: req.body.from,
    to: req.body.to,
    when: req.body.when,
    creator: mongoose.Types.ObjectId(req.user._id),
    requiredStrength: req.body.requiredStrength,
  };
  const newRequest = new Request(request);
  try {
    req.user.requests.push(newRequest._id);
    await newRequest.save();
    await req.user.save();
    res.json({ message: "Successfully created Request" });
  } catch (error) {
    res.status(404).json({error:"There was an error creating request"});
  }
});

//Show interest in new request
requestRouter.post(
  "/requests/:requestId/interested",
  authentication,
  async function (req, res) {
    const requestId = req.params.requestId;
    try {
      const foundRequest = await Request.findOne({ _id: requestId });

      //Check if interested array length === requiredStrength
      if (foundRequest.interested.length === foundRequest.requiredStrength)
        return res.send(JSON.stringify({ full: true }));

      //Check if the user has already show interest before
      const interestedBefore = foundRequest.interested.includes(req.user._id);
      if (interestedBefore)
        return res.send(JSON.stringify({ interestedBefore: true }));

      foundRequest.interested.push(req.user._id);
      await foundRequest.save();
      res.json({ message: "Successfully registered your response" });
    } catch (error) {
      res.status(404).send({ error: true });
    }
  }
);

module.exports = requestRouter;
