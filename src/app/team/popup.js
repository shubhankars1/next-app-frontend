"use client";
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import './team.css';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBSelect
  }
from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import swal from 'sweetalert';

export default function Popup({ isOpen, onClose, popupData }) {
  if (!isOpen) return null;

  const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
  }

  const router = useRouter();

  const emptyState =  {
                        popupType: '',
                        name : '',
                        email : '',
                        title : '',
                        avatar : '',
                        dept : '',
                        position : '',
                        status : ''
                      }

   const [formData, setFormData] = useState(emptyState);
 
   const [errors, setErrors] = useState(emptyState);

   useEffect(() => {
    const initialState = {
      popupType: popupData?.popupType,
      name : popupData?.name,
      email : popupData?.email,
      title : popupData?.title,
      avatar : popupData?.avatar,
      dept : popupData?.dept,
      position : popupData?.position,
      status : popupData?.status
    };
      if (popupData?.popupType == 'Add') {
        setFormData({...emptyState});
      } else {
        setFormData(initialState);
      }
  }, []);
  
   function isValidEmail(email) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
   }

   const handleReset = () => {
    setFormData({...emptyState});
   };
 
   function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
   }

   const handleImageChange = (event) => {
      // setSelectedImage(URL.createObjectURL(event.target.files[0]));
      // setFormData({ ...formData, ['avatar']: URL.createObjectURL(event.target.files[0]) });
      setFormData({ ...formData, ['avatar']: event.target.files[0] });
   };
 
   function handleSubmit(event) {
     event.preventDefault();
   
     const validationErrors = {};
   
     if (!formData.name) {
       validationErrors.name = 'Name is required.';
     }

     if (!formData.email) {
       validationErrors.email = 'Email is required.';
     } else if (!isValidEmail(formData.email)) {
       validationErrors.email = 'Invalid email address.';
     }

     if (!formData.title) {
        validationErrors.title = 'Title is required.';
     }
     if (!formData.avatar) {
        validationErrors.avatar = 'Avatar is required.';
     }
     if (!formData.dept) {
        validationErrors.dept = 'Dept is required.';
     }
     if (!formData.position) {
        validationErrors.position = 'Position is required.';
     }
     if (!formData.status) {
        validationErrors.status = 'Status is required.';
     }

    //  if (!formData.password) {
    //    validationErrors.password = 'Password is required.';
    //  } else if (formData.password.length < 6) {
    //    validationErrors.password = 'Password must be at least 6 characters long.';
    //  }
   
     setErrors(validationErrors);
   
     if (Object.keys(validationErrors).length === 0) {
      if (popupData?.popupType=='Add') {
        onSubmit();
      } else {
        onUpdate();
      }
     }
   }
 
   function onSubmit() {

    //  let params = {
    //    name : formData.name,
    //    email : formData.email,
    //    title : formData.title,
    //    avatar : formData.avatar,
    //    dept : formData.dept,
    //    position : formData.position,
    //    status : formData.status
    //  }

     const params = new FormData();
     params.append("name", formData.name);
     params.append("email", formData.email);
     params.append("title", formData.title);
     params.append("avatar", formData.avatar);
     params.append("dept", formData.dept);
     params.append("position", formData.position);
     params.append("status", formData.status);
     
     const url = 'http://localhost:3001/api/addEmployee';

     const requestOptions = {
       method: 'POST',
      //  headers: { 'Content-Type': 'application/json' },
      //  headers: { 'Content-Type': `multipart/form-data: boundary=add-random-characters` },
      //  body: JSON.stringify(params),
       body: params,
      //  redirect: 'follow',
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
              handleReset();
              onClose();
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

   function onUpdate() {
    
    // let params = {
    //   name : formData.name,
    //   email : formData.email,
    //   title : formData.title,
    //   avatar : formData.avatar,
    //   dept : formData.dept,
    //   position : formData.position,
    //   status : formData.status
    // }

    const params = new FormData();
    params.append("id", popupData._id);
    params.append("name", formData.name);
    params.append("email", formData.email);
    params.append("title", formData.title);
    params.append("avatar", formData.avatar);
    params.append("dept", formData.dept);
    params.append("position", formData.position);
    params.append("status", formData.status);

    const url = 'http://localhost:3001/api/updateEmployeeById';

    const requestOptions = {
      method: 'PUT',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(params),
      body: params,
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
             handleReset();
             onClose();
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

   function onClosePopup() {
      handleReset();
      onClose();
   }
  
    return (
      <div className="pop">
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onClose} 
          ariaHideApp={false}
          style={customStyles}
        >

          <form onSubmit={handleSubmit}>
              <h1 className='text-center'>{popupData?.popupType} Team</h1>

              <div className='d-flex'>
                  <div>
                      <h6>Name</h6>
                      <MDBInput 
                      wrapperClass='mb-2' 
                      name='name'
                      placeholder='Enter name' 
                      id='form0' 
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                      />
                      {errors.name && <span className='form-span'>{errors.name}</span>}
                  </div>&nbsp;
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
              </div>

              <div>
                  <h6>Title</h6>
                  <select className="form-select mb-2" name='title' value={formData.title} onChange={handleChange}>
                  <option value="" disabled>Select an option</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="UI/UX Engineer">UI/UX Engineer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Software Architect">Software Architect</option>
                      <option value="Android Developer">Android Developer</option>
                      <option value="iOS Developer">iOS Developer</option>
                  </select>
                  {errors.title && <span className='form-span'>{errors.title}</span>}
              </div>
              
              <div>
                  <h6>Dept</h6>
                  <select className="form-select mb-2" name='dept' value={formData.dept} onChange={handleChange}>
                  <option value="" disabled>Select an option</option>
                      <option value="IT Department">IT Department</option>
                      <option value="UI/UX Department">UI/UX Department</option>
                      <option value="Finance Department">Finance Department</option>
                      <option value="Marketing Department">Marketing Department</option>
                      <option value="HR Department">HR Department</option>
                      <option value="System Department">System Department</option>
                  </select>
                  {errors.dept && <span className='form-span'>{errors.dept}</span>}
              </div>

              <div>
                  <h6>Position</h6>
                  <select className="form-select mb-2" name='position' value={formData.position} onChange={handleChange}>
                  <option value="" disabled>Select an option</option>
                      <option value="Senior">Senior</option>
                      <option value="Junior">Junior</option>
                      <option value="Associate">Associate</option>
                      <option value="Intern">Intern</option>
                  </select>
                  {errors.position && <span className='form-span'>{errors.position}</span>}
              </div>

              <div>
                <h6>Avatar</h6>
                <div className="avatar-uploader">
                  <div className="image-upload-wrapper">
                    <input type="file" accept="image/*" name='avatar' className="image-upload-input" onChange={handleImageChange} />
                  </div>
                  {formData.avatar && (
                    <div className="preview">
                      <img className="preview-image" src={formData.avatar} height={50} width={50} alt="Selected Avatar" />
                    </div>
                  )}
                </div>
                {errors.avatar && <span className='form-span'>{errors.avatar}</span>}
              </div>


              <div>
                  <h6>Status</h6>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="Active" value="Active" checked={formData.status === 'Active'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                  </div>&nbsp;

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="Inactive" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Inactive</label>
                  </div>&nbsp;

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="Onboarding" value="Onboarding" checked={formData.status === 'Onboarding'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="inlineRadio3">Onboarding</label>
                  </div>&nbsp;
                  
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" id="Awaiting" value="Awaiting" checked={formData.status === 'Awaiting'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="inlineRadio4">Awaiting</label>
                  </div><br />
                  {errors.status && <span className='form-span'>{errors.status}</span>}
              </div>

              <button type='submit' className="mb-4 btn btn-primary">{popupData?.popupType == 'Add' ? 'Submit' : 'Update'}</button>
              <button className="mb-4 btn btn-primary" onClick={(onClosePopup)}>Close</button>

          </form>
        </Modal>
      </div>
    );
  }