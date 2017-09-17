import {
  SET_PRINT_LIST,
} from 'ActionTypes';

export function setPrintList(printList) {
  return {
    type: SET_PRINT_LIST,
    printList,
  };
}
