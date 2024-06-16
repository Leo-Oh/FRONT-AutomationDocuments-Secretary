import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import person from '../images/person.png'
import NavBar from './NavBar'
import ChangePass from './Profile/ChangePass';
import ChangePhoto from './Profile/ChangePhoto'



export default function Profile() {

  const user = JSON.parse(localStorage.getItem('user')); 
  const navigate = useNavigate();

  const [tab, setTab] = useState('photo');
  const setPhoto = (e) => {
    
    setTab('photo')

  }
  const setPass = (e) => {
    
    setTab('pass')

  }

  const backHome = (e) => {
    navigate("/home")
    

  }


  

  return (
    <div>
      <div  className="d-flex flex-row-reverse bd-highlight">
            <div className="p-2 bd-highlight bg-primary text-light"><strong>Universidad Veracruzana</strong></div>
        </div>
      <NavBar></NavBar>
    
      <div className='container-fluid'>
      <div className="row  ">
      
        <div className='d-flex align-items-center justify-content-center' >
        
                  <ul class="nav nav-tabs">
                  <li class="nav-item">
                  <img src={process.env.REACT_APP_API_URL+'/secretaria/perfil/picture?nombre_archivo='+user["foto_perfil"]} className="img-fluid rounded-start" alt="Logo" width={"40px"} />
                  </li>
                  <li class="nav-item">
                    <a  class="nav-link  " aria-current="page"  onClick={setPhoto} >Cambiar foto de perfil</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" onClick={setPass}>Cambiar contraseña</a>
                  </li>
                  
                
                </ul>
            </div>
            
            <div className=" d-flex align-items-center justify-content-center " style={{marginTop:"2em"}}>
                {(tab === 'photo') ? (<ChangePhoto></ChangePhoto>) :  (<ChangePass></ChangePass>) }
                
          </div>
          
          <div className='d-flex align-items-center justify-content-center'>
              
            <button onClick={backHome} className=" btn btn-outline-primary" style={{margin:"3em"}}>Volver al inicio</button>
                    
          </div>
      </div>
    </div>
      
            
    </div>
  )
}
