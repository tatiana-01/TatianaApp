import {opc, getDataRecluta, postDataRecluta, putDataRecluta, deleteDataRecluta, getReclutaById} from '../../Apis/api-reclutas.js';
import {opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam} from '../../Apis/api-teams.js';
export class ModalRecluta extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getApiTeam();
        

    }
    render(){
        this.innerHTML=/*html*/`
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edición</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="frmEditRecluta" >
                            <div class="row g-3">
                                <div class="col-sm-12 col-md-4">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control disabled" id="nombre" name="nombre">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="edad" class="form-label">Edad</label>
                                    <input type="text" class="form-control" id="edad" name="edad">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" class="form-control" id="telefono" name="telefono">
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-sm-12 col-md-4">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="direccion" class="form-label">Dirección</label>
                                    <input type="text" class="form-control" id="direccion" name="direccion">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                                    <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento">
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-sm-12 col-md-4">
                                    <label for="nroId" class="form-label">Numero de identificación</label>
                                    <input type="text" class="form-control" id="nroId" name="nroId">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="fechaIngreso" class="form-label">Fecha de Ingreso</label>
                                    <input type="date" class="form-control" id="fechaIngreso" name="fechaIngreso">
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <label for="id_team" class="form-label">Team</label>
                                    <select name="id_team" id="id_team">
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-primary mt-4" id="guardarCambio" data-accion="PUT">Guardar Cambios</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    

    getApiTeam(){
        getDataTeam()
            .then((result)=>{
                this.fillTeamModal(result);
            })
    }


    fillTeamModal(teams){
        let select=document.querySelector('#id_team');
        teams.forEach(element => {
            const item= document.createElement('option');
            item.value=element.id;
            item.innerHTML=element.nombre;
            select.appendChild(item);
        });
    }

 
}
customElements.define('modal-recluta', ModalRecluta);