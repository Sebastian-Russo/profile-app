import { 
  EDIT_NAME,
  EDIT_IMAGE
} from '../actions/profile-action';


const initState = {
    id: null, 
    name: "Please enter your nickname", 
    imageFile: {
      imageName: "",
      imageKey: "",
      imageUrl: "",
      id: ''
    }
}

const profileReducer = (state=initState, action) => {

  if (action.type === EDIT_NAME) {
    return Object.assign({}, state, {
        name: action.name
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

  console.log(state)
  return state;
}

export default profileReducer;

