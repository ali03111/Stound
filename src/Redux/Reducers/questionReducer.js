import {RadioButtons} from '../../Utils/localDB';
import {types} from '../types';

const initial_state = {
  isQuestion: false,
  selectedVal: RadioButtons[0],
  adId: '',
};
const actionMap = {
  [types.isQuestionTrue]: (state, act) => ({
    ...state.isQuestion,
    isQuestion: true,
  }),
  [types.isQuestionFalse]: (state, act) => ({
    ...state.isQuestion,
    isQuestion: false,
  }),
  [types.selectedValType]: (state, act) => ({
    ...state.selectedVal,
    selectedVal: act.payload,
  }),
  [types.setAdIdType]: (state, act) => ({
    ...state.adId,
    adId: act.payload,
  }),
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
