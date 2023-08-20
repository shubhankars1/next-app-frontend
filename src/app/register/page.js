"use client";
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    conf_password : ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    conf_password: '',
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    // Perform validation
    const validationErrors = {};
  
    if (!formData.name) {
      validationErrors.name = 'Name is required.';
    }
  
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
  
    if (!formData.conf_password) {
      validationErrors.conf_password = 'Confirm password is required.';
    } else if (formData.conf_password !== formData.password) {
      validationErrors.conf_password = 'Passwords do not match.';
    }
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      onRegister();
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function onRegister() {
    let params = {
      name : formData.name,
      email : formData.email,
      password : formData.password
    }

    const url = 'http://localhost:3001/api/register';

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
            router.push('login');
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
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <form className='w-100 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>

                <div className="d-flex mb-2 flex-row align-items-center">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput placeholder='Your Name' id='form1' type='text' className='w-100' name='name' value={formData.name} onChange={handleChange}/>
                </div>
                {errors.name && <span className='form-span'>{errors.name}</span>}

                <div className="d-flex mb-2 flex-row align-items-center">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput placeholder='Your Email' id='form2' type='email' name='email' value={formData.email} onChange={handleChange}/>
                </div>
                {errors.email && <span className='form-span'>{errors.email}</span>}

                <div className="d-flex mb-2 flex-row align-items-center">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput placeholder='Password' id='form3' type='password' name='password' value={formData.password} onChange={handleChange}/>
                </div>
                {errors.password && <span className='form-span'>{errors.password}</span>}

                <div className="d-flex mb-2 flex-row align-items-center">
                  <MDBIcon fas icon="key me-3" size='lg'/>
                  <MDBInput placeholder='Repeat your password' id='form4' type='password' name='conf_password' value={formData.conf_password} onChange={handleChange}/>
                </div>
                {errors.conf_password && <span className='form-span'>{errors.conf_password}</span>}

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <button className="mb-4 btn btn-primary" type="submit">Register</button>

                <p>Already a member? <Link href="/login">Login</Link></p>

              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}