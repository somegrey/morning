import React,{useState} from 'react';
import './App.css';
import {Input,Button} from 'antd';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';

function ScreenHome(props) {

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false)
  const [listErrorsIn, setListErrorsIn] = useState([]);
  const [listErrorsUp, setListErrorsUp] = useState([]);

  var handleSubmitSignUp = async () => {
    var data = await fetch('/sign-up',{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: "username=" + signUpUsername + "&email=" + signUpEmail + "&password=" + signUpPassword
    });  
    var body = await data.json();
    var user = body.userSaved;
    if(body.result){
      props.connectFunction(user);
      setIsLogin(true);
    } else {
      setListErrorsUp(body.error)
    }
  }

  var handleSubmitSignIn = async () => {
    var requete = await fetch('/sign-in',{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: "email=" + signInEmail + "&password=" + signInPassword
    });
    var response = await requete.json();
    if (response.result === true){
      props.connectFunction(response.user);
      setIsLogin(true);
    } else {
      setListErrorsIn(response.error2)
    }
  }

  var tabErrorUp = listErrorsUp.map((error, i) => {
    return(<p style={{color:"red"}}>{error}</p>)
  });

  var tabErrorIn = listErrorsIn.map((error, i) => {
    return(<p style={{color:"red"}}>{error}</p>)
  })

  if(isLogin === false) {
    return (
      <div className="Login-page" >
            {/* SIGN-IN */}
            <div className="Sign">
                <Input onChange={(e)=> setSignInEmail(e.target.value)} value={signInEmail} className="Login-input" placeholder="arthur@lacapsule.com" />
                <Input.Password onChange={(e)=> setSignInPassword(e.target.value)} value={signInPassword}  className="Login-input" placeholder="password" />  
              <Button onClick={()=> handleSubmitSignIn()} style={{width:'80px'}} type="primary">Sign-in</Button>
              {tabErrorIn}
            </div>

            {/* SIGN-UP */}
            <div className="Sign">
                <Input onChange={(e)=> setSignUpUsername(e.target.value)} value={signUpUsername} className="Login-input" placeholder="Arthur G" />
                <Input onChange={(e)=> setSignUpEmail(e.target.value)} value={signUpEmail} className="Login-input" placeholder="arthur@lacapsule.com" />
                <Input.Password onChange={(e)=> setSignUpPassword(e.target.value)} value={signUpPassword}  className="Login-input" placeholder="password" />
              <Button onClick={()=> handleSubmitSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>
              {tabErrorUp}
            </div>
        </div>
    );
    } else if (isLogin === true) {
      return (
        <Redirect to='/screensource' />
      )
    }
}

function mapDispatchToProps(dispatch){
  return{
    connectFunction: function(user){
      dispatch({type: 'connection', user: user});
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
 )(ScreenHome);
