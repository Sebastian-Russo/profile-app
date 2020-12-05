import { 
  EDIT_NAME,
  EDIT_IMAGE
} from '../actions/profile-action';
// import { updateNickName } from '../local-storage';
// import { updateUser } from '../local-storage';


const initState = {
    nickName: "Please enter your nickname", 
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
        image: {
          imageName: action.imageFile.imageName,
          imageKey: action.imageFile.imageKey,
          imageUrl: action.imageFile.imageUrl
        }
    })
  }

  // updateNickName(state.nickName)
  // console.log(state)
  return state;
}

export default profileReducer;

