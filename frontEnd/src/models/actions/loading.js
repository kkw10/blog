export const START_LOADING = 'loading/START_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = (type) => ({
  type: START_LOADING,
  payload: type
});

export const finishLoading = (type) => ({
  type: FINISH_LOADING,
  payload: type
});