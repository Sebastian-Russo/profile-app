export const loadAuthToken = () => {
  const user = localStorage.getItem('user');
  console.log('getting user')
  return JSON.parse(user) //  returns { authToken: <token>, userId: <id> }
};

export const saveAuthToken = (authToken, { id, username, nickName, imageFile }) => {
  try {
      console.log('storing in local storage', id, username, nickName, imageFile ) // authToken, userId, username, nick name, profile image
      localStorage.setItem('user', JSON.stringify({
        authToken,
        id,
        username,
        nickName, 
        imageFile
      }));
  } catch (err) {
    console.error('error saving authToken and storing user in local storage', err)
  }
};

export const updateUser = toUpdate => {
try {
  const userJSON = localStorage.getItem('user');
  const userObj = JSON.parse(userJSON);
  console.log('local storage userObj', userObj);
  console.log('local storage toUpdate', toUpdate);
  localStorage.setItem('user', JSON.stringify(
    Object.assign({}, 
      userObj, 
      toUpdate
    ))
  );
} catch (err) {
  console.error('error updating user in local storage', err);
}
}

export const clearAuthToken = () => {
  try {
      console.log('clear auth token and user data in local storage')  
      localStorage.removeItem('user');
  } catch (e) {}
};

