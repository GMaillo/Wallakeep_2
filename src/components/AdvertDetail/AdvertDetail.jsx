import React, { useState, useEffect } from "react";
import axios from "axios";
import Advert from "../Advert";
import NotFoundPage from "../NotFoundPage";
import './AdvertDetail.css';

function AdvertDetail(props) {
  const [advert, setAdvert] = useState(null);
  const source = axios.CancelToken.source();
  const advertId = props.match.params.id;

  useEffect(() => {
    const getAdvert = async () => {
      if (advertLoaded()) return;
      await props.loadAdvert(advertId, source); 
      let _advert = props.advert; 
      
      if ( !_advert || !_advert.success ) return;
      
      _advert = _advert.result;
      setAdvert(_advert);
    };
    
    getAdvert();
    
    return function cleanup() {
      source.cancel('AdvertDetail component');
    }
  }, 
  // eslint-disable-next-line
  [advert]);
  
  const advertLoaded = () => (Object.entries(props.advert).length > 0 && props.advert.result.id === advertId);
  const editAdvert = () => {
    props.history.push(`/edit-advert/${advertId}`);
  };

  return (
    <React.Fragment>
      {
        advertLoaded() ?
        <div className="advert">
          <Advert advert={props.advert.result} />
          <button className="btn btn-primary edit-ad-submit-btn edit" onClick={editAdvert}>Editar</button>
        </div>
        :
        <NotFoundPage />
      }
    </React.Fragment>
  );
}

export default AdvertDetail;