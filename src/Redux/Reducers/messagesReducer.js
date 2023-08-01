import {types} from '../types';

const initial_state = {
  messagesData: [],
};

const actionMap = {
  [types.messagesNotification]: (state, act) => ({
    ...state.messagesData,
    messagesData: [...state.notificationLength, act.payload],
  }),
  [types.cleanMessagesNotification]: (state, act) => ({
    ...state.messagesData,
    messagesData: [],
  }),
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
