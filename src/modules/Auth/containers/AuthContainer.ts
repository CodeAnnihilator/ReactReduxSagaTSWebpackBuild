import {connect} from 'react-redux';
import {Dispatch} from 'redux'

import {RootState} from 'main';

import Auth from '../Auth';
import {sendAuthData, verifyToken} from '../actions'

import {getIsAuth} from '../selectors';

const mapStateToProps = (state: RootState) => ({
	isAuth: getIsAuth(state),
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
// 	sendAuthData: (login: string, password: string) => dispatch(sendAuthData(login,password)),
// })

const mapDispatchToProps = {
	sendAuthData
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
