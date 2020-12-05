export const loadAuthToken = () => {
  const user = localStorage.getItem('user');
  console.log('getting user')
  return JSON.parse(user) //  returns { authToken: <token>, userId: <id> }
};

export const saveAuthToken = (authToken, { id, username, nickName, profileImage }) => {
  try {
      console.log('storing in local storage') // authToken, userId, username, nick name, profile image
      localStorage.setItem('user', JSON.stringify({
        authToken,
        id,
        username,
        nickName, 
        profileImage
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

export const updateNickName = nickName => {
  console.log('toUpdate', nickName);
  try {
    const userJSON = localStorage.getItem('user');
    const userObj = JSON.parse(userJSON);
    localStorage.setItem('user', JSON.stringify(Object.assign({}, userObj, {
      nickName
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

