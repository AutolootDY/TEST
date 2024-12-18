import React, { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "../auth/Auth"

const PracticalTest = ({ userId }) => {
  const [status, setStatus] = useState(""); // เก็บสถานะการทดสอบ
  const [result, setResult] = useState(null); // เก็บผลการสอบ (ผ่าน/ไม่ผ่าน)
    const { checkLogout, dataUser, statusPasswordTime } = useContext(AuthContext)
  // ฟังก์ชันในการจัดการการเปลี่ยนแปลงสถานะการทดสอบ
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setResult(e.target.value === "passed"); // กำหนดผลการทดสอบตามสถานะ
  };

  // ฟังก์ชันบันทึกข้อมูลไปยัง Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/practical-test", {
        id:dataUser.id,
        result,
      });
      alert("Practical test result saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving test result!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Practical Test</h3>

      <div>
        <label>Test Result: </label>
        <select value={status} onChange={handleStatusChange}>
          <option value="">-- Select Result --</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <button type="submit">Submit Results</button>
    </form>
  );
};

export default PracticalTest;
