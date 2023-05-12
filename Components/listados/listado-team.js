import {opc, getDataRecluta, postDataRecluta, putDataRecluta, deleteDataRecluta, getReclutaById} from '../../Apis/api-reclutas.js';
import {opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam, getTeamById} from '../../Apis/api-teams.js';
export class ListaTeam extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getApiTeams();
    }
    render(){
        this.innerHTML=/*html*/`
        <div class="container tabla-recluta">
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Trainer</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="listaTeams">
                </tbody>
            </table>
        </div>
       <modal-team></modal-team>
        `;
    }
    

    htmlTeams(team){
        let lista= /*html*/`
            <tr>
                <td>${team.nombre}</td>
                <td>${team.trainer}</td>
                <td>
                <button class="btn btn-warning" data-idteam="${team.id}" data-accion="PUT" id="editar" data-bs-toggle="modal" data-bs-target="#exampleModalTeam">Editar</button> 
                <button class="btn btn-danger" data-idteam="${team.id}" data-accion="DELETE" id="eliminar">Eliminar</button>
                </td>
            </tr>
        `;
        return lista;
    }

    renderTeams(teams){
        let teamsHtml='';
        for(let team of teams){
            teamsHtml+=this.htmlTeams(team);
        }
        document.querySelector('#listaTeams').innerHTML=teamsHtml;    
        this.delData();    
        this.eventEditData();
    }

    getApiTeams(){
        getDataTeam()
            .then((result)=>{
                this.renderTeams(result);
            })
    }

    delData(){
        let boton=document.querySelectorAll('#eliminar');
        boton.forEach((element)=>{
            element.addEventListener('click', (e)=>{
                opcTeams[e.target.dataset.accion](e.target.dataset.idteam);
            })
        })
    }

    getTeamId(id){
        getTeamById(id)
            .then((result)=>{
                this.editdata(result);
            })
    }

    editdata(data){
        let myFrm= document.querySelector('#frmEditTeam');
        const {nombre,trainer}=data;
        let frm=new FormData(myFrm);
        frm.set("nombre",nombre);
        frm.set("trainer",trainer);
        for (let pair of frm.entries()){
            myFrm.elements[pair[0]].value=pair[1];
        }
        
    }

    eventEditData(){
        let boton=document.querySelectorAll('#editar');
        boton.forEach((element)=>{
            element.addEventListener('click', (e)=>{
                this.getTeamId(e.target.dataset.idteam);
                this.putData(e.target.dataset.idteam);
            })
        })
    }

    putData=(id)=>{
        
        let botonGuardar=document.querySelector('#guardarCambioTeam');
        
        let formModal=document.querySelector('#frmEditTeam')
        botonGuardar.addEventListener('click',(e)=>{
            console.log(botonGuardar);
            let data=Object.fromEntries(new FormData(formModal));
            opcTeams[e.target.dataset.accion](data,id)
            
        })
    }


}
customElements.define('list-team', ListaTeam);