import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';

import entitiesReducer from 'library/common/reducers/entities';

const createRootReducer = (history: any) => combineReducers({
	entities: entitiesReducer,
	router: connectRouter(history as any),
});

export default createRootReducer;
