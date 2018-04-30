import SyncanoClient from 'syncano-client';

const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

export const createAsyncAction = (end, err, fn) => {
  return (dispatch) => {
    return fn()
      .then((data) => {
        return dispatch({ type: end, payload: data });
      })
      .catch((error) => {
        return dispatch({ type: err, error: error.message });
      });
  };
};

export const API = {
  post(url, data, fn = () => null) {
    return s.post(url, data)
      .then((response) => {
        if (fn) {
          return fn(response);
        }
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  delete(url, data, fn = () => null) {
    return s.post(url, data)
      .then((response) => {
        if (fn) {
          return fn(response);
        }
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
};
