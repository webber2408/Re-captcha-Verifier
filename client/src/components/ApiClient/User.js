import {BASE_ADDRESS} from './httpConfig';

class UserAPI{

    static async register(reqObject){
        return await fetch(BASE_ADDRESS+'/api/user/post', {
            method: 'POST',
            body: JSON.stringify(reqObject),
            header:{
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }
    
};


export default UserAPI;