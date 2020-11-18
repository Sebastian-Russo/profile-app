import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {

  handleClick = () => {
    this.props.editName(this.props.user.id)
  }

  render() { 
    console.log(this.props)
    const { name, picture,id } = this.props.user; 

    return ( 
      <div key={id}>
        <h3>{name}</h3>
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
  return {
    editName: (id) => { dispatch({ type: 'EDIT_NAME', id: id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)