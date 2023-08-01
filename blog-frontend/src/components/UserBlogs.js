import { useParams } from "react-router";
import { useQuery } from "react-query";
import userService from "../services/users";

const UserBlogs = () => {
  const id = useParams().id;
  console.log("id----", id);
  const result3 = useQuery("userBlogs", () => userService.get(id), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result3.isLoading) {
    return <div>loading data...</div>;
  }
  if (result3.isError) {
    return (
      <span>users service is not available due to problems in the server</span>
    );
  }

  const userBlogs = result3.data.blogs;
  console.log("userBlogs...", userBlogs);

  return (
    <div className="p-5 gap-5 flex flex-col">
      <h4 className="text-5xl">Blogs added by selected user</h4>
      <table className="table table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {userBlogs.map((userBlog) => (
            <tr key={userBlog.id}>
              <td className="px-4 py-2 bg-neutral">{userBlog.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBlogs;
