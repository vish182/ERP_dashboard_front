export const isAuthorized = ({ role }) => {
  if (role > 0) {
    return true;
  } else {
    return false;
  }
};

export const isActivated = ({ activated }) => {
  if (activated) {
    return true;
  } else {
    return false;
  }
};
