import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  const fetchData = async () => {
    const response = await fetch(
      "https://64c34397eb7fd5d6ebd0aa57.mockapi.io/api/lab1/employee1"
    ).then((response) => response.json())
    .catch((eror) => alert('Lỗi lấy dữ liệu'));
    setData(response);
  };

  const handleCreateNewEmployee = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert('Full Name cannot be empty!');
      return;
    }

    if (!formData.email.trim()) {
      alert('Email Address cannot be empty!');
      return;
    }

    if (!formData.mobile.trim()) {
      alert('Salary cannot be empty!');
      return;
    }
    fetch('https://64c34397eb7fd5d6ebd0aa57.mockapi.io/api/lab1/employee1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Tạo thành công rồi!!!!');
        setFormData({
          // id: Math.random().toString(16).slice(2),
          name: '',
          email: '',
          mobile: '',
          password: ''
        });
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi rồi!!!!, lỗi là ${error?.message}`);
      });
  }

  return (
    <div className="container">
     <div className="form-container">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Salary" />
        <button type="submit" onClick={handleCreateNewEmployee}>Submit</button>
      </div>
    <table className="data-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>

  );
}

export default App;
