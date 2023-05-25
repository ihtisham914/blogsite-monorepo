import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { DeleteBlog } from "@/app/GlobalState/ApiCalls/blogApiCall";

const DeleteBlogModel = ({ model, setModel, blogId }) => {
  const navigate = useRouter();
  const handleDelete = async () => {
    const res = await DeleteBlog(blogId);
    console.log(res);
    if (res.status == 204) {
      toast.success("Blog deleted successfully!", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 1500,
      });
      navigate.push("/blogs");
    } else {
      toast.error("Could not Delete this blog. Try latter!", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 1500,
      });
    }
  };
  return (
    <div className="p-8 bg-white shadow-lg rounded-xl">
      <p className="mb-6 text-lg">Do you really want to delete this Blog?</p>
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={() => setModel(false)}
          className="px-3 py-1 text-white bg-gray-400 hover:bg-gray-500 shadow-md rounded-md transition-all hover:shadow-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 shadow-md rounded-md transition-all hover:shadow-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBlogModel;
