import { connect } from 'react-redux';
import { fetchAdvert } from '../../store/actions';
import AdvertDetail from './AdvertDetail';

const mapStateToProps = state => ({
    advert: state.currentAdvert
});

const mapDispatchToProps = dispatch => ({
    loadAdvert: (id, source) => dispatch( fetchAdvert(id, source) )
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetail);