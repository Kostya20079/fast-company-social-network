import React from "react";

const PostsList = ({ postsData }) => {
  return (
    <>
      {postsData.map((post) => (
        <h2 key={post.id}>{post.label}</h2>
      ))}
    </>
  );
};
export default PostsList;
