import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { postNameRequest, updateNameRequest } from '../actions/name-action';
import { updateImageRequest } from '../actions/image-action';
import UploadImage from './upload-image';


class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false,
      editImageClicked: false  
    }
  }

  // Input form for name 
  submit = value => {
    if (this.props.user.name === "Please enter your nickname") {
        this.props.postNameRequest(value)
    } else {
        const {name} = value;
        this.props.user.name = name; 
        this.props.updateNameRequest(this.props.user)
    }
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
    this.props.updateNameRequest(this.props.user)
  }

  render() { 
    console.log(this.props)
    const { name, id, image } = this.props.user; 
    
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
        <h3>{name}</h3>
        {changeName}
        <button 
            className="btn btn-secondary" 
            onClick={() => this.handleNameClick(id)}
            >Add/Edit Name</button>
        <div width="50%" height="50%" >
            <img src={image.imageUrl} alt="profile" width="300px"/>
        </div>
        <button 
            className="btn btn-secondary" 
            onClick={() => this.handleImageClick()}
            >Add/Edit Picture</button>
        {changeImage}
        <button
          className="btn btn-secondary"
          onClick={() => this.handleSaveClick()}
        >Save Changes 
        </button>
      </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
     postNameRequest,
     updateNameRequest,
     updateImageRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
