import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css'

function Sign() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const sign = () => {
    axios
      .post(`http://localhost:5000/auth/Register`, { name: name, email: email, password: password })
      .then(() => {
        console.log('welcome new user');
        navigate('/Log');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='signn'>
      <h1 className='titleee'>Sign up here</h1>

      {/* Name Input */}
      <div className='input-container'>
        
        <input
          type='text'
          onChange={(e) => {setName(e.target.value)}}
          required
        />
        <label className='label'> name</label>
        <div className='underline'></div>
      </div>

      {/* Email Input */}
      <div className='input-container'>
        <input
          type='text'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label className='label'> email</label>
        <div className='underline'></div>
      </div>

      {/* Password Input */}
      <div className='input-container'>
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label className='label'> password</label>
        <div className='underline'></div>
      </div>

      <button className='Butt' onClick={() => sign()}>
        Sign up
      </button>
    </div>
  );
}

export default Sign;
