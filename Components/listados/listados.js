export class ListadosAll extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.mostrarForms();
    }
    render(){
        this.innerHTML=/*html*/`
        <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <a class="nav-link " data-verocultar='["#listReclutas",["#listTeam","#listSkill","#listModulo","#listEval"]]'>Reclutas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-verocultar='["#listTeam",["#listReclutas","#listSkill","#listModulo","#listEval"]]'>Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-verocultar='["#listSkill",["#listTeam","#listReclutas","#listModulo","#listEval"]]'>Skill</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-verocultar='["#listModulo",["#listTeam","#listSkill","#listReclutas","#listEval"]]'>Modulo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-verocultar='["#listEval",["#listTeam","#listSkill","#listReclutas"]]'>Evaluación</a>
        </li>
      </ul>

      <div class="container" id="listReclutas" style="display: none;"><list-recluta></list-recluta></div>
      <div class="container" id="listTeam"style="display: none;"><list-team></list-team></div>
      <div class="container" id="listSkill"></div>
      <div class="container" id="listModulo"></div>
      <div class="container" id="listEval"></div>


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
                data[1].forEach(element => {
                    let ocultar=document.querySelector(element);
                    ocultar.style.display="none";
                });
            })
        });
              
    }
    
}
customElements.define('listados-all', ListadosAll);