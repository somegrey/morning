import React, {useState,useEffect} from 'react';
import './App.css';
import { Modal, Card, Icon, Col, Row } from 'antd';
import Nav from './Nav'
import { Redirect} from "react-router-dom";
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [frontDisplay, setFrontDisplay] = useState([]);
  const [lang, setLang] = useState(null);

  const showModal = (title, content, description, link) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
    setDescription(description);
    setLink(link);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  var ifEmpty= "";
  
  var borderfr={border:"none"}
  var borderuk={border:"none"}
  if(lang === "uk"){
    borderuk={border:"2px white solid"}
    borderfr={border:"none"}
  } else if(lang === "fr"){
    borderfr={border:"2px white solid"}
    borderuk={border:"none"}
  } 

  const deleteArticle = async (token,id) => {
    var rawResponse =  await fetch(`/deletewishlist/`,{
      method:'DELETE',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: "token=" + token + "&id=" + id 
    });
  }

  useEffect(() =>{
    async function loadMyArticles(){

      var rawResponse = await fetch(`/getwishlist?token=${props.token}`);
      var response  = await rawResponse.json();

      if (lang === null){
        setFrontDisplay(response.articles)
      } else if (lang !== null){
        var filteredList = []
        for (var i=0; i<response.articles.length; i++){
          if(response.articles[i].lang === lang){
            filteredList.push(response.articles[i])
          }
        }
        setFrontDisplay(filteredList)
      }
    }  
    loadMyArticles()
  },[lang])

  console.log(frontDisplay)

  var frontWishlist=[]
  for (let i=0; i < frontDisplay.length; i++){
    frontWishlist.push(
      <Col span={6} style={{display:'flex',justifyContent:'center'}}>
        <Card
          style={{width: 300, margin:'15px', display:'flex', flexDirection: 'column', justifyContent:'space-between' }}
          cover={<img alt="example" src={frontDisplay[i].image}/>}
          actions={[
            <Icon onClick={() => showModal(frontDisplay[i].title, frontDisplay[i].content, frontDisplay[i].description, frontDisplay[i].url)} type="read" key="ellipsis2" />,
            <Icon onClick={() => deleteArticle(props.token, frontDisplay[i]._id)} type="delete" key="ellipsis" />
          ]}
          >  
          <Meta
            title={frontDisplay[i].title}
            description={frontDisplay[i].description}
          />
          <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
            {/* <p>{pubdate}</p> */}
            <strong>{description}</strong>
            <p>{content}</p>
            <p><a href={link} target="_blank" rel="noopener noreferrer">Lire l'article en entier</a></p>
            </Modal>
        </Card>
      </Col>
    );
  }

  if (frontWishlist.length === 0 && lang === null){
    ifEmpty= "Vous n'avez pas encore séléctionné d'articles à lire";
  } else if (frontWishlist.length === 0 && lang !== null){
    ifEmpty= "Vous n'avez pas encore séléctionné d'articles à lire  dans cette langue";
  }

  if (props.token === undefined){
    return(
      <Redirect to="/"/>
    )
  } else {

    return (
      <div>
        <Nav/>
        <div className="Banner">
          <img style={borderfr} onClick={() => setLang("fr")} src={`/images/fr.svg`} />
          <img style={borderuk} onClick={() => setLang("gb")} src={`/images/uk.svg`} />
        </div>
        <Row className="Card" style={{display:'flex',justifyContent:'center'}}>
        {frontWishlist}
        {ifEmpty}
        </Row>   
      </div>
    );
  }
}

function mapStateToProps(state){
  return { wishlistToDisplay: state.articleWishlist, token: state.user.token}
}

function mapDispatchToProps(dispatch){
  return { 
    deleteArticle: function(index){
      dispatch({type:'delete', index})
      console.log(index)
    }
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(ScreenMyArticles);
