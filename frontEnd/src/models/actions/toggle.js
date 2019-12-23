export const TOGGLING = 'toggle/TOGGLING';
export const STRICT_TOGGLING = 'toggle/STRICT_TOGGLING';
export const CLEAR_TOGGLE = 'toggle/CLEAR_TOGGLE';
export const OVERLAY_TOGGLE = 'toggle/OVERLAY_TOGGLE';

export const toggling = (type) => ({
  type: TOGGLING,
  payload: type,
});

export const strictToggling = (type) => ({
  type: STRICT_TOGGLING,
  payload: type,
});

export const clearToggle = () => ({
  type: CLEAR_TOGGLE,
});

export const overlayToggle = () => ({
  type: OVERLAY_TOGGLE,
});
