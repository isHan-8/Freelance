// src/components/PostCard.js

import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        {post.media && (
          <img
            src={post.media_url}  // Ensure you have a 'media_url' field or adjust accordingly
            className="card-img-top"
            alt={post.media_url}
          />
        )}
        <div className="card-body">
          <p className="card-text">{post.content}</p>
          {/* Additional post details can be added here */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
