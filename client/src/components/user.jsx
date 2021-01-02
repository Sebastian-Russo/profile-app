import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import UserForm from './user-form';
import { editName, editImage } from '../actions/profile-action';
import { updateUserRequest } from '../actions/auth';
import UploadImage from './upload-image';
import { updateNickName } from '../local-storage';
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

  // Input form for name 
  submit = value => {
    console.log(value)
    const { name } = value; 
    this.setState({ nickName: name })
    this.props.editName(name);
    updateNickName(name)
  }

  // Make form input appear/disappear 
  handleNameClick = () => {
    this.setState({ editNameClicked: !this.state.editNameClicked })
  }

  // Make UploadImage appear/disappear
  handleImageClick = () => {
    this.setState({ editImageClicked: !this.state.editImageClicked })
  }

  handleSaveClick = () => {
    console.log('SAVE CLICKER')
    this.props.updateUserRequest()
  }

  handleLogout = () => {
    console.log('clicked logout')
    this.props.logOut()
  }

  render() { 
    console.log(this.state.auth)
    console.log(this.state.user)
    console.log(this.state)


    // if (this.props.auth.authToken === null) {
    //   return <Redirect to="/login" />
    // } 
    // else if (this.props.auth.authToken !== null) {
    //   return <Redirect to="/user" />
    // }

    const { username, nickName } = this.props.auth;

    let nickNamePlaceHolder
    if (this.props.user.nickName) {
      nickNamePlaceHolder = this.props.user.nickName;
    } else {
      nickNamePlaceHolder = nickName;
    }

    const userProfile = (
      <div>
        <h3>Username: {username}</h3>
        <h5>Nick Name: {nickNamePlaceHolder}</h5>
      </div>      
    )

    const { id  } = this.props.user; 

    let changeName;
    if (this.state.editNameClicked) {
      changeName = <UserForm onSubmit={this.submit} />
    }
    let changeImage;
    if (this.state.editImageClicked) {
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
            <img src={this.props.user.imageFile.imageUrl} alt="profile" width="300px"/>
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
  console.log('MAP', state)
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
