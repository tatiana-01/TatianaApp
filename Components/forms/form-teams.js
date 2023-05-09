import {opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam} from '../../Apis/api-teams.js';
export class FormTeams extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.postData();
    }
    render(){
        this.innerHTML=/*html*/`
        <form id="frmDataTeam" class="formTeam">
            <div class="row g-3">
                <div class="col-sm-12 col-md-4">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control disabled" id="nombre" name="nombre">
                </div>
                <div class="col-sm-12 col-md-4">
                    <label for="trainer" class="form-label">Trainer</label>
                    <input type="text" class="form-control" id="trainer" name="trainer">
                </div>
            </div>
            <a href="#" class="btn btn-primary mt-4" id="guardarTeam" data-accion="POST">Guardar</a>
        </form>
        `;
    }
    
    postData=()=>{
        let form=document.querySelector('#frmDataTeam');
        let boton=document.querySelector('#guardarTeam');
        boton.addEventListener('click',(e)=>{
            let data=Object.fromEntries(new FormData(form));
            opcTeams[e.target.dataset.accion](data);
        })
    }

    
}
customElements.define('form-team', FormTeams);