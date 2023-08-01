import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";
// import Blogs from './components/Blogs'
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useNotificationDispatch } from "./NotificationContext";
import loginService from "./services/login";
import { useUserDispatch, useUserValue } from "./UserContext";
import OneBlog from "./components/OneBlog";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";
const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

const App = () => {
  // console.log('APP LOGGED---', loggedUserJSON)
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const blogFormRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUserValue();
  const setUser = useUserDispatch();

  useEffect(() => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser({ type: "LOGIN", user });
      blogService.setToken(user.token);
    }
  }, []);

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      console.log("newBlogMut", newBlog);
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
      dispatch("ADD", newBlog.title);
      setTimeout(() => {
        dispatch("CLEAR", newBlog.title);
      }, 5000);
    },
    onError: (error) => {
      console.log(error);
      dispatch("ERROR", error);
    },
  });

  const addBlog = (blogObject) => {
    console.log("blog objects", blogObject);
    console.log("blog objects2", blogObject);
    const title = blogObject.title;
    const author = blogObject.author;
    const url = blogObject.url;
    console.log("titel", title);
    console.log("author", author);

    newBlogMutation.mutate({ title, author, url, likes: 0 });
  };

  const result = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return (
      <span>anecdote service is not available due to problems in server</span>
    );
  }

  const blogs = result.data;
  console.log("blogs are....", blogs);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser({ type: "LOGOUT" });
    dispatch("LOGOUT", user.name);
    setTimeout(() => {
      dispatch("CLEAR");
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setUser({ type: "LOGIN", user });

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser({ type: "LOGIN", user });
      dispatch("LOGIN", user.name);
      setTimeout(() => {
        dispatch("CLEAR");
      }, 5000);

      setUsername("");
      setPassword("");
    } catch (exception) {
      // setMessageType('error')
      // setMessage('Wrong username or password')
      // setTimeout(() => {
      //   setMessage(null)
      // }, 5000) // reset message after 5 seconds
    }
  };

  if (user === null) {
    return (
      <div className="bg-primary text-2xl text-black w-full">
        <Notification />
        <div className="flex flex-col justify-center items-center h-screen text-5xl p-5 gap-5">
          <h2 className="text-7xl">Log in to application</h2>
          <form className="flex gap-5 flex-col p-3" onSubmit={handleLogin}>
            <div className="flex gap-3 ">
              username
              <input
                className="border-2 rounded-md text-primary bg-white"
                type="text"
                id="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="flex gap-4">
              password
              <input
                className="border-2 rounded-md text-primary bg-white"
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button
              className="border-2 rounded-md p-2 bg-gray-400 hover:bg-gray-500 w-full"
              type="submit"
              id="login-button"
            >
              login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-500 text-2xl p-5 text-slate-900">
      <Notification />
      <Router>
        <div className="flex gap-5 text-xl justify-between">
          <Link to="/">
            <h2 className="btn btn-ghost normal-case text-neutral text-4xl">
              Best Blogs
            </h2>
          </Link>

          <div className="links flex gap-5">
            <Link className="btn" to="/">
              blogs
            </Link>
            <Link className="btn" to="/users">
              users
            </Link>
            <p className="flex justify-center items-center gap-5">
              {user.name} logged in{" "}
              <button className="btn btn-secondary " onClick={handleLogout}>
                logout
              </button>
            </p>
          </div>
        </div>

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<OneBlog />} />
          <Route
            path="/"
            element={
              <div className="">
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
                {/* {blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blogs key={blog.id} blog={blog} blogs={blogs} />
                  ))} */}
                <div className="overflow-x-auto">
                  <table className="table table-normal w-full">
                    {/* head */}
                    <thead>
                      <tr className="">
                        <th className="">Likes</th>
                        <th className="">Name</th>
                        <th>Author</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog) => (
                          <tr key={blog.id}>
                            <th className="bg-white">{blog.likes}</th>
                            <td className="bg-white">
                              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td className="bg-white">{blog.author}</td>
                            <td className="bg-white">{blog.url}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
