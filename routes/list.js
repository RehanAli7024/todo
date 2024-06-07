const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//add task
router.post("/addTask",async(req,res)=>{
    try {
        const {title ,description, id} = req.body;
        const validUser = await User.findById(id);
       if(validUser){
        const list = new List({title,description,user : validUser});
        await list.save().then(()=>{
            validUser.list.push(list);
        validUser.save();
            res.status(200).json({list});
        })
       }
       else{
        res.status(400).json({error:"User not found"});
       }
      
    } catch (error) {
        res.status(400).json({message:"some error occured"})
    }
})

//update task
router.put("/updateTask/:id",async(req,res)=>{
    try {
        const {title ,description, email} = req.body;
        const validUser = await User.findOne({email});
       if(validUser){
            const list =  await List.findByIdAndUpdate(req.params.id,{title,description,user:validUser});
            list.save().then(()=>{
                res.status(200).json({message:"task updated"})
            });
       }
       else{
        res.status(400).json({error:"User not found"});
       }
      
    } catch (error) {
        res.status(400).json({message:"some error occured"})
    }
})

//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
      const { id } = req.body;
      const validUser = await User.findById(id);
      if (validUser) {
        await List.findByIdAndDelete(req.params.id);
        validUser.list.pull(req.params.id);
        await validUser.save();
        res.status(200).json({ message: "Task deleted" });
      } else {
        res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Some error occurred" });
    }
  });

//get Tasks
router.get("/getTask/:id",async(req,res)=>{
    try {
        const list = await List.find({user : req.params.id});
        if(list.length!=0){
            res.status(200).json({list});
        }
        else{
            res.status(200).json({message:"no task found"});
        }
        
        
    } catch (error) {
        console.log(error);

    }

})

module.exports = router;