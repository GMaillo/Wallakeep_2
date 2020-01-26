import React from "react";
import axios from "axios";
import Tags from "../Tags";
import Advert from "../Advert";
import './EditAdvert.css';
import NotFoundPage from "../NotFoundPage";

export default class EditAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetAdvertCreationState();
  }

  source = axios.CancelToken.source();

  UNSAFE_componentWillReceiveProps() {
    this.setState(this.resetAdvertCreationState());
  }
  componentDidMount() {
    this.fillFieldsIfEditingAdvert();
  }
  componentWillUnmount() {
    this.source.cancel('EditAdvert component');
  }

  resetAdvertCreationState = () => {
    return {
      advert: {
        id: "",
        name: "",
        price: "",
        description: "",
        photo: "",
        tags: [],
        type: ""
      },
      editingAdvert: false,
      advertError: false
    };
  };

  fillFieldsIfEditingAdvert = async () => {
    const { pathname } = this.props.location;
    const splittedPathname = pathname.split("/");
    
    if ( splittedPathname[1] !== 'edit-advert' ) return; 
    if ( !splittedPathname[2] ) {
      this.setEditingError();
      return;
    }

    await this.props.loadAdvert(splittedPathname[2], this.source);
   
    this.setState({ advert: this.props.advert.result, editingAdvert: true });    
  };

  setEditingError = () => this.setState({ advertError: true, editingAdvert: true });
  onSubmit = async evt => {
    evt && evt.preventDefault();

    const { advert, editingAdvert } = this.state;

    if (editingAdvert)
      await this.props.updateAdvert(advert, this.source);
    else
      await this.props.createAdvert(advert, this.source);

    const { success, result } = this.props.advert;

    if ( !success ) {
        return;
    }
    this.props.history.push(`/advert/${result.id}`);    
  };

  onInputChange = evt => {
    const { name, value } = evt.target;
    this.updateState(name, value);
  };

  onRadioChange = evt => {
    const { id } = evt.target;
    this.updateState("type", id);
  };

  onSelectChange = selectedTags => {
    this.updateState("tags", selectedTags);
  };

  updateState = (name, value) => {
    this.setState(({ advert }) => ({
      advert: {
        ...advert,
        [name]: value
      }
    }));
  };

  render() {
    const { advert, advertError } = this.state;
    const { name, price, description, photo, tags, type } = advert;
    const updateOrCreateAdvert = this.state.editingAdvert ? 'Editar' : 'Crear nuevo anuncio';
    const photoFieldType = this.state.editingAdvert ? 'texto' : 'url';
    return (
      <div>
        <h1 className="text-center mt-4">{updateOrCreateAdvert} anuncio</h1>
        {
          !advertError && this.props.advert?
          (
            <form onSubmit={this.onSubmit}>
              <div>
                <div>
                  <div className="form-group">
                    <label className="input-label" htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      required
                      name="name"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group">
                  <label className="input-label" htmlFor="description">Descripción</label>
                    <textarea
                      required
                      name="description"
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label" htmlFor="price">Precio</label>
                    <input
                      type="number"
                      required
                      name="price"
                      id="price"
                      className="form-control"
                      value={price}
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label" htmlFor="tags-select">Tags</label>
                    <Tags multiple={true} required={true} selectedTags={tags} onTagSelected={this.onSelectChange} />
                  </div>
                  <div className="form-group">
                    <div>
                      <span className="input-label">Tipo</span>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        required
                        name="type"
                        id="buy"
                        className="form-check-input"
                        value={type}
                        checked={type === 'buy'}
                        onChange={this.onRadioChange}
                      />
                      <label className="form-check-label" htmlFor="buy">Compra</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        required
                        name="type"
                        id="sell"
                        className="form-check-input"
                        value={type}
                        checked={type === 'sell'}
                        onChange={this.onRadioChange}
                      />
                      <label className="form-check-label" htmlFor="sell">Venta</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="input-label" htmlFor="photo">Photo URL</label>
                    <input
                      type={photoFieldType}
                      required
                      name="photo"
                      id="photo"
                      className="form-control"
                      value={photo}
                      placeholder="URL of your advert photo"
                      onChange={this.onInputChange}
                    />
                  </div>
                </div>
                <div className="preview">
                  
                  <div id="advert-preview" className="mb-5rem">
                    <Advert advert={advert} />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit">{updateOrCreateAdvert}</button>
            </form>
          )
          :
          (
            <NotFoundPage />
          )
        }
      </div>
    );
  }
}
