import {BASE_ADDRESS} from './httpConfig';
class IPAuth{
    static async checkIP(){
        return await fetch(BASE_ADDRESS+'/api/ip/check', {
            method: 'GET',
            header:{
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }
};
export default IPAuth;