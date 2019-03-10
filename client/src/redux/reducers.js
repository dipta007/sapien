import CHANGE_USERNAME from './actionTypes';

const initialState = {
  username: 'dipta007'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME: {
      const { username } = action;
      return {
        username
      };
    }
    default:
      return state;
  }
}
