import {types} from '../types';

export const questionTrue = payload => ({
  type: types.isQuestionTrue,
});
export const questionFalse = payload => ({
  type: types.isQuestionFalse,
});
export const setAnswer = payload => ({
  type: types.selectedAnsTypeSaga,
  payload,
});
