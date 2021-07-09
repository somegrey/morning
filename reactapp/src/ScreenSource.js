import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  var borderfr={border:"2px white solid"}
  var borderuk={border:"none"}
  if(props.lang==="gb"){
    borderuk={border:"2px white solid"}
    borderfr={border:"none"}
  }

  useEffect(() => {
    async function loadSources(){
      var lang = 'fr'
      if (props.lang === "gb"){
        lang = "gb"
      }
      props.changeLang(props.lang)
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines/sources?country=${lang}&apiKey=ba77f76104294ea0a1367ba538b4ae2d`);
      var response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadSources()
  }, [props.lang])
  
  if (props.token === undefined){
    return(
      <Redirect to="/"/>
    )
  } else {
    
    return (
      <div>
          <Nav/>
          <div className="Banner">
            <img style={borderfr} onClick={() => props.changeLang('fr')} src={`/images/fr.svg`} />
            <img style={borderuk} onClick={() => props.changeLang('gb')} src={`/images/uk.svg`} />
          </div>
          <div className="HomeThemes">
                Hello {props.username} 
                <List
                    itemLayout="horizontal"
                    dataSource={sourceList}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={`/images/${item.category}.png`} />}
                          title={<Link to={'/screenarticlesbysource/'+item.id }>{item.name}</Link>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
            </div>                
        </div>
    );
  }
}

function mapStateToProps(state){
  return { token: state.user.token, username: state.user.username, lang: state.lang }
}

function mapDispatchToProps(dispatch){
  return{
    changeLang: function(lang){
      dispatch({type: 'changelang', lang});
    }
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource);

