import React, {useState} from 'react';
import { useNavigate,Navigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {selectIsAuth } from "../../redux/slices/auth";
import axios from '../../axios';


export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] =useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data?.url || '');
    } catch(err){
      console.warn(err);
      alert('Error uploading a file')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title, 
        imageUrl,
        tags,
        text
      }

      const {data} = isEditing 
      ? await axios.patch(`/posts/${id}`, fields) 
      : await axios.post('/posts', fields) ;
      
      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch(err) {
      console.warn(err);
      alert('Error creating an article');
    }
  }

  React.useEffect(() => {
    if (id) {
      axios
      .get(`/posts/${id}`)
      .then(({data}) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
      }).catch((err) => {
        console.log(err);
        alert('Error when receiving an article');
      })
    } 
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  if (!window.localStorage.getItem('token') && !isAuth) {
          return <Navigate to="/" />
        }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
      Download preview
      </Button>
      
      <input ref={inputFileRef} type="file" single onChange={handleChangeFile} hidden  />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <>
        
        <img 
        className={styles.image} 
        src={`${process.env.REACT_APP_API_URL}${imageUrl}`} 
        style={{ width: "100%", height: "500px", objectFit: "contain", borderRadius: "8px" }} 
        />
        </>
      ) 
      }
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="The title of the article..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
      value={tags}
      onChange={e => setTags(e.target.value)}
      classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Tags" 
      fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Change' : 'Publish'}
        </Button>
        <a href="/">
          <Button size="large">Сancel</Button>
        </a>
      </div>
    </Paper>
  );
};
