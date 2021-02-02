import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { singleFileUploadRequest } from '../actions/users';


class UploadIMage extends Component {
  constructor(props) {
    super(props)
      this.state = { 
        selectedFile: null,
      }
  }

  // input select profile picture 
  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  singleFileUploadHandler = () => {
      const {selectedFile} = this.state; 
      // API request to S3 storage 
      if (selectedFile == null) {
        alert("Please select picture before upload")
      } else {
        this.props.singleFileUploadRequest(selectedFile)
      }
  }

  render() { 
    console.log('uploader', this.state)
    return ( 

      <div>
        <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
          <div className="card-header">
              <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
              <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
        </div>
        <div className="card-body">
          <p className="card-text">Please upload an image for your profile</p>
          <input type="file" onChange={this.singleFileChangedHandler}/>
          <div className="mt-5">
              <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
          </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      singleFileUploadRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadIMage);