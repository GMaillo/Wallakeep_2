import { connect } from 'react-redux';
import { fetchAdverts } from '../../store/actions';
import Home from './Home';

const mapStateToProps = state => ({
    user: state.user,
    adverts: state.adverts
});

const mapDispatchToProps = dispatch => ({
    loadAdverts: (filters, paginationFilters, source) => dispatch( fetchAdverts(filters, paginationFilters, source) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);