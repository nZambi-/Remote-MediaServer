import React, {Component} from 'react';
import {Navbar, Icon} from 'react-materialize';
import Library from './components/routes/Library';
import Settings from './components/routes/Settings';
import Home from './components/routes/Home';
import {Route, NavLink} from 'react-router-dom';
import { apiActions} from 'redux-jsonapi';
import store from './stores/settingsStore';




class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    store.subscribe(() => {
      if(!store.getState().api.setting) {
        return;
      }
      console.log(store.getState().api.setting[1].attributes.name);
        this.setState({"name":store.getState().api.setting[1].attributes.name});

    });
    store.dispatch(apiActions.read(
      { id: 1, _type: 'settings' }
    )).then((a)=>{
      console.log(a, arguments);
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar brand={this.state.name} right>
          <li>
            <NavLink to="/">
              <Icon left>home</Icon>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/Library'>
              <Icon left>video_library</Icon>
              Library
            </NavLink>
          </li>
          <li>
            <NavLink to='/Settings'>
              <Icon left>settings</Icon>
              Settings
            </NavLink>
          </li>
        </Navbar>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/Library" component={Library}/>
        <Route path="/Settings" component={Settings}/>
      </div>
    );
  }
}

export default App;