import { 
  EDIT_NAME,
  EDIT_IMAGE
} from '../actions/profile-action';


const initState = {
    nickName: "", 
    imageFile: {
      imageName: "",
      imageKey: "",
      imageUrl: "",
      id: ''
    }
}

const profileReducer = (state=initState, action) => {

  if (action.type === EDIT_NAME) {
    console.log('REDUCER', action.type, action.nickName)
    return Object.assign({}, state, {
        nickName: action.nickName
    })
  }
  if (action.type === EDIT_IMAGE) {
    return Object.assign({}, state, {
        imageFile: {
          imageName: action.imageFile.imageName,
          imageKey: action.imageFile.imageKey,
          imageUrl: action.imageFile.imageUrl
        }
    })
  }

  console.log(state)
  return state;
}

export default profileReducer;

