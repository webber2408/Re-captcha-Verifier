const User = require('../models/User');

const addUser = async (req, res) => {
    try{
        const user = new User({...JSON.parse(req.body)});
        return await user.save();
    }catch(err){
        console.log("Error adding user: "+err);
    }
};

module.exports = {
    addUser
}