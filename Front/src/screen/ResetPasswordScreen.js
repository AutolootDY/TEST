import React, { useContext, useState } from "react"
import { AuthContext } from "../auth/Auth"
import axios from "axios"
import validator from 'validator'
import LoadingScreen from "./LoadingScreen"
import Swal from 'sweetalert2'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa'
// import './LoginScreen.css'
import './RegisterScreen.css'
import './ResetPasswordScreen.css'
const ResetPasswordScreen = () => {
    const { checkLogout, dataUser, statusPasswordTime } = useContext(AuthContext)
    //const params = useParams()
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [statusPassword, setStatusPassword] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [statusReset, setStatusReset] = useState(false)

    const checkPassword = (value) => {
        setPassword(value)
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setStatusPassword(true)
        } else {
            setStatusPassword(false)
        }
    }
    // const showPassword=(idName)=> {
    //     var x = document.getElementById(idName);
    //     if (x.type === "password") {
    //         x.type = "text";
    //     } else {
    //         x.type = "password";
    //     }
    // }

    const rePassword = (e)=>{
        e.preventDefault();
        if(!statusPassword){
            Swal.fire({
                icon: 'error',
                title: 'Reset password fail',
                text: "Password is not strong",
            })
            return
        }
        if(!(password === repeatPassword)){
            //alert("Password not match confirm password")
            Swal.fire({
                icon: 'error',
                title: 'Reset password fail',
                text: "Password not match confirm password",
            })
            return
        }
        setLoading(true)
        axios.post("http://localhost:5000/resetPassword2",{
                id:dataUser.id,
                password:password
            }).then((response)=>{
                if(response.data.status === "duplicate"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Reset password fail',
                        text: "You have already used this password, please change it.",
                    })
                    setLoading(false)
                }else if(response.data.status === "ok"){
                        // Swal.fire({
                        //     icon: 'success',
                        //     title: 'Reset password succuss',
                        //     text: "Go to home",
                        // })
                        // setLoading(false)

                    localStorage.setItem("tokenLogin", response.data.token)
                    Swal.fire({
                        icon: 'success',
                        title: 'Reset password succuss',
                        text: "Go to home",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = '/'
                        } 
                    })
                    setLoading(false)
                    setStatusReset(true)
                    //window.location = '/home'
                }
            }).catch(()=>{
                Swal.fire("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/resetPassword")
                setLoading(false)
            })
    }
    
    // useEffect(() => {
    //     return () => {
    //         console.log("test");
    //     }
    // }, []);

    if (checkLogout) {
        return window.location = '/'
    }
    if(loading){
        return <LoadingScreen/>
    }
    if(statusReset){
        return(
            <div className="bg-img">

            <div className="content">
                <header>Reset Password Succeed</header>
                <div className="space">
                    <button type="button" onClick={() => window.location = '/'} className="btn btnRegister btn-primary btn-lg" value="go to Login">go to Login</button>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="bg-img">
            {!statusPassword && (password !== "")?
                    <div className="alert alert-danger" style={{width:"30%",left:"70%"}}>
                        <strong>Warning!</strong>
                        <label>Passwords must be at least 8 characters in length</label>
                        <label>a minimum of 1 lower case letter [a-z]</label>
                        <label>a minimum of 1 upper case letter [A-Z]</label>
                        <label>a minimum of 1 numeric character [0-9]</label>
                        <label>{'a minimum of 1 special character: ~`!@#$%^&*()-_+={}[]|;:"<>,./?'}</label>
                    </div>
                :<></>}
            <div className="contentReset">
                <header>Reset Password</header>
                <h3 style={{ color: "#fff" }}>{!statusPasswordTime ? "เนื่องจากคุณใช้รหัสผ่านนี้มานานกว่า 90 วันแล้ว กรุณาเปลี่ยนรหัสผ่านใหม่" : ""}</h3>
                <form onSubmit={rePassword}>
                    <div className="pass">
                        <label>New Password:</label>
                        <label style={{ color: statusPassword ?  "#00FFAB" : "#FF1100" }} >{(password === "") ? "" : statusPassword ? "Is Strong Password" : "Is Not Strong Password"}</label>
                    </div>
                    <div className="field">
                        <span className="fa fa-user"></span>
                        <input type={showPassword?"text":"password"} id="newpassword" placeholder="New Password" value={password} onChange={(e) => checkPassword(e.target.value)}  required/>
                        <button type="button" style={{border:'transparent',backgroundColor:'transparent',fontSize:'12px',marginRight:'10px',color:'grey'}} className="showbutton" onClick={() => setShowPassword(!showPassword)}>{showPassword?<FaRegEye size={20}/>:<FaRegEyeSlash size={20}/>}</button>
                        <br /><br />
                    </div>
                    <div className="pass">
                        <label>Verity Password:</label>
                        <label style={{ color: (password === repeatPassword) ?  "#00FFAB" : "#FF1100" }} >{repeatPassword===""?"":(password === repeatPassword)? "the same" : "not the same"}</label>
                    </div>
                    <div className="field">
                        <span></span>
                        <input type="password" id="veritypassword" placeholder="Verity Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required/>
                        {/* <button type="button" style={{border:'transparent',backgroundColor:'transparent',fontSize:'12px',marginRight:'10px',color:'grey'}} className="showbutton" onClick={() => showPassword("veritypassword")}>show</button> */}
                        <br /><br />
                    </div>
                    {/* <div className="btn_submit">
                        <button className="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div> */}
                    <div className="space">
                        <button type="submit" className="btn btnRegister btn-primary btn-lg" value="Submit">Submit</button>
                    </div>
                </form>
                <div className="space">
                    <button type="button" onClick={() => window.location = '/'} className="btn btnRegister btn-danger btn-lg" value="go to Login">Cancel</button>
                </div>
            </div>
        </div>

    )
}
export default ResetPasswordScreen;