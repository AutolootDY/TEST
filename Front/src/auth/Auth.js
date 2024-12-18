import React,{useState,useEffect } from "react";
import axios from 'axios';
import LoadingScreen from "../screen/LoadingScreen";
export const AuthContext= React.createContext();
export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true);
    const [checkLogout,setcheckLogout] = useState(false)
    const [statusPasswordTime,setStatusPasswordTime] = useState(false)
    const [dataUser,setDataUser] = useState()
    const checkAuthentication = ()=>{
        const token = localStorage.getItem("tokenLogin")
        console.log('tokenLogin',token);
        axios.post("http://localhost:5000/authen",{
            token:token
        })
        .then((res)=>{
            if(res.data.status==="ok"){
                //console.log(res.data);
                const {id,email,firstName,lastName,role,password_time} = res.data.decoded
                let date = new Date(password_time)
                let dateR = new Date()
                let day = Math.floor((new Date() - new Date(password_time)) / (24 * 60 * 60 * 1000))
                //console.log(date.toISOString()+" "+dateR.toISOString() +" = "+day);
                setStatusPasswordTime(day<90)
                setDataUser({id,email,firstName,lastName,role,password_time })
                setLoading(false);
            }else{
                localStorage.removeItem('tokenLogin');
                setcheckLogout(true)
                setLoading(false);
            }
        },(err)=>{
            localStorage.removeItem('tokenLoging');
            setcheckLogout(true)
            setLoading(false);
        })
    }
    useEffect(()=>{
        return ()=>{
            checkAuthentication();
        }
    },[])
    if (loading) {
        return <LoadingScreen/>;
    }
    return (
        <AuthContext.Provider value={{checkLogout,dataUser,statusPasswordTime}}>
            {children}
        </AuthContext.Provider>
    )
}
