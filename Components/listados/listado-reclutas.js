import {opc, getDataRecluta, postDataRecluta, putDataRecluta, deleteDataRecluta, getReclutaById} from '../../Apis/api-reclutas.js';
import {opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam} from '../../Apis/api-teams.js';
export class ListaRecluta extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getApiReclutas();
        this.getApiTeam();
        
    }
    render(){
        this.innerHTML=/*html*/`
        <div class="container main-select mt-4">
            <div class="container-select">
                <label for="">Listar por:</label>
                <select name="" id="search">
                    <option value='["#search",["#teamSelect","#antiguedadSelect","#edadSelect"]]'>Seleccione una opcion</option>
                    <option value='["#teamSelect",["#antiguedadSelect","#edadSelect"]]' >Team</option>
                    <option value='["#antiguedadSelect",["#teamSelect","#edadSelect"]]' >Antiguedad</option>
                    <option value='["#edadSelect",["#teamSelect","#antiguedadSelect"]]' >Menores de edad</option>
                </select>
            </div>
            <div class="container-select" id="teamSelect" style="display: none;">
                <label for="">Team</label>
                <select name="" id="teamSearch"></select>
            </div>
            <div class="container-select" id="antiguedadSelect" style="display: none;">
                <label for="">Antiguedad</label>
                <select name="" id="antiSearch">
                    <option value='0'>Seleccione una opcion</option>
                    <option value='60'>2</option>
                </select>
            </div>
            <div class="container-select" id="edadSelect" style="display: none;">
                <label for="">Edad</label>
                <select name="" id="ageSearch">
                    <option value='0'>Seleccione una opcion</option>
                    <option value='18'>Menores de edad</option>
                </select>
            </div>
            
        </div>
        </div>
        <div class="container tabla-recluta">
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Team</th>
                        <th scope="col">Nro identificación</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="listaReclutas">
                </tbody>
            </table>
        </div>
       <modal-recluta></modal-recluta>
        `;
    }
    

    htmlReclutas(recluta){
        let lista= /*html*/`
            <tr>
                <td>${recluta.nombre}</td>
                <td>${recluta.edad}</td>
                <td>${recluta.id_team}</td>
                <td>${recluta.nroId}</td>
                <td>
                <button class="btn btn-warning" data-idrecluta="${recluta.id}" data-accion="PUT" id="editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button> 
                <button class="btn btn-danger" data-idrecluta="${recluta.id}" data-accion="DELETE" id="eliminar">Eliminar</button>
                </td>
            </tr>
        `;
        return lista;
    }

    renderReclutas(reclutas){
        
        let reclutasHtml='';
        for(let recluta of reclutas){
            reclutasHtml+=this.htmlReclutas(recluta);
        }
        document.querySelector('#listaReclutas').innerHTML=reclutasHtml;

        let select=document.querySelector('#teamSearch');
        select.addEventListener('change',(e)=>{
            console.log(reclutas);
            let reclutasTeam= reclutas.filter(reclutaT=>reclutaT.id_team==e.target.value);
            let reclutasHtml='';
            for(let recluta of reclutasTeam){
                reclutasHtml+=this.htmlReclutas(recluta);
            }
            if(e.target.value=='0'){
                for(let recluta of reclutas){
                    reclutasHtml+=this.htmlReclutas(recluta);
                }
            }
            document.querySelector('#listaReclutas').innerHTML=reclutasHtml;
        })
        this.selectEdad(reclutas);
        this.resetSelect(reclutas);
        this.delData();
        this.eventEditData();
        this.mostrarSelect();
        
    }

    selectEdad(reclutas){
        let select=document.querySelector('#search');
        select.addEventListener('click',(e)=>{
            console.log(e.target.value);
            if(e.target.value=='["#edadSelect",["#teamSelect","#antiguedadSelect"]]'){
                if(document.querySelector('#ageSearch').value=='18'){
                    console.log(document.querySelector('#ageSearch').value);
                    let reclutasTeam= reclutas.filter(reclutaT=>parseInt(reclutaT.edad)<18);
                    let reclutasHtml='';
                    for(let recluta of reclutasTeam){
                        reclutasHtml+=this.htmlReclutas(recluta);
                    }
                    document.querySelector('#listaReclutas').innerHTML=reclutasHtml;
                    }
                
            }
        })
    }

    resetSelect(reclutas){
        let select=document.querySelector('#search');
        select.addEventListener('click',(e)=>{
            console.log(e.target.value);
            if(e.target.value=='["#search",["#teamSelect","#antiguedadSelect","#edadSelect"]]'){
                let reclutasHtml='';
                for(let recluta of reclutas){
                    reclutasHtml+=this.htmlReclutas(recluta);
                }
                document.querySelector('#listaReclutas').innerHTML=reclutasHtml;
            }
        })
    }
    
    getApiReclutas(){
        getDataRecluta()
            .then((result)=>{
                this.renderReclutas(result);
            })
    }

    getApiTeam(){
        getDataTeam()
            .then((result)=>{
                this.fillTeam(result);
            })
    }

    fillTeam(teams){
        let select=document.querySelector('#teamSearch');
        select.innerHTML='';
        const itemStart=document.createElement('option');
        itemStart.innerHTML='Seleccione un item'
        itemStart.value='0';
        itemStart.selected;
        select.appendChild(itemStart);

        teams.forEach(element => {
            const item= document.createElement('option');
            item.value=element.id;
            item.innerHTML=element.nombre;
            select.appendChild(item);
        });

    }

    delData(){
        let boton=document.querySelectorAll('#eliminar');
        boton.forEach((element)=>{
            console.log(element);
            element.addEventListener('click', (e)=>{
                console.log('si');
                opc[e.target.dataset.accion](e.target.dataset.idrecluta);
            })
        })
    }

    getReclutaId(id){
        getReclutaById(id)
            .then((result)=>{
                this.editdata(result);
            })
    }

    editdata(data){
        let myFrm= document.querySelector('#frmEditRecluta');
        const {nombre,edad,telefono,email,direccion,fechaNacimiento,nroId,fechaIngreso,id_team}=data;
        let frm=new FormData(myFrm);
        frm.set("nombre",nombre);
        frm.set("edad",edad);
        frm.set("telefono",telefono);
        frm.set("email",email);
        frm.set("direccion",direccion);
        frm.set("fechaNacimiento",fechaNacimiento);
        frm.set("nroId",nroId);
        frm.set("fechaIngreso",fechaIngreso);
        frm.set("id_team",id_team)
        for (let pair of frm.entries()){
            myFrm.elements[pair[0]].value=pair[1];
        }
        
    }

    eventEditData(){
        let boton=document.querySelectorAll('#editar');
        boton.forEach((element)=>{
            console.log(element);
            element.addEventListener('click', (e)=>{
                this.getReclutaId(e.target.dataset.idrecluta);
                this.putData(e.target.dataset.idrecluta);
            })
        })
    }

    putData=(id)=>{
        let botonGuardar=document.querySelector('#guardarCambio');
        let formModal=document.querySelector('#frmEditRecluta')
        botonGuardar.addEventListener('click',(e)=>{
            let data=Object.fromEntries(new FormData(formModal));
            let select=document.querySelector('#id_team');
            data.id_team=select.value;
            opc[e.target.dataset.accion](data,id)
        })
    }

    mostrarSelect(){
        document.querySelector('#search').addEventListener('change', (e) => {
            let data=JSON.parse(e.target.value);
            console.log(data);
            let ver=document.querySelector(data[0]);
            ver.style.display="block";
            console.log(data[1]);
            data[1].forEach(element => {
                let ocultar=document.querySelector(element);
                ocultar.style.display="none";
            });
        })              
    }

}
customElements.define('list-recluta', ListaRecluta);