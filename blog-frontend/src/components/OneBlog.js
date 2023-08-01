import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import BlogService from "../services/blogs";
import { useParams } from "react-router";
import { useState } from "react";

const Blogs = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const [newComment, setNewComment] = useState("");

  const updateBlogMutation = useMutation(BlogService.update, {
    onSuccess: (updatedBlog) => {
      console.log("update", updatedBlog);
      queryClient.setQueryData("oneBlog", updatedBlog);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const id = useParams().id;
  console.log("id---from blogs****", id);
  const result4 = useQuery("oneBlog", () => BlogService.getOne(id), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result4.isLoading) {
    return <div>loading data...</div>;
  }
  if (result4.isError) {
    return <span>blog service is not available due to problems in server</span>;
  }

  const blog = result4.data;
  console.log("blog is....", blog);

  const likes = blog.likes;
  const comments = blog.comments;
  console.log("comments----", comments);

  const handleLikeClick = async () => {
    // const likes = blog.likes
    console.log("blog", blog);
    console.log("LIKES", blog.likes);
    console.log("like");
    console.log("title", blog.title);
    // BlogService.update({ ...blog, likes: likes + 1 })
    updateBlogMutation.mutate({ ...blog, likes: likes + 1 });
    dispatch("LIKE", blog.title);
    setTimeout(() => {
      dispatch("CLEAR");
    }, 5000);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const updatedBlog = await BlogService.addComment(blog.id, newComment); // Assuming BlogService.addComment sends the new comment to the server
      console.log("Comment----", newComment);
      queryClient.setQueryData("oneBlog", updatedBlog);
      setNewComment("");
      dispatch("COMMENT_POSTED");
    } catch (error) {
      console.error(error);
      dispatch("COMMENT_POST_ERROR");
    }
  };

  const blogStyle = {
    // paddingTop: 10,
    // paddingLeft: 2,
    // border: 'solid',
    // borderWidth: 1,
    // marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog p-5 flex gap-5 flex-col text-3xl">
      <div className="flex flex-col gap-3 ">
        <h3 className="text-5xl">Info</h3>
        <div>
          <h3>Title: {blog.title}</h3>
        </div>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            URL: {blog.url}
          </a>
        </div>
        <div className="flex gap-3">
          {likes} likes
          <button onClick={handleLikeClick} className="likeBtn btn">
            like
          </button>
        </div>
        <div>Written by: {blog.author}</div>
      </div>
      <div className="flex flex-col gap-5">
        <h4 className="text-5xl mr-3">Comments:</h4>
        <div>
          <label className="pr-5">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
            />
          </label>
          <button onClick={handleCommentSubmit}>add comment</button>
        </div>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="chat chat-start">
              <div className="chat-bubble">{comment.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogs;
