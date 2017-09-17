import {
  SET_GRAPH_TYPE,
  ADD_GRAPH_INPUT,
  REMOVE_GRAPH_INPUT,
  UPDATE_GRAPH_INPUT,
  SET_BUDGET,
} from 'ActionTypes';

export function setGraphType(graphType) {
  return {
    type: SET_GRAPH_TYPE,
    graphType,
  };
}

export function addGraphInput() {
  return {
    type: ADD_GRAPH_INPUT,
  };
}

export function removeGraphInput(id) {
  return {
    type: REMOVE_GRAPH_INPUT,
    id,
  };
}

export function updateGraphInput(id, input) {
  return {
    type: UPDATE_GRAPH_INPUT,
    id,
    input,
  };
}

export function setBudget(budget) {
  return {
    type: SET_BUDGET,
    budget,
  };
}
