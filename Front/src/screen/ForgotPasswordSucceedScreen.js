import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import validator from 'validator'
import axios from "axios"
import LoadingScreen from "./LoadingScreen"
import ErrorScreen from "./ErrorScreen"
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa'
import Swal from 'sweetalert2'
import './RegisterScreen.css'
const ForgotPasswordSucceedScreen = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [dataFormToken, setDataFormToken] = useState()
    const [statusQuestion, setStatusQuestion] = useState(false)
    const [answer, setAnswer] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [statusPassword, setStatusPassword] = useState(undefined)
    const [rePasswordSucceed, setRePasswordSucceed] = useState(false)

    const checkToken = () => {
        axios.post("http://localhost:5000/forgotPassword/authen", {
            token: params.token
        })
            .then((res) => {
                if (res.data.status === "ok") {
                    setDataFormToken(res.data.decoded)
                    setLoading(false)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Fail',
                        text: "Your link is invalid or timed out.",
                    })
                    setError(true)
                    setLoading(false)
                }
            }).catch(() => {
                Swal.fire("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/forgotPassword/authen โปรดแจ้ง admin");
                setLoading(false)
            })
    }

    const checkAnswer = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post("http://localhost:5000/forgotPassword/checkAnswer", {
            id: dataFormToken.id,
            answer: answer
        })
            .then((res) => {
                if (res.data.status === "ok") {
                    if (res.data.message === "correct") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: "Correct answer",
                        })
                        setStatusQuestion(true)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Fail',
                            text: "Wrong answer",
                        })
                    }
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }).catch(() => {
                alert("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/forgotPassword/checkAnswer โปรดแจ้ง admin");
                setLoading(false)
            })
    }

    const ChangePassword = () => {
        setLoading(true)
        axios.post("http://localhost:5000/forgotPassword/changePassword2", {
            id: dataFormToken.id,
            password: password
        })
            .then((res) => {
                if (res.data.status === "duplicate") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Reset password fail',
                        text: "You have already used this password, please change it.",
                    })
                    setLoading(false)
                } else if (res.data.status === "ok") {
                    if (res.data.result.affectedRows >= 1) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Reset password succuss',
                            text: "Go to login",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = '/'
                            } 
                        })
                        setRePasswordSucceed(true)
                        setLoading(false)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Reset password Failed',
                            text: "Contact admin",
                        })
                        setLoading(false)
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Reset password Failed',
                        text: res.data.message,
                    })
                    setLoading(false)
                }
            }).catch(() => {
                Swal.fire("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/forgotPassword/changePassword โปรดแจ้ง admin");
                setLoading(false)
            })
    }

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
    const submitChangePassword = (e) => {
        e.preventDefault();
        setLoading(true)
        if (password && repeatPassword) {
            if (statusPassword) {
                if (password === repeatPassword) {
                    ChangePassword()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Reset password fail',
                        text: "Password not match confirm password",
                    })
                    setLoading(false)
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Reset password fail',
                    text: "Password is not strong",
                })
                setLoading(false)
            }
        } else {
            Swal.fire("Please complete the information.")
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            checkToken()
        }
    },[]);
    if (loading) {
        return <LoadingScreen />
    }
    if (error) {
        return <ErrorScreen />
    }
    ////////หน้าตอบคำถาม
    if (!statusQuestion) {
        return (
            <body>
                <div className="bg-img">
                    <div className="content">
                        <header>Question : </header>
                        <div className="pass">
                            <label>{dataFormToken.question}</label>
                        </div>
                        <form onSubmit={checkAnswer}>
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" required /><br /><br />
                            </div>
                            <div className="space">
                                <button type="submit" className="btn btn-primary btn-lg" value="Submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        )
    }
    ///////รีรหัสผ่านเสร็จแล้ว
    if(rePasswordSucceed){
        return(
            <body>
                <div className="bg-img">
                    <div className="content">
                        <header>Reset Password Succeed</header>
                            <div className="space">
                                <button type="button" className="btn btn-primary btn-lg" value="Submit" onClick={()=>window.location = "/"}>GO LOGIN</button>
                            </div>
                    </div>
                </div>
            </body>
        )
    }
    ///////รีรหัสผ่านถ้าตอบถูก
    return (
        <body>
            {!statusPassword && (password !== "") ?
                <div className="alert alert-danger" style={{ width: "30%", left: "70%" }}>
                    <strong>Warning!</strong>
                    <label>Passwords must be at least 8 characters in length</label>
                    <label>a minimum of 1 lower case letter [a-z]</label>
                    <label>a minimum of 1 upper case letter [A-Z]</label>
                    <label>a minimum of 1 numeric character [0-9]</label>
                    <label>{'a minimum of 1 special character: ~`!@#$%^&*()-_+={}[]|;:"<>,./?'}</label>
                </div>
                : <></>}
            <div className="bg-img">
                <div className="content">
                    <header>Reset Password</header>
                    <form onSubmit={submitChangePassword}>
                        <div className="pass">
                            <label >New Password:</label>
                            &ensp;
                            <label style={{ color: statusPassword ? "#00FFAB" : "#FF1100" }}>{(password === "") ? "" : statusPassword ? "Is Strong Password" : "Is Not Strong Password"}</label>
                        </div>
                        <div className="field">
                            <span className="fa fa-user"></span>
                            <input type={showPassword?"text":"password"} value={password} onChange={(e) => checkPassword(e.target.value)} required />
                            <button type="button" style={{border:'transparent',backgroundColor:'transparent',fontSize:'12px',marginRight:'10px',color:'grey'}} className="showbutton" onClick={() => setShowPassword(!showPassword)}>{showPassword?<FaRegEye size={20}/>:<FaRegEyeSlash size={20}/>}</button>
                        </div>
                        <div className="pass">
                            <label>Confirm Password:</label>
                            &ensp;
                            <label style={{ color: (password === repeatPassword) ? "#00FFAB" : "#FF1100" }}>{repeatPassword === "" ? "" : (password === repeatPassword) ? "the same" : "not the same"}</label>
                        </div>
                        <div className="field">
                            <span className="fa fa-user"></span>
                            <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                        </div>
                        <div className="field space">
                            <input type="submit" value="Reset" />
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}
export default ForgotPasswordSucceedScreen;