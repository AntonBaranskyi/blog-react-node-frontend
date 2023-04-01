import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/postSlice";
import { useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.posts.posts);
  const data = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const isLoading = status === "loading";
  console.log(data);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading
            ? [...new Array(4)].map((_, i) => (
                <Post key={i} isLoading={isLoading} />
              ))
            : items.map((obj) => (
                <Post
                  id={obj._id}
                  title={obj.title}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={data?._id === obj.user._id}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={["react", "typescript", "заметки"]}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
