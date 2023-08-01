import axios from "axios";
const baseUrl = "/api/users";

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("signup", response.data);
  return response.data;
};
const getAll = () => {
  console.log("getting all from users...");
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log("fail to getall", error);
    });
};
const get = (id) => {
  console.log("getting ONE from users...");
  const request = axios.get(`${baseUrl}/${id}`);
  // console.log('got ONE from users...',response.data)
  return request.then((response) => response.data);
};

export default { signup, getAll, get };
