import { useQuery } from "react-query";
import userService from "../services/users";
import { Link } from "react-router-dom";
import img1 from "../images/av1.svg";

// const photos = {
//   img1: '../images/av1.svg',
//   img2: '../images/av2.svg',
//   img3: '../images/av3.svg',
//   img4: '../images/av4.svg',
//   img5: '../images/av5.svg',
//   // Add more images as needed
// }
const Users = () => {
  const result2 = useQuery("users", userService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result2.isLoading) {
    return <div>loading data...</div>;
  }
  if (result2.isError) {
    return (
      <span>users service is not available due to problems in server</span>
    );
  }

  const users = result2.data;
  console.log("users are....", users);

  return (
    <div className="flex flex-col gap-12 p-5 border-2 rounded-lg bg-neutral m-5">
      <h1 className="text-6xl">Users</h1>
      <div className="grid grid-cols-2 gap-10">
        {users.map((user) => (
          <div
            key={user.id}
            className="avatar flex items-center gap-3 indicator"
          >
            <span className="indicator-item badge badge-secondary mt-4">
              {user.blogs.length}
            </span>
            <div className="w-20 h-20 rounded-lg">
              <img src={img1} alt="Avatar" />
            </div>
            <Link to={`/users/${user.id}`} key={user.id}>
              <p className="text-5xl">{user.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
