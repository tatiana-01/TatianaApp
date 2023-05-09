
export class ModalTeam extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML=/*html*/`
        <div class="modal fade" id="exampleModalTeam" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edición</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form id="frmEditTeam" class="formTeam">
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
                    </form>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-primary mt-4" id="guardarCambioTeam" data-accion="PUT">Guardar Cambios</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
     
}
customElements.define('modal-team', ModalTeam);