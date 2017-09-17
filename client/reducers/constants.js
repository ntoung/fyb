import { Map, List } from 'immutable';

export default Map({
  name: '',
  subtitle: '',
  graphType: 1,
  budget: 0,
  inputIdGenerator: undefined,
  inputs: List([
    Map({
      inputId: 1,
      inputName: '',
      inputCost: undefined,
      inputFrequency: 1,
      inputSerialNumber: undefined,
    }),
  ]),
});

export function createReport(reportId, name, subtitle) {
  /*
   * InputIdGenerator creates a unique identifier for each input
   */
  const inputIdGenerator = ((inputPrefix) => {
    let inputId = 0;
    return () => {
      inputId += 1;
      return `${inputPrefix}_${inputId}`;
    };
  })(reportId);

  return Map({
    name,
    subtitle,
    graphType: 1,
    budget: 0,
    inputIdGenerator,
    inputs: List([]),
    //   Map({
    //     inputId: '1',
    //     inputName: '',
    //     inputCost: undefined,
    //     inputFrequency: 1,
    //     inputSerialNumber: undefined,
    //   }),
    // ]),
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

