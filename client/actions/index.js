import * as App from './creators/App';
// import * as Graph from './creators/Graph';
import * as Reports from './creators/Reports';
import * as Print from './creators/Print';

/*
 * App Creators
 */
export const openCreateReportModal = App.openCreateReportModal;
export const closeCreateReportModal = App.closeCreateReportModal;
export const openPrintModal = App.openPrintModal;
export const closePrintModal = App.closePrintModal;
export const openImportModal = App.openImportModal;
export const closeImportModal = App.closeImportModal;
export const openExportModal = App.openExportModal;
export const closeExportModal = App.closeExportModal;

/*
 * Graph Creators
 */
// export const setGraphType = Graph.setGraphType;
// export const addGraphInput = Graph.addGraphInput;
// export const removeGraphInput = Graph.removeGraphInput;
// export const updateGraphInput = Graph.updateGraphInput;
// export const setBudget = Graph.setBudget;

/*
 * Reports Creators
 */
export const addReport = Reports.addReport;
export const setView = Reports.setView;
export const addGraphInput = Reports.addGraphInput;
export const removeGraphInput = Reports.removeGraphInput;
export const updateGraphInput = Reports.updateGraphInput;
export const setBudget = Reports.setBudget;
export const importReports = Reports.importReports;

/*
 * Print Creators
 */
export const setPrintList = Print.setPrintList;
