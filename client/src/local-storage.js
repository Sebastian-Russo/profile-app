export const loadAuthToken = () => {
  const user = localStorage.getItem('user');
  console.log('getting user')
  return JSON.parse(user) //  returns { authToken: <whatever the token is>, userId: <whatever the userId is> }
};

export const saveAuthToken = (authToken, { id, username, groceryList, categoryList}) => {
  try {
      console.log('storing in local storage') // authToken, userId, username, groceryList
      localStorage.setItem('user', JSON.stringify({
        authToken,
        id,
        username,
        groceryList,
        categoryList
      }));
  } catch (e) {}
};

export const updateUser = toUpdate => {
console.log('toUpdate', toUpdate);
try {
  const userJSON = localStorage.getItem('user');
  const userObj = JSON.parse(userJSON);
  localStorage.setItem('user', JSON.stringify(Object.assign({}, userObj, toUpdate)));
} catch (e) {
  console.error('error updating user in storage', e);
}
}

export const addToList = (list, item) => {
try {
  const userJSON = localStorage.getItem('user');
  const userObj = JSON.parse(userJSON);
  localStorage.setItem('user', JSON.stringify(Object.assign({}, userObj, {
    [list]: [...userObj[list], item]
  })));
} catch (e) {
  console.error('error updating user in storage', e);
}
}

export const clearAuthToken = () => {
  try {
      console.log('clear auth token and user data in local storage')  
      localStorage.removeItem('user');
  } catch (e) {}
};

