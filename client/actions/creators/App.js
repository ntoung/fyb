import {
  OPEN_CREATE_REPORT_MODAL,
  CLOSE_CREATE_REPORT_MODAL,
  OPEN_PRINT_MODAL,
  CLOSE_PRINT_MODAL,
} from 'ActionTypes';

export function openCreateReportModal() {
  return {
    type: OPEN_CREATE_REPORT_MODAL,
  };
}

export function closeCreateReportModal() {
  return {
    type: CLOSE_CREATE_REPORT_MODAL,
  };
}

export function openPrintModal() {
  return {
    type: OPEN_PRINT_MODAL,
  };
}

export function closePrintModal() {
  return {
    type: CLOSE_PRINT_MODAL,
  };
}
