import React, { useState } from "react";
import {useSelector} from 'react-redux'
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios"

export const Index = ({ postId, userId, onCommentAdded }) => {

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.auth.data);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("The comment cannot be empty");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`/posts/${postId}/comment`, {
        text: comment,
        post: postId,
        user: userId,
      });
      
      if (response.status === 200) {
        setComment(""); 
        onCommentAdded(response.data);
      } else {
        throw new Error("Unknown response status");
      }
    } catch (err) {
      console.warn("Request error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src={user.avatarUrl || ""}
      />
      <div className={styles.form}>
        <TextField
          label="Add a comment"
          variant="outlined"
          maxRows={10}
          multiline
          value={comment}
          onChange={handleCommentChange}
          fullWidth
        />
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};