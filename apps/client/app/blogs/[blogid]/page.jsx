"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/GlobalState/ApiCalls/ApiCalls";
import { Puff } from "react-loader-spinner";
import { HiUserCircle } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { Interweave } from "interweave";
import { config } from "@/app/GlobalState/ApiCalls/config";
import { toast } from "react-hot-toast";
import Image from "next/image";

const page = ({ params }) => {
  const id = params.blogid;
  const navigate = useRouter();
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commenttext, setCommentText] = useState("");
  const [commentEmail, setCommentEmail] = useState("");

  const GetBlog = async (url, id) => {
    try {
      const res = await url.get(`/blogs/${id}`, config);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      setBlog(res.data.data);
    } catch (error) {
      setError(true);
    }
  };

  // GET ALL BLOGS
  const GetBlogs = async () => {
    try {
      const res = await API.get(`http://localhost:8000/api/v1/blogs`, config);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      const data = res.data.data;
      console.log(data);
      setBlogs(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    GetBlog(API, id);
    GetBlogs();
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await API.patch(
        `http://localhost:8000/api/v1/blogs/like/${id}`,
        config
      );
      if (res && !res.error) {
        setLiked(true);
        setBlog({ ...blog, likes: blog.likes + 1 });
        console.log(blog.likes);
        toast.success("Thank you! for the like 🫡", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("There was a problem, Please try later 🙃", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    }
  };

  const handleComment = async (e, id) => {
    e.preventDefault();
    if (commentEmail == "" && commenttext == "") return;
    try {
      const res = await API.patch(
        `http://localhost:8000/api/v1/blogs/comment/${id}`,
        { email: commentEmail, desc: commenttext },
        config
      );
      if (res && !res.error) {
        blog.comments.push({ email: commentEmail, desc: commenttext });
        console.log(blog.likes);
        toast.success("Thank you for commenting 🫡", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        setCommentEmail("");
        setCommentText("");
      }
    } catch (error) {
      toast.error("There was a problem, Please try later 🙃", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    }
  };

  return (
    <div className="grid items-start gap-4 grid-cols-4">
      <div className="col-span-3  shadow-md px-10 py-8 border-[1px] border-gray-100 my-8 bg-white">
        {pending ? (
          <div className="flex items-center justify-center h-full w-full mt-8">
            <Puff width="400" color="#4fa94d" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{blog.title}</h1>
            </div>
            <div className="relative mt-4 h-96 w-full rounded-md">
              <div className="h-96 w-full rounded-md animate-pulse duration-75  bg-gray-400"></div>
              <Image
                src={blog.imageUrl}
                alt="blog picture"
                className="absolute top-0 bottom-0 left-0 right-0 h-96 w-full rounded-md"
                width={2000}
                height={2000}
              />
            </div>
            <div className="flex items-center gap-4 font-bold mt-3 text-gray-500">
              <div className="flex items-center gap-1 text-lg">
                <span onClick={() => handleLike(blog._id)}>
                  {liked ? (
                    <AiFillLike className="text-primary-default text-xl cursor-pointer" />
                  ) : (
                    <AiFillLike className="text-xl cursor-pointer" />
                  )}
                </span>
                <span className="text-primary-default">{blog.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-lg">
                <AiFillClockCircle />
                <span>{blog.createdAt.split("T")[0]}</span>
              </div>
            </div>
            <p className="mt-4 text-xl">
              <Interweave content={blog.description} />
            </p>
            <div className="flex flex-col  gap-2">
              {blog?.comments?.length == 0 ? (
                <h4 className="px-4 py-1 bg-gray-200 text-primary-default font-bold rounded-full mt-6 w-1/2">
                  Be the first to comment
                </h4>
              ) : (
                <h1 className="px-4 py-1 bg-gray-200 text-primary-default font-bold rounded-full mt-6 w-28">
                  Comments
                </h1>
              )}
              {/* COMMENT FORM */}
              <form
                onSubmit={(e) => handleComment(e, blog._id)}
                className="flex flex-col gap-4 my-2"
              >
                <input
                  type="email"
                  value={commentEmail}
                  required
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="outline-none rounded px-2 py-1 border-2 border-gray-400 w-full focus:border-primary-default"
                  placeholder="Enter your email"
                />
                <div className="flex flex-col gap-2 items-end">
                  <input
                    type="text"
                    value={commenttext}
                    required
                    onChange={(e) => setCommentText(e.target.value)}
                    className="outline-none rounded px-2 py-1 border-2 border-gray-400 w-full focus:border-primary-default"
                    placeholder="Share your thoughts"
                  />
                  <button
                    type="submit"
                    className="px-2 py-[6px] w-48 bg-primary-default rounded text-sm font-bold uppercase text-white"
                  >
                    Comment
                  </button>
                </div>
              </form>
              {/* comments */}
              {blog?.comments?.map((comment, index) => (
                <div key={index} className="flex gap-2 mt-4">
                  <HiUserCircle className="text-5xl text-gray-500" />
                  <div className="flex flex-col gap-1 px-3 py-1 rounded-lg bg-gray-100">
                    <p className="text-sm font-bold text-gray-600">
                      {comment.email}
                    </p>
                    <span className="">{comment.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="bg-white p-4 mt-8">
        <h1 className="font-semibold text-gray-500">You may like to read</h1>
        <div className="flex flex-col mt-4 gap-2">
          {blogs
            .slice(6, 10)
            .map(({ title, imageUrl, _id, createdAt }, index) => (
              <div
                className="flex flex-col gap-3 cursor-pointer"
                key={index}
                onClick={() => navigate.push(`blogs/${_id}`)}
              >
                <div className="flex items-start gap-2">
                  <Image
                    src={imageUrl}
                    height={80}
                    width={80}
                    // className="object-cover h-14 w-28"
                    alt={title}
                  />
                  <div className="flex flex-col justify-between h-12">
                    <h1 className="text-sm">{title}</h1>
                    <span className="flex items-center gap-2 text-[12px]">
                      <AiFillClockCircle />
                      <span>{createdAt?.split("T")[0]}</span>
                    </span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
