import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import Login from './Login';
import withForm from '../Form/withForm';

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch( setUser(user) )
});

export default connect(null, mapDispatchToProps)(withForm(Login));