import React from "react";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import Post from "../post";
import PostsList from "../postsList";
import _ from "lodash";

const Posts = () => {
  const posts = [
    { id: 1, label: "post1" },
    { id: 2, label: "post2" },
    { id: 3, label: "post3" },
  ];
  let { postId } = useParams();
  let location = useLocation();
  
  const search = queryString.parse(location.search);
  const cropPosts = search.count
    ? _(posts).slice(0).take(search.count).value()
    : posts;

  return (
    <>
      {postId ? (
        <Post postsData={posts} />
      ) : (
        <PostsList postsData={cropPosts} />
      )}
    </>
  );
};

export default Posts;
