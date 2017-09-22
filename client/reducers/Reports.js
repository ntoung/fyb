import { Map, OrderedMap } from 'immutable';
import crypto from 'crypto-browserify';

import {
  ADD_REPORT,
  SET_GRAPH_TYPE,
  ADD_GRAPH_INPUT,
  REMOVE_GRAPH_INPUT,
  UPDATE_GRAPH_INPUT,
  SET_BUDGET,
} from 'ActionTypes';

import { inputIdGenerator, createItem, createReport } from 'Constants';

const nextReportId = () => crypto.randomBytes(20).toString('hex');


export default function Reports(state = OrderedMap(), action) {
  let reportId;

  switch (action.type) {
    case ADD_REPORT:
      reportId = nextReportId();
      return state.set(reportId, createReport(
        reportId,
        action.name,
        action.subtitle,
      ));
    case SET_GRAPH_TYPE:
      return state.setIn([action.reportId, 'graphType'], action.graphType);
    case ADD_GRAPH_INPUT:
      return state
        .updateIn(
          [action.reportId, 'inputs'],
          inputs => inputs.push(
            createItem(inputIdGenerator(
              action.reportId,
              state.getIn([action.reportId, 'inputSuffix']),
            )),
          ))
        .updateIn(
          [action.reportId, 'inputSuffix'],
          inputSuffix => inputSuffix + 1,
        );
    case REMOVE_GRAPH_INPUT:
      return state.updateIn([action.reportId, 'inputs'], inputs => inputs.filter(input =>
        input.get('inputId') !== action.inputId,
      ));
    case UPDATE_GRAPH_INPUT:
      return state.updateIn([action.reportId, 'inputs'], inputs => inputs.map((input) => {
        if (input.get('inputId') === action.id) {
          return input.set(action.input.key, action.input.value);
        }
        return input;
      }));
    case SET_BUDGET:
      return state.setIn([action.reportId, 'budget'], action.budget);
    default:
      return state;
  }
}
