const IPAuth = require('../models/IPAuth');
const moment = require('moment');

const checkIP = async (req, res) => {
    try{
        const ipObject = {
            ip: req.ip,
            dateTime: moment(new Date()).format('DD MMM YYYY')
        };
        const storedIpObject = await IPAuth.findOne({'ip':ipObject.ip});
        if(storedIpObject){
            const storedDate = moment(storedIpObject.dateTime);
            const currentDate = moment(ipObject.dateTime);
            if(currentDate.diff(storedDate) == 0){
                //Same Date Request
                if(storedIpObject.frequency >= 3){
                    return {
                        exhaustedAttempts: true,
                        leftAttempts: 0,
                        message: "User has exhausted available attempts to register. Verify now!"
                    }
                }else{
                    const newFrequency = storedIpObject.frequency + 1;
                    const updatedIp = await IPAuth.findByIdAndUpdate(storedIpObject._id, {frequency: newFrequency}, {upsert: true}, (err, res) => {});
                    if(!updatedIp){
                        return {
                            exhaustedAttempts: false,
                            leftAttempts: -1,
                            message: "Unable to update the frequency!"
                        }
                    }else{
                        return {
                            exhaustedAttempts: false,
                            leftAttempts: (3-newFrequency),
                            message: "User has available limits to register."
                        }
                    }
                }
            }else{
                //Request on another date
                const anotherDateIp = await IPAuth.findByIdAndUpdate(storedIpObject._id, { $set: {dateTime: ipObject.dateTime, frequency: 1 } }, {upsert: true}, (err, res) => {});
                if(!anotherDateIp){
                    return {
                        exhaustedAttempts: false,
                        leftAttempts: -1,
                        message: "Unable to update the ip object for new date!"
                    }
                }else{
                    return {
                        exhaustedAttempts: false,
                        leftAttempts: 2,
                        message: "IP Address updated for another date request"
                    }
                }
            }            
        }else{
            //Request from new IP
            ipObject.frequency = 1;
            const newIp = new IPAuth({...ipObject});
            const saveResult = await newIp.save();
            if(saveResult){
                return {
                    exhaustedAttempts: false,
                    leftAttempts: 2,
                    message: "New IP Address Request Recorded"
                }
            }else{
                return {
                    exhaustedAttempts: false,
                    leftAttempts: -1,
                    message: "Unable to save new IP Object"
                }
            }
        }
    }catch(err){
        console.log("There were errors checking IP request! "+err);
        return;
    }
};

module.exports = {
    checkIP
}