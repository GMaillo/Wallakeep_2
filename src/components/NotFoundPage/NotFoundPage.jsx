import React from "react";
import './NotFoundPage.css';
import {Link} from 'react-router-dom';
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="error">
        <h1>404</h1> 
        <h2 className="text-center">¡Vaya! Algo no ha ido bien...</h2>
        <Link to="/">Volver a la página de inicio</Link>
      </div>
    );
  }
}
