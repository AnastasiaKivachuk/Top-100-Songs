import { SET_LOADING_DATA } from '../constants';

const initialState = {
  isDataLoading: false,
};

const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_DATA:
      return {
        ...state,
        isDataLoading: payload,
      };
    default: return state;
  }
};

export default loaderReducer;
