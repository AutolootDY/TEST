import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/Auth";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import './LogScreen.css';
import  moment  from "moment";

const LogScreen = () => {
    const params = useParams()
    const { checkLogout ,statusPasswordTime} = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [dataLog, setDataLog] = useState({ data: [] })
    const [dataLength, setDataLength] = useState(0)
    const [dataPage, setDataPage] = useState({ data: [] })

    const [dataSearch, setDataSearch] = useState(params.date)
    const [emailSearch, setEmailSearch] = useState(params.email !== "null" ? params.email : "")
    const [statusEmailSearch, setStatusEmailSearch] = useState(params.statusEmail)
    const [statusLoginSearch, setStatusLoginSearch] = useState(params.statusLogin)
    const page = params.page

    const submitSearch = () => {
        window.location = "/Log/" + (dataSearch ? dataSearch : "all") + "/" + (emailSearch ? emailSearch : "null") + "/" + statusEmailSearch + "/" + statusLoginSearch + "/1"
    }
    const StatusEmailSearchNo = () => {
        setStatusEmailSearch("no")
        setStatusLoginSearch("no")
    }

    useEffect(() => {
        return () => {
            let checkDataSearch = params.date === "all" || moment(params.date, "YYYY-MM-DD", true).isValid();
            let checkStatusEmailSearch = params.statusEmail === "all" || params.statusEmail === "yes" || params.statusEmail === "no";
            let checkStatusLoginSearch = (params.statusLogin === "all" || params.statusLogin === "yes" || params.statusLogin === "no") && (params.statusEmail !== "no" || (params.statusEmail === "no" && params.statusLogin === "no"));
            if (checkDataSearch && checkStatusEmailSearch && checkStatusLoginSearch) {
                axios.post("http://localhost:5000/getLog", {
                    log_date: dataSearch,
                    emailSearch: emailSearch,
                    statusEmail: statusEmailSearch,
                    statusLogin: statusLoginSearch,
                    page: page
                }).then((response) => {
                    let tmp = []
                    for (let i = 0; i * 20 < response.data.length; i++) {
                        tmp.push(i + 1)
                    }
                    setDataLength(response.data.length)
                    setDataLog({ data: response.data.result })
                    setDataPage({ data: tmp })
                    setLoading(false)
                }).catch(() => {
                    alert("ไม่สามารถเชื่อมต่อกับ http://localhost:5000/getLog")
                    setLoading(false)
                })
            } else {
                setError(true)
                setLoading(false)
            }

        }
    },[])

    if (checkLogout) {
        return window.location = "/home"
    }
    if (!statusPasswordTime) {
        return window.location = "/resetPass"
    }
    if (loading) {
        return <LoadingScreen />
    }
    if (error) {
        return <ErrorScreen />
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" style={{marginTop:"10px"}} onClick={()=>window.location="/home"}>GO TO HOME</button>
            <div className="input-group mt-3">
                <span className="input-group-text">Search</span>
                <span className="input-group-text" >Date</span>
                <input type="date" className="form-control" placeholder="Date" value={dataSearch} onChange={(e) => setDataSearch(e.target.value)} />
                <span className="input-group-text" >Email</span>
                <input type="text" className="form-control" placeholder="Email" value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} />

                {/* <span className="input-group-text" >status_email</span>
                <div className="input-group-text" style={{ backgroundColor: "white" }}>
                    <input type="radio" className="form-check-input" name="status_email" checked={statusEmailSearch === "all" ? "checked" : ""} onClick={() => setStatusEmailSearch("all")} />
                    <label>&nbsp;all&nbsp;</label>
                    <input type="radio" className="form-check-input" name="status_email" checked={statusEmailSearch === "yes" ? "checked" : ""} onClick={() => setStatusEmailSearch("yes")} />
                    <label>&nbsp;yes&nbsp;</label>
                    <input type="radio" className="form-check-input" name="status_email" checked={statusEmailSearch === "no" ? "checked" : ""} onClick={() => StatusEmailSearchNo()} />
                    <label>&nbsp;no&nbsp;</label>
                </div> */}

                {/* <span className="input-group-text" >status_login</span>
                <div className="input-group-text" style={{ backgroundColor: "white" }}>
                    <input type="radio" className="form-check-input" name="status_login" checked={statusLoginSearch === "all" ? "checked" : ""} onClick={() => setStatusLoginSearch("all")} disabled={statusEmailSearch === "no" ? "disabled" : ""} />
                    <label>&nbsp;all&nbsp;</label>
                    <input type="radio" className="form-check-input" name="status_login" checked={statusLoginSearch === "yes" ? "checked" : ""} onClick={() => setStatusLoginSearch("yes")} disabled={statusEmailSearch === "no" ? "disabled" : ""} />
                    <label>&nbsp;yes&nbsp;</label>
                    <input type="radio" className="form-check-input" name="status_login" checked={statusLoginSearch === "no" ? "checked" : ""} onClick={() => setStatusLoginSearch("no")} disabled={statusEmailSearch === "no" ? "disabled" : ""} />
                    <label>&nbsp;no&nbsp;</label>
                </div> */}
                <input className="form-control btn btn-success" type="submit" value="GO" onClick={() => submitSearch()} />
            </div>

            <div className="Logbox">
                <h1 className="Logtext">Log Page</h1>
                {dataLog.data.length === 0 ? <h1 className="Logtext">Can't find the information you searched for.</h1> :
                    <table className="table table-dark table-striped" >
                        <thead >
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">date</th>
                                <th scope="col">time</th>
                                <th scope="col">ipv4</th>
                                <th scope="col">country</th>
                                <th scope="col">email</th>
                                <th scope="col">status_email</th>
                                <th scope="col">status_login</th>
                            </tr>
                        </thead>
                        <tbody >
                            {dataLog?.data?.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{((page - 1) * 20) + index + 1}</th>
                                            <td>{new Date(data.log_date).toLocaleDateString()}</td>
                                            <td>{data.log_time}</td>
                                            <td>{data.ipv4}</td>
                                            <td>{data.country}</td>
                                            <td>{data.log_email}</td>
                                            <td style={{ color: data.status_email ? "green" : "red" }}>{data.status_email ? "found email" : "not found email"}</td>
                                            <td style={{ color: data.status_login ? "green" : "red" }}>{data.status_login ? "login succeed" : "login failed"}</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>}
                <div className="spacer">
                    <button type="button" className="btn btnlog btn-outline-info" onClick={() => window.location = "/Log/" + params.date + "/" + params.email + "/" + params.statusEmail + "/" + params.statusLogin + "/" + (parseInt(params.page) - 1).toString()} disabled={page <= 1}>Prev</button>
                    {dataPage.data.map((data) => {
                        if(data.toString()===page){
                            return (
                                <button type="button"  className="btn btnlogs btn-outline-info" disabled>{data}</button>
                            )
                        }else{
                            return (
                                <button type="button" className="btn btnlog btn-outline-info" onClick={() => window.location = "/Log/" + params.date + "/" + params.email + "/" + params.statusEmail + "/" + params.statusLogin + "/" + data.toString()} >{data}</button>
                            )
                        }
                        
                    })}
                    <button type="button" className="btn btnlog btn-outline-info" onClick={() => window.location = "/Log/" + params.date + "/" + params.email + "/" + params.statusEmail + "/" + params.statusLogin + "/" + (parseInt(params.page) + 1).toString()} disabled={page * 20 >= dataLength}>next</button>
                </div>
                {/*<button type="button" className="btn btnlogs btn-outline-info" onClick={() => window.location = "/Log/" + params.date + "/" + params.email + "/" + params.statusEmail + "/" + params.statusLogin + "/" + (parseInt(params.page) + 1).toString()} disabled={page * 20 >= dataLength}>next</button> */}
            </div>
        </div>
    )

}
export default LogScreen;