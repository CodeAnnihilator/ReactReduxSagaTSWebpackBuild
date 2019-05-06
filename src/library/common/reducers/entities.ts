import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/entities';

export type EntitiesState = Readonly<{
	testData: any;
}>;

const initialState: EntitiesState = {
	testData: [],
};

export type EntitiesActions = ActionType<typeof actions>;

export default (state = initialState, action: EntitiesActions): EntitiesState => {
	switch (action.type) {

		case getType(actions.requestTestDataSuccess):
			return {
				...state,
				testData: action.payload,
			};

		default:
			return state;
	}
};
