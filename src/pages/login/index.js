import "./index.css";
import { useState } from "react";
import Swal from "sweetalert2";
import userService from "../../services/user-service";
import { useLocation } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("admin@admin.com");
    const [senha, setSenha] = useState("123456");

    const navigate = useLocation();


    const autenticar = () => {
        if (!email || !senha) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Os campos de e-mail e senha são obrigatórios!, verifique!",
            })
        }

        userService.autenticar(email, senha)
            .then(response => {
                userService.salvarToken(response.data.token);
                userService.salvarUsuario(response.data.usuario);
                window.open("/produtos", "_self")
            })
            .catch(erro => {

            })

    }

    return (

        <>
      
      <div className="main-login">

      <div className="left-login">
          <h1>Faça login <br/> E acesse sua conta!</h1>
          
      
      </div>

      <div className="right-login">
          <div className="card-login">
              <h1>LOGIN</h1>
              <div className="text-input">
                  <label for="email"></label>
                  <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail"/>
              </div>

              <div className="text-input">
                  <label for="senha"></label>
                  <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha"/>
              </div>
              <br/>
              <button id="btn-entrar" onClick={autenticar}>Entrar</button>
              <br/>
              <div className="link-esqueceu-senha">
                  <a href="#" id="esqueceu-senha" data-bs-toggle="modal" data-bs-target="#myModal">Esqueceu a senha?</a>
              </div>

          </div>
      </div>
  </div>


<div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title"></h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      
      <div className="modal-body2">
        <div className="text-input">
          <label for="emailrec"></label>
          <input id="emailrec" type="text" placeholder="E-mail"/><br/>
          <button type="button" className="btn btn-success" data-bs-dismiss="modal">Envie Nova Senha</button>
      </div>
    </div>

      
      <div className="modal-footer2">
        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Sair</button>
      </div>

    </div>
  </div>
</div>

</>

    );
}

export default Login;