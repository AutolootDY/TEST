import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../auth/Auth"

const TestResultStatus = () => {
  // const { dataUser } = useContext(AuthContext); // ดึงข้อมูลผู้ใช้จาก AuthContext
  const { checkLogout, dataUser, statusPasswordTime } = useContext(AuthContext)
  const [status, setStatus] = useState(""); 
  const [results, setResults] = useState({
    physical: null,
    theory: null,
    practical: null
  });

  // ฟังก์ชันดึงผลการทดสอบ
  useEffect(() => {
    const fetchTestResults = async () => {
     

      try {
        // await axios.post("http://localhost:5000/physical-test", {
        //   id:dataUser.id,
        //   results,
        //   status: testStatus,
        // });
        console.log('dataUser in TestResults:', dataUser);
        const response = await axios.post("http://localhost:5000/test-results", {
        id:dataUser.id,});
        const data = response.data;
        console.log('dataUser in TestResults:', data);
        setResults({
          physical: data.physical,
          theory: data.theory,
          practical: data.practical
        });

        // คำนวณสถานะการทดสอบ
        if (data.physical && data.theory && data.practical) {
          setStatus("ผ่านการทดสอบ");
        } else if (data.physical === null || data.theory === null || data.practical === null) {
          setStatus("รอพิจารณา");
        } else {
          setStatus("ไม่ผ่านการทดสอบ");
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching test results");
      }
    };

    fetchTestResults();
  }, [dataUser]); // ตรวจสอบการเปลี่ยนแปลงใน dataUser

  return (
    <div>
      <h3>Test Result Status</h3>
      <p>Physical Test: {results.physical ? "Passed" : results.physical === null ? "Not Completed" : "Failed"}</p>
      <p>Theory Test: {results.theory ? "Passed" : results.theory === null ? "Not Completed" : "Failed"}</p>
      <p>Practical Test: {results.practical ? "Passed" : results.practical === null ? "Not Completed" : "Failed"}</p>
      <h4>Status: {status}</h4>
    </div>
  );
};

export default TestResultStatus;
