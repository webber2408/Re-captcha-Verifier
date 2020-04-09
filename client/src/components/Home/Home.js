import React, {useState, useEffect} from 'react';
import Register from '../Register/Register';
import IPAuth from '../ApiClient/IPAuth'; 

const Home = () => {
    const [needsVerification, setNeedsVerification] = useState(false);

    useEffect(() => {
        IPAuth.checkIP()
        .then(data => {
            if(data.exhaustedAttempts){
                setNeedsVerification(true);
            }
        })
    }, []);

    return(
        <div className="home-wrapper">
            <Register needsVerification = {needsVerification}/>
        </div>
    )
};

export default Home;