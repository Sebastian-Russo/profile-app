export const loadAuthToken = () => {
  const user = localStorage.getItem('user');
  console.log('getting user')
  return JSON.parse(user) //  returns { authToken: <token>, userId: <id> }
};

export const saveAuthToken = (authToken, { id, username, nickName, imageFile }) => {
  try {
      console.log('storing in local storage', id, username, nickName, imageFile ) // authToken, userId, username, nick name, profile image
      localStorage.setItem('user', JSON.stringify({ // reason to stringify, keeps the data type the same aka string and not something else like obj or symbol, for safety - don't run into type issues 
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
      // 2nd arg, either nickName or imageFile 
export const updateUser = (updateUserObj) => {
  try {
    const userJSON = localStorage.getItem('user');
    const currentUserObj = JSON.parse(userJSON);
    localStorage.setItem('user', JSON.stringify(
      {...currentUserObj, // copy current obj
      ...updateUserObj, // replace with updated obj, either nickName, imageFile, or both
      }
    ));
  } catch (err) {
    console.error('error updating user in local storage', err);
  }
};
  
export const clearAuthToken = () => {
  try {
    console.log('clear auth token and user data in local storage')  
    localStorage.removeItem('user');
  } catch (err) {
      console.error('error clearing authToken', err);
  }
};

