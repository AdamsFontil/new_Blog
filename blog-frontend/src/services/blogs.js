import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  console.log("getting from blogs...");
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log("fail to getall", error);
    });
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log("createResponseObject", newObject);
  console.log("createResponse", response.data);
  return response.data;
};

const update = (newBlog) => {
  const request = axios.put(`${baseUrl}/${newBlog.id}`, newBlog);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};
const getOne = (id) => {
  console.log("getting ONE from BLOGS...");
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
const addComment = async (id, newComment) => {
  console.log("creating new Comment***", newComment);
  console.log("the blog ID is", id);
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    content: newComment,
  });
  console.log("lin----", `${baseUrl}/${id}/comments`);
  console.log("response---", response);
  return response.data;
};

export default { getAll, create, update, setToken, remove, getOne, addComment };
