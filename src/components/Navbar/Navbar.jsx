import React from "react";
import { Link } from 'react-router-dom';
import { deleteUser } from '../../utils/storage';

export default class Navbar extends React.Component {
  constructor(props) {
      super(props);
     this.state = {};
  }
  logout = evt => {
    evt && evt.preventDefault();
    deleteUser();
    window.location.reload();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Wallakeep</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"  aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"> <Link className="nav-link" to="/create-advert">Crear anuncio</Link> </li>
            <li className="nav-item"> <Link className="nav-link" to="/profile">Perfil de usuario</Link> </li>
          </ul>
          <button className="btn" onClick={this.logout}>Logout</button>
        </div>
      </nav>
    );
  }
}