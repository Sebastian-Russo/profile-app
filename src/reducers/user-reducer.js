const initState = {
    id: '1', 
    name: "Sebberss", 
    picture: "picture of me"
}

const userReducer = (state=initState, action) => {
  if (action.type === 'EDIT_NAME') {
    return Object.assign({}, state, { 
      name: action.user.name 
    })
  }

  return state;
}

export default userReducer;