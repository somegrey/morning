import React,{useState} from 'react';
import './App.css';
import {Menu, Icon} from 'antd'
import { Link } from "react-router-dom";

function Nav() {
  const [isLogin, setIsLogin] = useState(true);

  var logOut = async () => {
    setIsLogin(false)
  }

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">
        <Menu.Item key="mail">
          <Link to="/screensource"><Icon type="home" /> Sources</Link>
        </Menu.Item>
        <Menu.Item key="test">
          <Link to="/screenmyarticles"><Icon type="read" /> My Articles</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/" onClick={()=> logOut()} ><Icon type="logout" /> Logout</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default Nav;
