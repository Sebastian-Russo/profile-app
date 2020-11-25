import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { postNameRequest, updateNameRequest } from '../actions/name-action';
import UploadImage from './upload-image';


class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false,
      editImageClicked: false,
      image: ""
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


  render() { 
    console.log(this.props)
    const { name, id } = this.props.user; 
    
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
        <button onClick={() => this.handleNameClick(id)}>Edit Name</button>
        <div>
            <img src="" alt="profile picture" />
        </div>
        <button onClick={() => this.handleImageClick()}>Edit Picture</button>
        {changeImage}
      </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    image: state.image
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
     postNameRequest,
     updateNameRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
