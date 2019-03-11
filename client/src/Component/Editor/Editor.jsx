import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Label, Alert } from 'reactstrap';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedTab: 'write',
      error: 0
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = value => {
    this.setState({
      value,
      error: 1
    });
    this.props.onChange(value);
  };

  render() {
    const { error, value } = this.state;
    const { submitted } = this.props;
    return (
      <>
        <Label for="desription" style={{ marginTop: '10px' }}>
          Description
        </Label>
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          onTabChange={tab => this.setState({ selectedTab: tab })}
          selectedTab={this.state.selectedTab}
        />
        {(error || submitted) && !value.length ? (
          <Alert style={{ marginTop: '10px' }} color="danger">
            Description can't be empty
          </Alert>
        ) : null}
      </>
    );
  }
}

Editor.propTypes = {
  submitted: PropTypes.bool,
  onChange: PropTypes.func
};

export default Editor;
