import {types} from '../types';

const initial_state = {
  onTutorial: false,
};
const actionMap = {
  [types.onTutorialFinished]: (state, act) => ({
    ...state.onTutorial,
    onTutorial: true,
  }),
  [types.onTutorialReset]: (state, act) => ({
    ...state.onTutorial,
    onTutorial: false,
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
