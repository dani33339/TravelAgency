// return's user data from locls storage

export const fetchUserData = () => {
  const userInfo = localStorage.getItem("user") !== "undefined"
  ? JSON.parse(localStorage.getItem("user"))
  : localStorage.clear();
  return userInfo;
};


export const fetchFilterData = () => {
  const fillters = localStorage.getItem("fillters") !== "undefined"
  ? JSON.parse(localStorage.getItem("fillters"))
  : localStorage.clear();
  return fillters;
};
