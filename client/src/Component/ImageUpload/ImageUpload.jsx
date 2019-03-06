import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { Alert, Label } from 'reactstrap';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      error: 0
    };
  }
  onImageUpload = (pictureFiles, pictureDataURLs) => {
    this.setState(
      {
        pictures: pictureFiles,
        error: 1
      },
      () => {
        this.props.onChange(this.state.pictures);
        const node = document.querySelector(
          `#image-upload-${this.props.label} > div > div > button`
        );
        if (this.state.pictures.length > 0) {
          node.disabled = true;
        } else {
          node.disabled = false;
        }
      }
    );
  };
  render() {
    const { error, pictures } = this.state;
    const { required, alertMessage, submitted, label } = this.props;
    return (
      <div id={'image-upload-' + label}>
        <Label for="Cover" style={{ marginTop: '20px' }}>
          {label}
        </Label>
        <ImageUploader
          withIcon={false}
          buttonText="Choose images"
          onChange={this.onImageUpload}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview
          singleImage
          disabled
        />
        {required && (submitted || error) && !pictures.length ? (
          <Alert style={{ marginTop: '10px' }} color="danger">
            {alertMessage}
          </Alert>
        ) : null}
      </div>
    );
  }
}

ImageUpload.propTypes = {
  required: PropTypes.bool,
  alertMessage: PropTypes.string,
  submitted: PropTypes.bool,
  label: PropTypes.string
};

export default ImageUpload;
