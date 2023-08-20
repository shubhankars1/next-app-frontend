"use client";
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

export default function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email : '',
    password : '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    const validationErrors = {};
  
    if (!formData.email) {
      validationErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email address.';
    }
  
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      onLogin();
    }
  }

  function onLogin() {
    let params = {
      email : formData.email,
      password : formData.password
    }
    
    const url = 'http://localhost:3001/api/login';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    };
  
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          swal({
            title: "Success",
            text: responseData.message,
            icon: "success",
          })
          .then(res => {
            router.push('/');
          });
        } else {
          swal({
            title: "Failure",
            text: responseData.message,
            icon: "error",
          })
        }
      })
      .catch(error => {
        swal({
          title: "Failure",
          text: 'Something went wrong',
          icon: "error",
        })
        .then(res => {
          console.error('Error:', error);
        });
      });
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 border">

      <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Login</h1>

        <div>
          <h6>Email</h6>
          <MDBInput 
            wrapperClass='mb-2' 
            name='email'
            placeholder='Email address' 
            id='form1' 
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className='form-span'>{errors.email}</span>}
        </div>

        <div className="password-input-wrapper">
          <h6>Password</h6>
          <MDBInput
            className="password-input"
            name='password'
            placeholder="Password"
            id="form2"
            type={passwordVisible ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
          />

          <MDBIcon
            icon={passwordVisible ? 'eye-slash' : 'eye'}
            className={`password-toggle-icon ${passwordVisible ? 'visible' : ''}`}
            onClick={handlePasswordToggle}
          />

          {errors.password && <span className='form-span'>{errors.password}</span>}
        </div>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <button type='submit' className="mb-4 btn btn-primary">Sign in</button>

        <div className="text-center">
          <p>Not a member? <Link href="/register">Register</Link></p>
          <p>or sign up with:</p>

          <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>

          </div>
        </div>
      </form>

    </MDBContainer>
  );
}