import {types} from '../types';

export const messagesNotification = payload => ({
  type: types.messagesNotification,
  payload,
});

export const cleanMessagesNotification = payload => ({
  type: types.cleanMessagesNotification,
  payload,
});
