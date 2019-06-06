import { connect } from 'react-redux';

import { RootState } from 'main';

import Auth from '../Auth';

import {sendAuthData} from '../actions'

const mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
  sendAuthData
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);