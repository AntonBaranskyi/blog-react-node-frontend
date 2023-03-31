import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../service/axios";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
export const FullPost = () => {
  const { id } = useParams();
  console.log(id);
  const [dataSingle, setDataSingle] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((resp) => {
      console.log(resp.data);
      setDataSingle(resp.data);
      setLoading(false);
    });
  }, [id]);

  if (!dataSingle) {
    return <Post isLoading={loading} />;
  }
  return (
    <>
      <Post
        id={dataSingle._id}
        title={dataSingle.title}
        imageUrl={dataSingle.imageUrl}
        user={dataSingle.user}
        createdAt={dataSingle.createdAt}
        viewsCount={dataSingle.viewsCount}
        commentsCount={3}
        tags={dataSingle.tags}
        isFullPost
      >
        <p>{dataSingle.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
