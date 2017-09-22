import { combineReducers } from 'redux-immutable';
import { fromJS, OrderedMap, List, Map } from 'immutable';

import App from 'Reducers/App';
import Reports from 'Reducers/Reports';
import Print from 'Reducers/Print';


export const initialState = fromJS({
  App: {
    createReportModalOpen: false,
    printModalOpen: false,
  },
  Print: {
    PrintList: List([]),
  },
  Reports: OrderedMap({}),
  /*
   * graphType: 1,
   * budget: 0,
   * inputs: [{
   *   inputId: 1,
   *   inputName: '',
   *   inputCost: undefined,
   *   inputFrequency: 1,
   *   inputSerialNumber: undefined,
   * }],
   */

});

export const reducers = combineReducers({
  App,
  Print,
  Reports,
});

