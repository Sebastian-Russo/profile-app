import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import { editName } from '../actions/user-action';

class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false
    }
  }

  submit = values => {
    this.props.editName(values)
  }

  // make form input appear/disappear 
  handleClick = () => {
    this.setState({ editNameClicked: !this.state.editNameClicked })
    console.log(this.state)
  }

  render() { 
    const { name, picture, id } = this.props.user; 
    
    let changeName;
    if (this.state.editNameClicked) {
      changeName = <UserForm onSubmit={this.submit} />
    }

    return ( 
      <div key={id}>
        <h3>{name}</h3>
        {changeName}
        <button onClick={() => this.handleClick(id)}>Edit Name</button>
        <div>{picture}</div>
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
  return bindActionCreators({ editName: editName }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
