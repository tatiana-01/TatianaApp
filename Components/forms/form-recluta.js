import {opc, getDataRecluta, postDataRecluta, putDataRecluta, deleteDataRecluta} from '../../Apis/api-reclutas.js';
import {opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam} from '../../Apis/api-teams.js';
export class FormRecluta extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.postData();
        this.getApiTeam();
    }
    render(){
        this.innerHTML=/*html*/`
        <form id="frmDataRecluta" class="formRecluta">
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
                    <input type="date" class="form-control" id="fechaNacimiento"
                        name="fechaNacimiento">
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
                    <label for="team" class="form-label">Team</label>
                    <select name="" id="team">
                    <option value="1">1</option>
                    </select>
                </div>
            </div>
            <a href="#" class="btn btn-primary mt-4" id="guardarRecluta" data-accion="POST">Guardar</a>
        </form>
        `;
    }
    
    postData=()=>{
        let form=document.querySelector('#frmDataRecluta');
        let boton=document.querySelector('#guardarRecluta');
        boton.addEventListener('click',(e)=>{
            let data=Object.fromEntries(new FormData(form));
            let select=document.querySelector('#team');
            data.id_team=select.value;
            opc[e.target.dataset.accion](data);
        })
    }

    getApiTeam(){
        getDataTeam()
            .then((result)=>{
                this.fillTeam(result);
            })
    }

    fillTeam(teams){
        let select=document.querySelector('#team');
        select.innerHTML='';
        const itemStart=document.createElement('option');
        itemStart.innerHTML='Seleccione un item'
        itemStart.selected;
        select.appendChild(itemStart);

        teams.forEach(element => {
            const item= document.createElement('option');
            item.value=element.id;
            item.innerHTML=element.nombre;
            select.appendChild(item);
        });

    }
    
}
customElements.define('form-recluta', FormRecluta);