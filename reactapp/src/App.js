import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import articleWishlist from './articleWishlist.reducer.js';
import user from './user.reducer.js';
import lang from './lang.reducer.js';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({articleWishlist, user, lang}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/screenmyarticles" exact component={ScreenMyArticles} />
          <Route path="/screensource/" exact component={ScreenSource} />
          <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
