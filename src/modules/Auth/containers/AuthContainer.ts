import { connect } from 'react-redux'

import { RootState } from 'main'

import Auth from '../Auth'
import { sendAuthData, verifyToken } from '../actions'

import { getIsAuth } from '../selectors'

const mapStateToProps = (state: RootState) => ({
  isAuth: getIsAuth(state)
})

const mapDispatchToProps = {
  sendAuthData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
