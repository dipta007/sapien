import React, { Component } from 'react';
import {
 BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import './App.css';
import HomeNavBar from './Component/NavBar/HomeNavbar';
import Post from './Container/Post/Post';
import AddPost from './Container/AddPost/AddPost';
import Feed from './Container/Feed/Feed';

class App extends Component {
  render() {
    return (
      <>
        <HomeNavBar />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Feed} />
            <Route path="/posts/:postid" exact component={Post} />
            <Route path="/addPost" exact component={AddPost} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
