import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { editName, editImage } from '../actions/profile-action';
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
    console.log('SAVE CLICKER',this.props.image)
    if (this.props.image.id.length === 0) {
      console.log('clicked')
      this.props.postImageRequest(this.props.image)
    } 
    else if (this.props.image.id.length) {
      this.props.updateImageRequest(this.props.image)
    }
  }

  render() { 

    const { auth } = this.props;
    // console.log(auth)
    const userProfile = (
      <div>
        <h3>Username: {auth.username}</h3>
      </div>      
    )

    const { name, id,  } = this.props.user; 
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
        <h5>{name}</h5>
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
      </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    image: state.image,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      editName, 
      editImage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
