import useState, { useEffect } from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = ({postId}) => {
  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams(); 

  useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setData(res.data); 
      setLoading(false);
    })
    .catch((err) => {
      console.warn('FullPost.jsx', err);
      alert("Error when receiving an article from the server")
    });
  }, []);
  
  useEffect(() => {
    axios
    .get('/auth/me')
    .then((res) => {
      setUserId(res.data._id);
    })
  }, [])



  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  } 
  return (
    <>
      <Post
         id={data._id}
         title={data.title}
         imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
         user={data.user}
         createdAt={data.createdAt}
         viewsCount={data.viewsCount}
         commentsCount={data.comments.length}
         tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={data}
        isLoading={isLoading}
      >
      </CommentsBlock>
        <Index 
        postId={data._id} 
        userId={userId} 
        isLoading={isLoading} 
        /> 
    </>
  );
};
