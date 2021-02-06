import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { editName, editImage } from '../actions/users';
import { updateUserRequest } from '../actions/users';
import UploadImage from './upload-image';
import { updateUser } from '../local-storage';
import { logOut } from '../actions/auth';

class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false,
      editImageClicked: false,
      nickName: "",
      image: ""
    }
  }

  componentDidMount() {
    this.setState({
      nickName: this.props.user.nickName || "",
      image: this.props.user.imageFile || ""
    })
  }

  // Input form for name 
  submit = value => {
    console.log(value)
    const { name } = value; 
    this.setState({ nickName: name }) // set state to render 
    // save nickName to redux store 
    this.props.editName(name);
    // save nickName to local storage
    updateUser({ nickName: name });
  }

  // Toggle form input
  handleNameClick = () => {
    this.setState({ editNameClicked: !this.state.editNameClicked })
  }

  // Toggle UploadImage
  handleImageClick = () => {
    this.setState({ editImageClicked: !this.state.editImageClicked })
  }

  // saves nickName and image to DB
  handleSaveClick = () => {
    const user = {
      nickName: this.state.nickName,
      imageFile: this.state.image
    }
    this.props.updateUserRequest(user)
  }

  handleLogout = () => {
    this.props.logOut()
    this.props.history.push('/login')    
  }

  render() { 
    const { username, id} = this.props.auth;
    const { nickName, imageFile } = this.props.user;
    const { editNameClicked, editImageClicked } = this.state;

    const userProfile = (
      <div>
        <h3>Username: {username}</h3>
        <h5>Nick Name: {nickName}</h5>
      </div>      
    )

    let changeName;
    if (editNameClicked) {
      changeName = <UserForm onSubmit={this.submit} />
    }
    let changeImage;
    if (editImageClicked) {
      changeImage = <UploadImage />
    }

    return ( 
      <div className="container">
        {userProfile}
        {changeName}
        <button 
            className="btn btn-secondary" 
            onClick={() => this.handleNameClick(id)}
            >Add/Edit Name</button>
        <div width="50%" height="50%" >
            <img src={imageFile.imageUrl} alt="profile" width="300px"/>
        </div>
        <button 
            className="btn btn-secondary" 
            onClick={() => this.handleImageClick()}
            >Add/Edit Picture</button>
        {changeImage}
        <div>
          <button 
              className="btn btn-secondary m-2"
              onClick={this.handleSaveClick}
              >Save Changes</button>
        </div>
        <div>
          <button
          className="btn btn-secondary m-2"
          onClick={this.handleLogout}
          >Logout</button>
        </div>
      </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      editName, 
      editImage,
      updateUserRequest,
      logOut
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
