import { fromJS } from 'immutable';

import {
  OPEN_PRINT_MODAL,
  CLOSE_PRINT_MODAL,
  OPEN_CREATE_REPORT_MODAL,
  CLOSE_CREATE_REPORT_MODAL,
  OPEN_IMPORT_MODAL,
  CLOSE_IMPORT_MODAL,
  OPEN_EXPORT_MODAL,
  CLOSE_EXPORT_MODAL,
} from 'ActionTypes';

export default function App(state = {
  createReportModalOpen: false,
  printModalOpen: false,
  importModalOpen: false,
  exportModalOpen: false,
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
    case OPEN_IMPORT_MODAL:
      return state.set('importModalOpen', true);
    case CLOSE_IMPORT_MODAL:
      return state.set('importModalOpen', false);
    case OPEN_EXPORT_MODAL:
      return state.set('exportModalOpen', true);
    case CLOSE_EXPORT_MODAL:
      return state.set('exportModalOpen', false);
    default:
      return state;
  }
}
