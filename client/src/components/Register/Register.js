import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import swal from 'sweetalert';
import UserAPI from '../ApiClient/User';
import Recaptcha from 'react-recaptcha';
import './Register.css';

const Register = ({needsVerification}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerfied] = useState(false);
    let recaptchaInstance;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            swal({
                title: "Err!",
                text: "Please fill all the fields.",
                icon: "error",
            });
        }
        else{
            if(needsVerification){
                //User submitting more than required times from same IP
                if(verified){
                    submitForm();
                    resetCaptcha();
                }else{
                    swal({
                        title: "Err!",
                        text: "Please verify that you are not a robot!",
                        icon: "error",
                    });
                }
            }else{
                submitForm();
            }
        }
    }

    const resetCaptcha = () => {
        recaptchaInstance.reset();
        setVerfied(false);
    }

    const submitForm = () => {
        const reqObject = {
            name,
            email,
            password
        };
        UserAPI.register(reqObject)
        .then(data => {
            swal({
                title: "Success",
                text: "User registered successfully!",
                icon: "success"
            });
            clearForm();
        })
        .catch(err => {
            swal({
                title: "Err!",
                text: "There was some error in registering, please try again later!",
                icon: "error",
            });
        });
    }

    const clearForm = () => {
        document.querySelector('#email').value = "";
        setEmail("");
        document.querySelector('#password').value = "";
        setPassword("");
        document.querySelector('#name').value = "";
        setName("");
    }

    const verifyCallback = (response) => {
        if(response){
            setVerfied(true);
        }else{
            setVerfied(false);
        }
    }

    const loadCallback = () => {
        console.log("Captcha Loaded!");
    }

    return(
        <div className="form-wrapper">
            <TextField 
                required
                variant = "outlined"
                autoComplete = "off"
                id="name"
                className = "form-field"
                defaultValue = ""
                label = "Name"
                onChange = {(e) => setName(e.target.value)}
            />
            <br/><br/>
            <TextField 
                required
                variant = "outlined"
                id="email"
                autoComplete = "off"
                defaultValue = ""
                className = "form-field"
                label = "Email"
                onChange = {(e) => setEmail(e.target.value)}
            />
            <br/><br/>
            <TextField 
                required
                id="password"
                variant = "outlined"
                autoComplete = "off"
                className = "form-field"
                defaultValue = ""
                label = "Password"
                onChange = {(e) => setPassword(e.target.value)}
            />
            {
                needsVerification?
                <div>
                    <br/>
                    <Recaptcha
                        ref={e => recaptchaInstance = e}
                        sitekey="6LeO0OcUAAAAAEjPS3aRvdeX5c0HNAnV9siKwtmw"
                        render="explicit"
                        verifyCallback={verifyCallback}
                        onloadCallback={loadCallback}
                    />
                </div>
                :null
            }
            <Button
                variant = "contained"
                color = "primary"
                className = "form-submit"
                onClick = {(e)=> handleSubmit(e)}
            >Submit</Button>
        </div>
    );
};

export default Register;
