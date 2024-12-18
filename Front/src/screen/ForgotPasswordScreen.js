import React, { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "../auth/Auth"
import { sendEmail } from "../sendEmail/sendEmail";
import LoadingScreen from "./LoadingScreen";
import Swal from "sweetalert2";
import './ForgotPasswordScreen.css'

const ForgotPasswordScreen = () => {
    const { checkLogout} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const showAlerts = () => {
        Swal.fire({
            title: "Success",
            text: "SENT SUCCESS",
            icon: "success",
            confirmButtonText: "OK",
            background: '#FFF',
        })
    }
    const succeed = () => {
        showAlerts();
        setLoading(false)
    }
    const failed = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Reset password fail',
            text: errorMessage,
        })
        setLoading(false)
    }
    const handleSubmit = (email) => {
        setLoading(true)
        if (email) {
            axios.post("http://localhost:5000/forgotPassword/checkEmail", {
                email: email
            }).then((response) => {
                if (response.data.status === "ok") {
                    if (response.data.message === "found email") {
                        let link = "http://localhost:3000/ForgotPassScreen/" + response.data.token
                        sendEmail(email, link, succeed, failed)
                    } else {
                        sendEmail(email, "Email ของคุณยังไม่ได้ลงทะเบียนในเว็ปไซต์ของเรา", succeed, failed)
                    }
                } else {
                    Swal.fire(response.data.message)
                    setLoading(false)
                }
            }).catch(() => {
                alert("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/forgotPassword/checkEmail")
                setLoading(false)
            })
        } else {
            setLoading(false)
        }

    }
    const handleSubmit1 = async () => {
        const { value: demail } = await Swal.fire({
            title: 'Input email address',
            input: 'email',
            inputLabel: 'Your email address',
            inputPlaceholder: 'Enter your email address'
        })
        handleSubmit(demail)
    }

    if (loading) {
        return <LoadingScreen />
    }
    if(!checkLogout){
        return window.location = "/home"
    }
    return (
        <div style={{ display: "flex", flexDirection: 'column', height: "100vh", justifyContent: 'center', alignItems: "center" }}>
            <div className="bg-img">
                <div className="contentForget">
                    <header>RECOVER PASSWORD</header>
                    <text className="forgettext" style={{ fontSize: "16px", color: "white" }}>If you've lost your password or wish to reset it,use the link below to get started.</text>

                    <div className="space">
                        <button type="button" className="btn btn-primary btn-lg" value="Reset Your Password" onClick={() => handleSubmit1()} >
                            Reset Your Password
                        </button>
                    </div>
                    <div className="space">
                        <button type="button" className="btn btnttt btn-danger btn-lg" value="Reset Your Password" onClick={() => window.location = '/'} >
                            Cancle
                        </button>
                    </div>
                    <div className="space">
                        <text className="forgettext" style={{ fontSize: "12px", color: "#FFE5D9" }}>If you did not request a password reset,you can safely ignore this email. Only a person with access to your email can reset your account password.</text>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPasswordScreen;