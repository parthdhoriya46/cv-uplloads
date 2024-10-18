import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of employees on component mount
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/employee');
        setEmployees(response.data.employees);
        console.log(response.data.employees,'response.data.employees')
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDownload = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/employee/download/${employeeId}`);
      const { downloadUrl } = response.data;
      // Trigger download by opening the URL
      window.open(downloadUrl, '_blank');
    } catch (err) {
      console.error('Error fetching download link', err);
      alert('Error downloading CV');
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => handleDownload(employee._id)}>Download CV</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
