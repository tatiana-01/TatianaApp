export class MainMenu extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML=/*html*/`
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a href="index.html"><img src="/img/logo.jpg" class="logo" alt="" srcset="" ></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="../../registros.html">Registros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="../../listados.html">Listados</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        `;
    }
}
customElements.define('main-menu', MainMenu);