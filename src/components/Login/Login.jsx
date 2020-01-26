import React from "react";
import './Login.css';
import Input from "../Input";
import Tags from "../Tags";
import Form from "../Form";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
      this.state = {
      tag: ''
    };
  }
  
  onSubmit = inputs => {
    const { firstname, surname } = inputs;
    const user = { firstname, surname, tag: this.state.tag };
    
    this.props.setUser(user); 
    this.props.history.push('/'); 
  };

  onTagSelected = optionSelected => ( this.setState({ tag: optionSelected }) );

  render() {
    return (
      <div className="container login">
        <h1>Login</h1>
        <Form className="mt-4" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Nombre</label>
            <Input
              type="text"
              required
              name="firstname"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <Input 
              type="text"
              required="required"
              name="surname"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags"></label>
            <Tags required={true} onTagSelected={this.onTagSelected} />
          </div>
          <button type="submit" className="btn">Login</button>
        </Form>
      </div>
    );
  }
}