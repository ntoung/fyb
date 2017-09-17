import { Map, fromJS } from 'immutable';

import {
  SET_GRAPH_TYPE,
  ADD_GRAPH_INPUT,
  REMOVE_GRAPH_INPUT,
  UPDATE_GRAPH_INPUT,
  SET_BUDGET,
} from 'ActionTypes';


const nextId = (() => {
  let id = 1;
  return () => { id += 1; return id; };
})();


export default function Graph(state = fromJS({
  graphType: 1,
  budget: 0,
  inputs: [{
    inputId: 1,
    inputName: '',
    inputCost: undefined,
    inputFrequency: 1,
    inputSerialNumber: undefined,
  }],
}), action) {
  switch (action.type) {
    case SET_GRAPH_TYPE:
      return state.setIn(['Graph', 'graphType'], action.graphType);
    case ADD_GRAPH_INPUT:
      return state.updateIn(['Graph', 'inputs'], inputs => inputs.push(Map({
        inputId: nextId(),
        inputName: '',
        inputCost: undefined,
        inputFrequency: 1,
        inputSerialNumber: undefined,
      })));
    case REMOVE_GRAPH_INPUT:
      return state.updateIn(['Graph', 'inputs'], inputs => inputs.filter(input =>
        input.get('inputId') !== action.id,
      ));
    case UPDATE_GRAPH_INPUT:
      return state.updateIn(['Graph', 'inputs'], inputs => inputs.map((input) => {
        if (input.get('inputId') === action.id) {
          return input.set(action.input.key, action.input.value);
        }
        return input;
      }));
    case SET_BUDGET:
      return state.setIn(['Graph', 'budget'], action.budget);
    default:
      return state;
  }
}
