import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';
import Axios from '../../Utilities/axios';
import CHANGE_USERNAME from '../../redux/actionTypes';

class HomeNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modal: false,
      users: [],
      selectedUsername: 'dipta007'
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onChangeUsername = e => {
    this.setState({
      selectedUsername: e.target.value
    });
  };

  changeUsername = user => {
    this.props.changeUsername(user);
    if (this.state.modal) this.toggleModal();
  };

  componentDidMount = async () => {
    let authors = await Axios.post('/graphql', {
      query: `
        query {
          authors {
            username
          }
        }
      `
    });
    authors = authors.data.data.authors;
    this.setState({
      users: authors.map(item => item.username)
    });
  };

  render() {
    const { isOpen, modal } = this.state;
    const usernameOptions = this.state.users
      .filter(item => item !== 'guest')
      .map(item => <option key={item}>{item}</option>);
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Input
              type="select"
              className="sort-dropbox"
              value={this.state.selectedUsername}
              onChange={this.onChangeUsername}
            >
              {usernameOptions}
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.changeUsername(this.state.selectedUsername)}
            >
              Select
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Sapien Test</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleModal}>
                    Change User
                  </DropdownItem>
                  <DropdownItem onClick={() => this.changeUsername('guest')}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUsername: currentUser =>
      dispatch({ type: CHANGE_USERNAME, username: currentUser })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeNavBar);
