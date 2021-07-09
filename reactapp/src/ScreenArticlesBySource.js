import React,{useState, useEffect} from 'react';
import './App.css';
import { Modal, Card, Icon, Col, Row } from 'antd';
import Nav from './Nav'
import { useParams, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
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

  var { id } = useParams();

  const [articleList, setArticleList] = useState("blabla");

  useEffect(() =>{
    async function loadArticles(item){
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=ba77f76104294ea0a1367ba538b4ae2d&sources=${id}`);
      var response = await rawResponse.json();
      console.log(response.articles);
      setArticleList(response.articles);
    }
    loadArticles()
  }, [])

  var frontArticles = [];
  // var isFilled="";
  // const likeClick = () => {
  //   isFilled="filled";  
  //   console.log("click", isFilled)
  // };  

  for (let i=0; i<articleList.length; i++){
    var date = new Date(articleList[i].publishedAt);
    frontArticles.push(
    <Col span={6} style={{display:'flex',justifyContent:'center'}}>
      <Card
        style={{ 
        width: 300, 
        margin:'15px', 
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-between' }}
        cover={
        <img alt="example" src={articleList[i].urlToImage}/>
        }
        actions={[
            <Icon type="read" key="ellipsis2"  onClick={() => showModal(articleList[i].title, articleList[i].content, articleList[i].description, articleList[i].url)}/>,
            <Icon type="like"  onClick={()=> props.addToWishList(articleList[i])} key="ellipsis"/>
        ]}
        >

        <Meta
          title={articleList[i].title}
          description={date.toLocaleDateString() + " - "+ articleList[i].description}
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

  if (props.token === undefined){
    return(
      <Redirect to="/"/>
    )
  } else {

    return (
      <div>
          <Nav/>
          <div className="Banner"/>
          <Row className="Card">
          {frontArticles}
          </Row>   
        
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
    addToWishList: function(article){
      // console.log(article)
      dispatch({type:"addArticle", article})
    }
  }
}

function mapStateToProps(state){
  return { token: state.user.token }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
