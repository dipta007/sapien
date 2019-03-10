import CHANGE_USERNAME from './actionTypes';

const changeUsername = username => ({
  type: CHANGE_USERNAME,
  payload: {
    username
  }
});

export default changeUsername;
