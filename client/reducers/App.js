import { } from 'immutable';

import {
  OPEN_PRINT_MODAL,
  CLOSE_PRINT_MODAL,
  OPEN_CREATE_REPORT_MODAL,
  CLOSE_CREATE_REPORT_MODAL,
} from 'ActionTypes';

export default function App(state = {
  createReportModalOpen: false,
  printModalOpen: false,
}, action) {
  switch (action.type) {
    case OPEN_CREATE_REPORT_MODAL:
      return state.set('createReportModalOpen', true);
    case CLOSE_CREATE_REPORT_MODAL:
      return state.set('createReportModalOpen', false);
    case OPEN_PRINT_MODAL:
      return state.set('printModalOpen', true);
    case CLOSE_PRINT_MODAL:
      return state.set('printModalOpen', false);
    default:
      return state;
  }
}
