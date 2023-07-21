import {types} from '../types';

const initial_State = {
  recentLocation: [],
};

const actionMap = {
  [types.RecentLocation]: (state, act) => ({
    ...state.recentLocation,
    recentLocation: [...state.recentLocation, act.payload],
  }),
  [types.CleanRecentLocation]: (state, act) => ({
    ...state.recentLocation,
    recentLocation: [],
  }),
};
export default function (state = initial_State, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
