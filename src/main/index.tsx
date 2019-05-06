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

import 'resources/styles/index.scss';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

export type RootState = StateType<typeof rootReducer>;

const store = createStore(
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
