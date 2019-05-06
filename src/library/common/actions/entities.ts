import {action, createStandardAction} from 'typesafe-actions';

import {entitiesActionTypes} from '../constants/entities';

export const requestTestDataStart = () =>
	action(entitiesActionTypes.REQUEST_TEST_DATA_START);

export const requestTestDataSuccess =
	createStandardAction(entitiesActionTypes.REQUEST_TEST_DATA_SUCCESS)
		<any>();
