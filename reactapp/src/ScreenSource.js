import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);
  const [selectedLang, setSelectedLang] = useState(props.lang);

  var borderfr={border:"2px white solid"}
  var borderuk={border:"none"}
  if(selectedLang==="gb"){
    borderuk={border:"2px white solid"}
    borderfr={border:"none"}
  }

  var changeLang = async (lang) => {
    setSelectedLang(lang)
    await fetch("/chose-lang/"+props.id, {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'lang=' + lang 
    });
  }

  useEffect(() => {
    async function loadSources(){
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines/sources?country=${selectedLang}&apiKey=ba77f76104294ea0a1367ba538b4ae2d`);
      var response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadSources()
  }, [selectedLang])
  
  if (props.token === undefined){
    return(
      <Redirect to="/"/>
    )
  } else {
    
    return (
      <div>
          <Nav/>
          <div className="Banner">
            <img style={borderfr} onClick={() => changeLang("fr")} src={`/images/fr.svg`} />
            <img style={borderuk} onClick={() => changeLang("gb")} src={`/images/uk.svg`} />
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
  return { token: state.user.token, username: state.user.username, id: state.user._id, lang: state.user.lang }
}

// function mapDispatchToProps(dispatch){
//   return{
//     changeLang: function(lang){
//       dispatch({type: 'changelang', lang});
//     }
//   }
// }

export default connect (
  mapStateToProps,
  null
)(ScreenSource);

