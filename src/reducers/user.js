const initState = {
  user: {
    id: '1', 
    name: "Sebberss", 
    picture: "picture of me"
  },
  
}

const userReducer = (state=initState, action) => {
  if (action.type === 'EDIT_NAME') {
    console.log('edit name')
    let newName = "add user input"
    Object.assign({}, state, {name: newName})
  }

  return state;
}

export default userReducer;