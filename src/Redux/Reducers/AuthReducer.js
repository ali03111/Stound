import {types} from '../types';

const initial_state = {
  userData: {},
  token: '',
};

const actionMap = {
  [types.LoginType]: (state, act) => {
    const deleteToken = {...act.payload.data};
    delete deleteToken.token;
    console.log('sdvsdvsd', deleteToken);
    return {
      userData: deleteToken,
      token: act.payload.data.token,
    };
  },
  [types.LogoutType]: (state, act) => ({
    userData: {},
    token: '',
  }),
  [types.UpdateProfile]: (state, act) => ({
    ...state,
    userData: act.payload.data,
  }),
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
