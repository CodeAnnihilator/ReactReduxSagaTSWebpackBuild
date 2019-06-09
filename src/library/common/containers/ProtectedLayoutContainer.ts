import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

import { RootState } from 'main'

import ProtectedLayout from '../components/Layouts/Protected/ProtectedLayout';
import {getIsAuth} from 'modules/Auth/selectors';


const mapStateToProps = (state: RootState) => ({
  isAuth: getIsAuth(state)
})

export default connect(mapStateToProps)(withRouter(ProtectedLayout));