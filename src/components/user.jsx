import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './user-form';

class User extends Component {
  constructor(props) {
    super(props)
      this.state = {
      editNameClicked: false
    }
  }

  submit = values => {
    console.log(values)
  }

  handleClick = () => {
    this.setState({ editNameClicked: !this.state.editNameClicked })
    console.log(this.state)
    // have input appear for user to submit name, when user clicks 'edit name'
    // have form component appear when user clicks 'edit name'
    // this.props.editName(this.props.user.id)
  }

  render() { 
    // console.log(this.props)
    const { name, picture,id } = this.props.user; 
    
    return ( 
      <div key={id}>
        <h3>{name}</h3>
        <UserForm onSubmit={this.submit} />
        <button onClick={() => this.handleClick(id)}>Edit Name</button>
        <div>{picture}</div>
      </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editName: (id) => { dispatch({ type: 'EDIT_NAME', id: id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)