import React from "react";
import './Profile.css';
export default class Profile extends React.Component {
  render() {
    const { user } = this.props;
    const { firstname, surname, tag } = user;
    return (
      <div>
        {
          user
          &&
          <div>
            <h1 className="text-center mt-4">Perfil de usuario</h1>
            <div className="mt-4">
              <h2>{firstname + " " + surname}</h2>
              <p>Tiene interes en <b>{tag}</b> anuncios</p>
            </div>
          </div>
        }
      </div>
    );
  }
}