import { useEffect, useState } from "react";
import React from 'react';
import Swal from 'sweetalert2'
import NavBar from "./NavBar";
import status_true from '../images/status_true.svg'
import status_false from '../images/status_false.png'
import { useNavigate } from "react-router-dom";




export default function Home() {
    const [files, setFiles]  = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); 
    const [selectedFile, setSelectedFile] = useState("");
    const [file, setFIle]  = useState("");
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        
        const options = { year: "numeric", month: "long", day: "numeric", day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}
        return new Date(dateString).toLocaleDateString('es-MX', options)
      }

    const get_datetime_now = () =>{
        const currentDate = Date.now();
        const today = new Date(currentDate);
        return today.toISOString().split("T")[0] + 'T03:00:00.000Z'
    }

    console.log(user["id"]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/solicitud-de-tramite-secretarias/' + user["id"])
         .then((response) => response.json())
         .then((data) => {
            setFiles(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, []);

    const reloading = () => {
        window.location.href = "/home"; 
    };
    const summitFile  = (e) => {
        if (file != "") {

            Swal.fire({
                icon: 'info',
                title: 'Guardando archivo...',
                text: 'Esto puede tardar algunos segundos',
                showConfirmButton: false,
                timer: 3000
            })

            const formData = new FormData();
            formData.append('file_document', file, file.name);

            fetch(process.env.REACT_APP_API_URL + '/files/tramites/subir', {
                method: 'POST',
                headers: { 
                    'accept': 'application/json',
                    //'Content-Type': 'multipart/form-data'
                        
                },
                body: formData
            }).then((response) => response.json())
            .then((data) => {
                if (data["archivo"]){
                    fetch(process.env.REACT_APP_API_URL + '/solicitud-de-tramite/'+ selectedFile["solicitud_de_tramites"]["id"] , {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            url_file: data["archivo"],
                            estado: "FINALIZADO",
                            fecha_de_aprobacion: get_datetime_now()   
                          })
                    }).then((response) => response.json()) .then((data) => {
                        
                        Swal.fire({
                            icon: 'info',
                            title: 'Archivo guardado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            window.location.href = "/home"; 
                        }) 


                    })
                    
                } else {
                    Swal.fire("Error al enviar documento", "","error");
                }
                
            })
        }else {
            Swal.fire("Error, Debe seleccionar un archivo a enviar", "","error");
        }
        
         
    }
    
    const handleChangePhoto = (e) => {
        const selectedFile = e.target.files[0];
        setFIle(selectedFile);

  }
    const Trigger = (e) => {
        setSelectedFile(e)
        
        //fetch(  process.env.REACT_APP_API_URL + '/estudiante/estudiante/'+e["solicitud_de_tramites"]["id"])
        // .then((response) => response.json())
        // .then((data) => {
        //    const select = {
        //         name: data.name + " " + data.first_surname + " " + data.second_surname,
        //         career: data.career,
        //         name_document: e.name_document,
        //         description: e.description
        //     }
        //     setSelectedFile(data)
        //     
        // })
        // .catch((err) => {
        //    console.log(err.message);
        // });
        
        
    }
    const deleteFile = (e) => {
        console.log(e)
        Swal.fire({
            title: 'Seguro que deseas eliminar el registro '+ `${e["tramites"]["nombre"]} - ${e["estudiantes"]["nombre_completo"]} ${e["solicitud_de_tramites"]["estado"]} `,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
       
                fetch( process.env.REACT_APP_API_URL + '/solicitud-de-tramite/'+e["solicitud_de_tramites"]["id"], { method: 'DELETE' })
                .then((response) => response.json())
                .catch((err) => {
                    console.log(err.message);
                });
                
                Swal.fire('Borrado correctamente!', '', 'success').then(
                    () => {
                        reloading();
                    }
                )
            } else if (result.isDenied) {
                Swal.fire('No se a borrado', '', 'info')
            }
        })
   }
  return (
    <div>
        <div  className="d-flex flex-row-reverse bd-highlight">
            <div className="p-2 bd-highlight bg-primary text-light"><strong>Universidad Veracruzana</strong></div>
        </div>
        <div><NavBar></NavBar></div>
        <div className="d-flex bd-highlight">
        <div className="p-2 bd-highlight bg-success text-light"><strong>{user.career}</strong></div>

        </div>
        
        <div className="container" style={{marginTop:"7em"}}>
            <table className="table">
                <thead>
                    <tr>
                     <th>Id</th>   
                    <th scope="col">Estudiante</th>
                    <th scope="col">Matricula</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Solicitado</th>
                    <th scope="col">Status</th>
                    <th scope="col">Archivo abjunto</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                {files.map((file, index) => (
                    
                    <tr key={index}>
                        {console.log('Datos del archivo:', file)}
                    <th>{file["estudiantes"]["id"]}</th>
                    <th scope="row">{file["estudiantes"]["nombre_completo"]}</th>
                    <td>{file["estudiantes"]["matricula"]}</td>
                    <td>{file["estudiantes"]["telefono"]}</td>
                    <td>{file["tramites"]["nombre"]}</td>
                    <td>{formatDate(file["solicitud_de_tramites"]["fecha_de_solicitud"])}</td>
                    
                   
                    <td>{file["solicitud_de_tramites"]["estado"].toUpperCase() == "FINALIZADO" ?
                            (<img src={status_true} alt="Bootstrap" width={"40px"} />) :

                            (<img src={status_false} alt="Bootstrap" width={"40px"} />)}</td>

                        <td><button type="button" className="btn btn-outline-info"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { Trigger(file) }}>Adjuntar</button></td>
                    <td><button type="button" className="btn btn-outline-warning" onClick={() => { deleteFile(file) }} >Borrar</button></td>
                    </tr>
                ))}
                
                </tbody>
            </table>
        </div>
        
    


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Solicitud de tramite</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               
                <p><strong>Nombre: </strong> {selectedFile["estudiantes"] ? selectedFile["estudiantes"]["nombre_completo"] : ""}</p>
                <p><strong>Matricula: </strong> {selectedFile["estudiantes"] ? selectedFile["estudiantes"]["matricula"] : ""}</p>
                <p><strong>Tipo de documento: </strong> {selectedFile["tramites"] ? selectedFile["tramites"]["nombre"] : ""} </p>
                <p><strong>Descripcion: </strong> {selectedFile["tramites"] ? selectedFile["tramites"]["descripcion"] : ""} </p>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Adjuntar archivo</label>
                    <input onChange={handleChangePhoto} class="form-control" type="file" id="formFile"/>
                </div>
                                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={summitFile}>Confirmar</button>
            </div>
            </div>
        </div>
        </div>

    </div>
  )
}
