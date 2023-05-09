export class RegistrosAll extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.mostrarForms();
    }
    render(){
        this.innerHTML=/*html*/`
        <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <a class="nav-link " data-verocultar='["#formReclutas",["#formTeam","#formSkill","#formModulo","#formEval"]]'>Reclutas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-verocultar='["#formTeam",["#formReclutas","#formSkill","#formModulo","#formEval"]]'>Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-verocultar='["#formSkill",["#formTeam","#formReclutas","#formModulo","#formEval"]]'>Skill</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-verocultar='["#formModulo",["#formTeam","#formSkill","#formReclutas","#formEval"]]'>Modulo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-verocultar='["#formEval",["#formTeam","#formSkill","#formReclutas"]]'>Evaluación</a>
        </li>
      </ul>

      <div class="container" id="formReclutas" style="display: none;"><form-recluta></form-recluta></div>
      <div class="container" id="formTeam"style="display: none;"><form-team></form-team></div>
      <div class="container" id="formSkill"></div>
      <div class="container" id="formModulo"></div>
      <div class="container" id="formEval"></div>


        `;
    }

    mostrarForms(){
        let tabs=document.querySelectorAll('.nav-link');
        tabs.forEach(element => {
            element.addEventListener('click', (e) => {
                element.classList.add('active');
                let data=JSON.parse(e.target.dataset.verocultar);
                let ver=document.querySelector(data[0]);
                ver.style.display="block";
                console.log(data[1]);
                data[1].forEach(element => {
                    let ocultar=document.querySelector(element);
                    ocultar.style.display="none";
                });
            })
        });
              
    }
    
}
customElements.define('registros-all', RegistrosAll);