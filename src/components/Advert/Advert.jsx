import React from "react";
import { withRouter } from "react-router-dom";
import './Advert.css';

class Advert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goDetailPage = () => {
    if(this.props.advert.id !== "")
      this.props.history.push(`/advert/${this.props.advert.id}`)
  };

  render() {
    const advert = this.props.advert;
    return (
      <div 
        className="card" 
        key={advert.id}        
        >
          <div className="pointer" onClick={this.goDetailPage}>
            <img src={advert.photo ? advert.photo : '/images/empty.png'} className="card-img-top" alt={`${advert.name}_advert_img`} />
            <span className="price">{advert.price}€</span>
            <span className={` type-badge type-badge-${advert.type}`}>{advert.type}</span>
            <div className="card-body">
              <h5 className="card-title">{advert.name}</h5>
              <p className="card-text">{advert.description}</p>
            </div>

          </div>
          <div className="list-group-item tag-badge-container">
            {advert.tags.map( tag => <span key={`${advert.id}_${tag}`} className={`tag-badge tag-${tag}`}>{tag}</span>)}
          </div>
      </div>
    );
  }
}

export default withRouter(Advert);