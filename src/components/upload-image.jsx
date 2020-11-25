      import React, { Component } from 'react';
      import Axios from 'axios';
      import { connect } from 'react-redux';
      import { bindActionCreators } from 'redux';
      import { updateImageState } from '../actions/image-action';
      import { API_BASE_URL } from "../config";

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
          const data = new FormData();
          if (this.state.selectedFile) {
            data.append('image', this.state.selectedFile, this.state.selectedFile.name);
            Axios.post( `${API_BASE_URL}/user`, data, {
              headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US, en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
              }
            })
              .then((res) => {
                if (200 === res.status) {
                  if ( res.data.error ) {
                    if ('LIMIT_FILE_SIZE' === res.data.errer.code) {
                      alert('Max size: 2MB')
                    } else {
                      console.log(res.data);
                      alert(res.data.error)
                    }
                  } else {
                    // Success
                    let fileName = res.data;
                    // UPDATE STORE 
                    this.props.updateImageState(fileName)
                    alert('File Uploaded');
                  }
                }
              })
                .catch((err) => {
                  alert(err)
                  console.log(err)
                });
          } else {
            // if file not selected throw error
            alert('Please upload file')
          }
        }

        render() { 

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
          
        }
      }

      const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            updateImageState
        }, dispatch)
      }

      export default connect(mapStateToProps, mapDispatchToProps)(UploadIMage);