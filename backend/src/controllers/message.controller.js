import User from "../models/user.model.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllUsersforSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");
      
        res.status(200).json(filteredUsers); 
    } catch (error) {
        console.log("Error in getAllUsersforSidebar: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getMessages = async(req,res)=>{
   try {
      const {id:userToChatId} = req.params;
      const myId = req.user._id;

      const messages = await Message.find({
        $or:[
            {senderId: myId, reciverId: userToChatId},
            {senderId: userToChatId, reciverId: myId},
        ],
      });
      res.status(200).json(messages);

   } catch (error) {
    console.log("Error in get messages", error.message);
    res.status(500).json({error:"Internal Server Error"});
   }
};

export const sendMessage = async(req,res)=>{
    try {
        const {text, image} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;
        let imageURL = "";

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageURL,
        });
        await newMessage.save();

        res.status(201).json(newMessage);

    //TODO: REAL TIME FUNCTIONALITY WITH SOCKETIO
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};