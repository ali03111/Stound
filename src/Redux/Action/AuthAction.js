import {types} from '../types';

export const loginUser = payload => ({
  type: types.LoginType,
  payload,
});

export const updateUser = payload => ({
  type: types.UpdateProfile,
  payload,
});

export const logOutUser = payload => ({
  type: types.LogoutType,
  payload,
});
