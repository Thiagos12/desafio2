import './index.css';
import { Link, useLocation } from 'react-router-dom';
import userService from '../../services/user-service';



export default function Menu(){

  const logout = () => {
    userService.sairDoSistema();
  };

  if (useLocation().pathname !== '/login') {
    return(
      <ul className="menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/produtos'>Produtos</Link></li>

        <li><Link><img src={require('./img/carrinho_de_compras.png')}></img></Link></li>
        <li><Link onClick={logout}>Sair</Link></li>
    
      </ul>
    );
  }else{
    return null;
  }
}

