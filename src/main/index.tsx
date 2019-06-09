import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {batchDispatchMiddleware, enableBatching} from 'redux-batched-actions';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {StateType} from 'typesafe-actions';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';
import Routes from './Routes';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'resources/styles/index.scss';

import 'library/utils/axiosConfig';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

export type RootState = StateType<typeof rootReducer>;

export const store = createStore(
	enableBatching(rootReducer),
	composeWithDevTools(
		applyMiddleware(
			routerMiddleware(history),
			sagaMiddleware,
			batchDispatchMiddleware,
		),
	),
);

sagaMiddleware.run(rootSaga);

render((
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>
), document.getElementById('app'));
