import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { editName, editImage } from '../actions/profile-action';
import { updateUserRequest } from '../actions/auth';
import UploadImage from './upload-image';


class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false,
      editImageClicked: false,
      nickname: "",
      image: ""
    }
  }

  componentDidMount() {
    console.log(this.props.auth.nickName)
    this.setState({ nickName: this.props.auth.nickname })
  }

  // Input form for name 
  submit = value => {
    console.log(value)
    const { name } = value; 
    this.setState({ nickname: name })
    this.props.editName(name);
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

  render() { 

    const { username } = this.props.auth;
    console.log(this.props)
    const userProfile = (
      <div>
        <h3>Username: {username}</h3>
      </div>      
    )

    const {  id  } = this.props.user; 
    const nickName = this.state.nickname

    let changeName;
    if (this.state.editNameClicked) {
      changeName = <UserForm onSubmit={this.submit} />
    }
    let changeImage;
    if (this.state.editImageClicked) {
      changeImage = <UploadImage />
    }
    

    return ( 
      <div key={id} className="container">
        {userProfile}
        <h5>{nickName}</h5>
        {changeName}
        <button 
            className="btn btn-secondary" 
            onClick={() => this.handleNameClick(id)}
            >Add/Edit Name</button>
        {/* <div width="50%" height="50%" >
            <img src={this.props.image.imageUrl} alt="profile" width="300px"/>
        </div> */}
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
      updateUserRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
