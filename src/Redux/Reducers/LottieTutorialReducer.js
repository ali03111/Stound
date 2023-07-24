import {types} from '../types';

const initial_state = {
  lottieTutorial: false,
};
const actionMap = {
  [types.lottieTutorialFinished]: (state, act) => ({
    ...state.lottieTutorial,
    lottieTutorial: true,
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
