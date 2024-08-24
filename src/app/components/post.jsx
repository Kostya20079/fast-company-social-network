import React from "react";
import { useParams } from "react-router-dom";

const Post = ({ postsData }) => {
  let { postId } = useParams();
  const getPostById = (id) => {
    return postsData.find((post) => post.id.toString() === id);
  };
  const post = getPostById(postId);
  return <h2>{post ? post.label : `Post with id: ${postId} is not found`}</h2>;
};

export default Post;
