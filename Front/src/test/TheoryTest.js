import React, { useContext, useState } from "react"
import axios from "axios";
import { AuthContext } from "../auth/Auth"

const TheoryTest = ({ userId }) => {
  const [scores, setScores] = useState({
    trafficSigns: 0,
    roadMarkings: 0,
    rightOfWay: 0,
  });
  const [status, setStatus] = useState("");
  const { checkLogout, dataUser, statusPasswordTime } = useContext(AuthContext)

  // จัดการการเปลี่ยนแปลงของ input คะแนน
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(50, parseInt(value) || 0)), // จำกัดคะแนนระหว่าง 0-50
    }));
  };

  // ส่งผลการทดสอบไปยัง backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // คำนวณคะแนนรวม
    const totalScore =
      scores.trafficSigns + scores.roadMarkings + scores.rightOfWay;

    // คำนวณสถานะ
    const testStatus = totalScore >= 120 ? "passed" : "failed";
    setStatus(testStatus);

    // ส่งข้อมูลไปยัง backend
    try {
      await axios.post("http://localhost:5000/theory-test", {
        id:dataUser.id,
        scores,
        status: testStatus,
      });
      alert("Theory test results saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving test results!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Theory Test</h3>

      <label>
        Traffic Signs (0-50):
        <input
          type="number"
          name="trafficSigns"
          value={scores.trafficSigns}
          onChange={handleChange}
        />
      </label>

      <label>
        Road Markings (0-50):
        <input
          type="number"
          name="roadMarkings"
          value={scores.roadMarkings}
          onChange={handleChange}
        />
      </label>

      <label>
        Right of Way (0-50):
        <input
          type="number"
          name="rightOfWay"
          value={scores.rightOfWay}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit Results</button>

      {status && <p>Test Status: {status === "passed" ? "Passed" : "Failed"}</p>}
    </form>
  );
};

export default TheoryTest;
