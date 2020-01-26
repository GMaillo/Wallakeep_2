import React from "react";
import axios from 'axios';
import * as API from '../../services/APIService';
import Pagination from "../Pagination";
import Filters from '../Filters';
import AdvertList from '../AdvertList';
import { PaginationFilters } from '../../utils/variables';
import './Home.css';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      filters: {},
      paginationFilters: PaginationFilters,
      hasFiltered: false
    }; 
  }

  source = axios.CancelToken.source();

  componentWillUnmount() {
    this.source.cancel('componente Home');
  }

  componentDidMount() {
    !this.state.hasFiltered && this.getAdvertsByUserTag();
  }

  getAdvertsByUserTag = () => {
    const { tag } = this.props.user;
    this.setState({ filters: { tag } }, () => this.searchAdverts( { tag } ))
  };

  searchAdverts = async (filters = this.state.filters) => {
    await this.props.loadAdverts(filters, this.state.paginationFilters, this.source);
    this.nextAdsPage();
  };

  nextAdsPage = async () => {
    const { filters, paginationFilters: pagFilters } = this.state;
    pagFilters.page += 1;
    const adverts = await API.listAdverts(filters, pagFilters, this.source); 
    pagFilters.page -= 1; 
    pagFilters.disableNextPage = (!adverts || adverts.count === 0);
    this.setState({paginationFilters: pagFilters});
  };

  onFiltered = filters => {
    this.setState( { filters, hasFiltered: true }, () => this.searchAdverts(filters) );
  };

  onPageChanged = paginationFilters => {
    this.setState( { paginationFilters }, () => {
      this.searchAdverts();
      this.nextAdsPage();
    });
  };

  render() {
    const { hasFiltered, paginationFilters } = this.state;
    const h1Message = hasFiltered ? `${this.props.adverts.count} anuncios encontrados.` : `Anuncios encontrados por el tag: `;
    
    return (
      <div>
        <React.Fragment>
          <Filters onSubmit={this.onFiltered} />
          <p>{h1Message} <b>{!hasFiltered ? this.props.user.tag : ''}</b></p>
          <AdvertList />
          <Pagination paginationFilters={paginationFilters} onPageChanged={this.onPageChanged} />
        </React.Fragment>
      </div>
    );
  }
}
