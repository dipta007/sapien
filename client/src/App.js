import React, { Component, Suspense } from 'react';
import {
 BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import './App.css';
import HomeNavBar from './Component/NavBar/HomeNavbar';
import Feed from './Container/Feed/Feed';
import Loading from './Component/Loading/Loading';

const Post = React.lazy(() => import('./Container/Post/Post'));
const AddPost = React.lazy(() => import('./Container/AddPost/AddPost'));

class App extends Component {
  render() {
    return (
      <>
        <HomeNavBar />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Feed} />
            <Route
              path="/posts/:postid"
              exact
              render={() => (
                <Suspense fallback={<Loading />}>
                  <Post />
                </Suspense>
              )}
            />
            <Route
              path="/addPost"
              exact
              render={() => (
                <Suspense fallback={<Loading />}>
                  <AddPost />
                </Suspense>
              )}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
