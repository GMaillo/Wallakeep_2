import { connect } from 'react-redux';
import { isUserLogged } from '../../store/selectors';
import App from './App';

const mapStateToProps = state => ({
    isLogged: isUserLogged(state.user)
});

export default connect(mapStateToProps)(App);