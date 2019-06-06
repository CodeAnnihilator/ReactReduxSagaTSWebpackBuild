import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';

import entitiesReducer from 'library/common/reducers/entities';
import authReducer from 'modules/Auth/reducer';

const createRootReducer = (history: any) => combineReducers({
	entities: entitiesReducer,
	router: connectRouter(history as any),
	auth: authReducer,
});

export default createRootReducer;
