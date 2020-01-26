import { connect } from 'react-redux';
import { fetchAdvert, createAdvert, updateAdvert } from '../../store/actions';
import EditAdvert from './EditAdvert';

const mapStateToProps = state => ({
    advert: state.currentAdvert
});

const mapDispatchToProps = dispatch => ({
    loadAdvert: (id, source) => dispatch( fetchAdvert(id, source) ),
    createAdvert: (advert, source) => dispatch( createAdvert(advert, source) ),
    updateAdvert: (advert, source) => dispatch( updateAdvert(advert, source) )
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdvert);