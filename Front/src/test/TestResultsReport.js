import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestResultsReport = () => {
  const [testResults, setTestResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    firstName: '',
    lastName: ''
  });

  // ฟังก์ชั่นดึงข้อมูลผลการทดสอบ
  const fetchTestResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/test-results1');
      setTestResults(response.data);
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  // ฟังก์ชั่นค้นหาผู้ทดสอบ
  const searchTestResults = async () => {
    try {
      const { firstName, lastName } = searchQuery;
      const response = await axios.get('http://localhost:5000/search-test-results', {
        params: { firstName, lastName }
      });
      setTestResults(response.data);
    } catch (error) {
      console.error('Error searching test results:', error);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  return (
    <div>
      <h1>Test Results Report</h1>

      {/* ฟอร์มค้นหาผู้ทดสอบ */}
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={searchQuery.firstName}
          onChange={(e) => setSearchQuery({ ...searchQuery, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={searchQuery.lastName}
          onChange={(e) => setSearchQuery({ ...searchQuery, lastName: e.target.value })}
        />
        <button onClick={searchTestResults}>Search</button>
      </div>

      {/* ตารางผลการทดสอบ */}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Physical Test</th>
            <th>Theory Test</th>
            <th>Practical Test</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result) => (
            <tr key={result.user_id}>
              <td>{result.user_id}</td>
              <td>{result.first_name}</td>
              <td>{result.last_name}</td>
              <td>{result.physical_result}</td>
              <td>{result.theory_result}</td>
              <td>{result.practical_result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestResultsReport;
