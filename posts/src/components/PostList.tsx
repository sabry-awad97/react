import { useEffect } from "react";
import { useActions, useAppSelector } from "../hooks";
import UserHeader from "./UserHeader";

const PostList = () => {
  const { fetchPosts, fetchUser } = useActions();

  const posts = useAppSelector(state => state.posts);

  const userIds = [...new Set(posts.map(({ userId }) => userId))];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    for (const id of userIds) {
      fetchUser(id);
    }
  }, [userIds.length]);

  return (
    <div className="ui relaxed divided list">
      {posts.map(post => {
        return (
          <div className="item" key={post.id}>
            <i className="large middle aligned icon user" />
            <div className="content">
              <div className="description">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <UserHeader userId={post.userId} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
