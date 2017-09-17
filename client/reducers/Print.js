import { List } from 'immutable';

import {
  SET_PRINT_LIST,
} from 'ActionTypes';

export default function Print(state = List([]), action) {
  switch (action.type) {
    case SET_PRINT_LIST:
      return state.set('PrintList', List(action.printList));
    default:
      return state;
  }
}
