export const logout = (nav) => {
  localStorage.clear();
  nav('/auth');
};
