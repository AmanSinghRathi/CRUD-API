const express = require('express');
const { route } = require('express/lib/application');
const { modelName } = require('../models/user');
const router = express.Router()
const User = require('../models/user')


router.get('/', async(req,res) => {
    try{
        const user = await User.find();
        res.json(user);
    }catch(err){
        res.send('Error:', err);
    }
})

router.get('/:username', async(req,res) => {
    try{
        const searchUser = req.params.username;
        const user = await User.findOne({username: searchUser});
        res.json(user)
        //res.send(searchUser)
    }catch(err){
        res.send('Error: ',err);
    }
})

router.post('/', async(req,res) => {
    const user = new User({
        username:req.body.username, 
        name:req.body.name, 
        phoneNo:req.body.phoneNo, 
        password:req.body.password, 
    })

    try{
        const data = await user.save();
        res.send(data);
    }
    catch(err){
        res.send('Error:', err);
    }
})

router.patch('/:username', async(req,res)=>{
    try{
        const searchUser = req.params.username;
        const user = await User.findOne({username: searchUser});

        console.log(req.body);
        if(user == null){
            res.send('Username NOT FOUND!!')
        }
        else{
            if(req.body.name !=1){
                await User.findOneAndUpdate({username : searchUser}, {name: req.body.name},{new: true})
            }
            if(req.body.password !=1){
                await User.findOneAndUpdate({username : searchUser}, {password: req.body.password},{new: true})
            }
            if(req.body.phoneNo !=1){
                await User.findOneAndUpdate({username : searchUser}, {phoneNo: req.body.phoneNo},{new: true})
            }
            res.send('UPDATED')
        }

    }catch(err){
        res.send('Error: ',err);
    }
})

router.delete('/:username', async(req,res)=>{
    try{
        const searchUser = req.params.username;
        const user = await User.findOne({username: searchUser});
        if(user == null){
            res.send('Username NOT FOUND!!');
        }
        else{
            await User.deleteOne({username: searchUser});
            res.send('DELETED')
        }
    }
    catch(err){
        res.send('Error:',err);
    }
})

module.exports = router
