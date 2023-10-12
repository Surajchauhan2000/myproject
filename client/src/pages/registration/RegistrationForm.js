import React, { useState } from 'react';
import "./registration.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // const {showAlert}=props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Call the registration API here using axios or any other HTTP library
    // For simplicity, we'll just log the data for now
    try{
      const response=await axios.post('http://localhost:8800/api/auth/register',formData);
      console.log(response.data.message);
      // navigate("/");
      setFormData({
        username:'',
        email:'',
        password:''
      });
    }catch(error){
      // props.showAlert('Error','danger');
      console.error('error during to time of registration')

    }
    console.log('Registration Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup Here</h2>
      <div className="registration">
        <div className="rContainer">
        <input
          className="lInput"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder='username'
          required
        />

          <input
          className="lInput"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='email'
          required
        />


          <input
          className="lInput"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder='password'
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <button className="lButton" type="submit">SignUp</button>
    </form>
  );
};

export default RegistrationForm;
