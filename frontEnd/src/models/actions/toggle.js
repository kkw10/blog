export const TOGGLING = 'toggle/TOGGLING';
export const CLEAR_TOGGLE = 'toggle/CLEAR_TOGGLE';

export const toggling = (type) => ({
  type: TOGGLING,
  payload: type,
});

export const clearToggle = () => ({
  type: CLEAR_TOGGLE,
});
