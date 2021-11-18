import type { PageAction } from '../actions/page';

const reducer = (state = 1, action: PageAction) => {
  switch (action.type) {
    case 'INCREMENT_PAGE':
      return state + 1;
    case 'RESET_PAGE':
      return 1;
    default:
      return state;
  }
};

export default reducer;
