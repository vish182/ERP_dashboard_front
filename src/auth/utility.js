export const isAuthorized = ({ role }) => {
  if (role > 0) {
    return true;
  } else {
    return false;
  }
};
