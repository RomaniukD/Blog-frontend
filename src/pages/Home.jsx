import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const {tag} = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const {posts, tags} = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const [tab, setTab] = useState(true);

  const filteredPosts = tag
  ? posts.items.filter((post) => post.tags.includes(tag))
  : posts.items;

  const sortedPosts = tab
  ? filteredPosts
  : [...filteredPosts].sort((a,b) => b.viewsCount - a.viewsCount);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tab ? 0 : 1} aria-label="basic tabs example">
        <Tab onClick={() => setTab(true)} label="New" />
        <Tab onClick={() => setTab(false)} label="Popular" />
      </Tabs>
  
      <Grid container spacing={4}>
        
        <Grid item xs={8}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr ",
              gridTemplateRows: "1fr 1fr",
              gap: "20px",
              width: "100%",
            }}
          >
            {(isPostsLoading ? [...Array(4)] : sortedPosts).map((obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""}
                  user={userData}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments.length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              )
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <TagsBlock value={tag} items={tags.items} isLoading={isTagsLoading} />
        </Grid>
       </Grid>
    </>
  );
  
};
