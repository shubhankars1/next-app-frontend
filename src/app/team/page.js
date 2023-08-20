"use client";
import React, { useEffect, useState } from 'react';
import './team.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import Modal from 'react-modal';
import Popup from './popup';

export default function Team() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({
    popupType : '',
    _id : '',
    name : '',
    email : '',
    title : '',
    avatar : '',
    dept : '',
    position : '',
    status : '',
  });
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getTeamData();
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!teamData) return <p>No team data</p>

  // getTeamData();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    getTeamData();
  };

  const addTeam = () => {
    let params = {
      popupType: 'Add',
      _id : '',
      name : '',
      email : '',
      title : '',
      avatar : '',
      dept : '',
      position : '',
      status : ''
    }
    setPopupData(params);
    openPopup();
  }

  const editTeam = (data) => {
    let params = {
      popupType: 'Edit',
      _id : data?._id,
      name : data?.name,
      email : data?.email,
      title : data?.title,
      avatar : data?.avatar,
      dept : data?.dept,
      position : data?.position,
      status : data?.status
    }
    setPopupData(params);
    openPopup();
  }

  async function getTeamData() {
    setLoading(true);
    const res = await fetch('http://localhost:3001/api/getAllEmployee')
    const json = await res.json()
    setTeamData(json.data);
    setLoading(false);
  }


  function removeTeamMember(memberId) {
    
    const url = 'http://localhost:3001/api/deleteEmployeeById/'+memberId;

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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
            getTeamData();
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
    <div className="team-page">
      <h1 className='team-header'>Team Page</h1>
      
      <button className='btn btn-warning' onClick={() => addTeam()}>
        <MDBIcon fab icon="plus" size="lg"/>&nbsp;Add Team
      </button>
      <Popup isOpen={isPopupOpen} onClose={closePopup} popupData={popupData}/>
      <br /><br />

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            teamData.map((data, index)=> 
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={data?.avatar ? data?.avatar : 'https://mdbootstrap.com/img/new/avatars/8.jpg'} alt="" style={{width: 45, height: 45}} className="rounded-circle" />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{data?.name}</p>
                      <p className="text-muted mb-0">{data?.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{data?.title}</p>
                  <p className="text-muted mb-0">{data?.dept}</p>
                </td>
                <td>
                  <span className={`badge badge-${data?.status == 'Active' ? 'success' : data?.status == 'Onboarding' ? 'primary' : data?.status == 'Awaiting' ? 'warning' : data?.status == 'Inactive' ? 'secondary' : 'secondary'} rounded-pill d-inline`}>{data?.status}</span>
                </td>
                <td>{data?.position}</td>
                <td>
                    <MDBIcon far icon="pen-to-square" size="lg" style={{cursor: 'pointer'}} onClick={() => editTeam(data)}/>&nbsp;&nbsp;
                    <MDBIcon far icon="trash-can" size="lg" style={{cursor: 'pointer'}} onClick={() => removeTeamMember(data._id)}/>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}



// install react model popup
//npm install react-modal
