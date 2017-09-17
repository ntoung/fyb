import {
  ADD_REPORT,
  SET_GRAPH_TYPE,
  ADD_GRAPH_INPUT,
  REMOVE_GRAPH_INPUT,
  UPDATE_GRAPH_INPUT,
  SET_BUDGET,
} from 'ActionTypes';

export function addReport(name, subtitle) {
  return {
    type: ADD_REPORT,
    name,
    subtitle,
  };
}

export function setGraphType(reportId, graphType) {
  return {
    type: SET_GRAPH_TYPE,
    reportId,
    graphType,
  };
}

export function addGraphInput(reportId) {
  return {
    type: ADD_GRAPH_INPUT,
    reportId,
  };
}

export function removeGraphInput(reportId, inputId) {
  return {
    type: REMOVE_GRAPH_INPUT,
    reportId,
    inputId,
  };
}

export function updateGraphInput(reportId, id, input) {
  return {
    type: UPDATE_GRAPH_INPUT,
    reportId,
    id,
    input,
  };
}

export function setBudget(reportId, budget) {
  return {
    type: SET_BUDGET,
    reportId,
    budget,
  };
}
