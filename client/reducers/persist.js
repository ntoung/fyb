import { createTransform } from 'redux-persist-immutable';
import { inputIdGenerator } from './constants';

export default function transform() {
  return createTransform(
    state => ({ ...state,
      Reports: state.get('Reports').map(report => (
        report.set('inputIdGenerator', inputIdGenerator(report.inputs.length))
      ),
      ),
    }),
  );
}
