import { Map, List } from 'immutable';

/*
 * InputIdGenerator creates a unique identifier for each input
 */
export function inputIdGenerator(inputPrefix, inputId = 0) {
  return `${inputPrefix}_${inputId}`;
}

export function createReport(reportId, name, subtitle) {
  return Map({
    name,
    subtitle,
    view: 1,
    budget: 0,
    inputSuffix: 0,
    inputs: List([]),
  });
}

export function createItem(inputId) {
  return Map({
    inputId,
    inputName: '',
    inputCost: 0,
    inputFrequency: 1,
    inputSerialNumber: 0,
  });
}
