import React, { useContext, useState } from "react"
import axios from 'axios';
import { AuthContext } from "../auth/Auth"

const PhysicalTest = ({ userId }) => {
  const [results, setResults] = useState({
    colorBlind: false,
    longSightedness: false,
    astigmatism: false,
    reflex: false,
  });
  const { checkLogout, dataUser, statusPasswordTime } = useContext(AuthContext)
  const [status, setStatus] = useState('');

  // จัดการการเปลี่ยนแปลงของ checkbox
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setResults((prev) => ({ ...prev, [name]: checked }));
  };

  // ส่งผลการทดสอบไปยัง backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // นับจำนวนผ่าน
    const passedTests = Object.values(results).filter((val) => val).length;

    // คำนวณสถานะ
    const testStatus = passedTests >= 3 ? 'passed' : 'failed';
    setStatus(testStatus);

    // ส่งข้อมูลไปยัง backend
    try {
      await axios.post("http://localhost:5000/physical-test", {
        id:dataUser.id,
        results,
        status: testStatus,
      });
      alert('Physical test results saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving test results!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Physical Test</h3>

      <label>
        <input
          type="checkbox"
          name="colorBlind"
          checked={results.colorBlind}
          onChange={handleChange}
        />
        Test for Color Blindness
      </label>

      <label>
        <input
          type="checkbox"
          name="longSightedness"
          checked={results.longSightedness}
          onChange={handleChange}
        />
        Test for Long Sightedness
      </label>

      <label>
        <input
          type="checkbox"
          name="astigmatism"
          checked={results.astigmatism}
          onChange={handleChange}
        />
        Test for Astigmatism
      </label>

      <label>
        <input
          type="checkbox"
          name="reflex"
          checked={results.reflex}
          onChange={handleChange}
        />
        Reflex Test
      </label>

      <button type="submit">Submit Results</button>

      {status && <p>Test Status: {status === 'passed' ? 'Passed' : 'Failed'}</p>}
    </form>
  );
};

export default PhysicalTest;
