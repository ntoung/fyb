import {
  OPEN_CREATE_REPORT_MODAL,
  CLOSE_CREATE_REPORT_MODAL,
  OPEN_PRINT_MODAL,
  CLOSE_PRINT_MODAL,
  OPEN_IMPORT_MODAL,
  CLOSE_IMPORT_MODAL,
  OPEN_EXPORT_MODAL,
  CLOSE_EXPORT_MODAL,
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

export function openImportModal() {
  return {
    type: OPEN_IMPORT_MODAL,
  };
}

export function closeImportModal() {
  return {
    type: CLOSE_IMPORT_MODAL,
  };
}


export function openExportModal() {
  return {
    type: OPEN_EXPORT_MODAL,
  };
}

export function closeExportModal() {
  return {
    type: CLOSE_EXPORT_MODAL,
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
