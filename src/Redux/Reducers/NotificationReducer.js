import {types} from '../types';

const initial_state = {
  notificationLength: [],
};
const actionMap = {
  [types.setNotificationLength]: (state, act) => ({
    ...state.notificationLength,
    notificationLength: [...state.notificationLength, act.payload],
  }),
  [types.cleanNotification]: (state, act) => ({
    ...state.notificationLength,
    notificationLength: [],
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
