import React, {useState} from 'react';
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

  var frontWishlist = [];
  for (let i=0; i<props.wishlistToDisplay.length; i++){
    frontWishlist.push(
      <Col span={6} style={{display:'flex',justifyContent:'center'}}>
        <Card
          style={{width: 300, margin:'15px', display:'flex', flexDirection: 'column', justifyContent:'space-between' }}
          cover={<img alt="example" src={props.wishlistToDisplay[i].urlToImage}/>}
          actions={[
            <Icon onClick={() => showModal(props.wishlistToDisplay[i].title, props.wishlistToDisplay[i].content, props.wishlistToDisplay[i].description, props.wishlistToDisplay[i].url)} type="read" key="ellipsis2" />,
            <Icon onClick={() => props.deleteArticle(props.i)} type="delete" key="ellipsis" />
          ]}
          >  
          <Meta
            title={props.wishlistToDisplay[i].title}
            description={props.wishlistToDisplay[i].description}
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
  var ifEmpty= "";
  if (frontWishlist.length === 0){
    ifEmpty= "Vous n'avez pas encore séléctionné d'articles à lire";
  }

  if (props.token === undefined){
    return(
      <Redirect to="/"/>
    )
  } else {

    return (
      <div>
        <Nav/>
        <div className="Banner"/>
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
