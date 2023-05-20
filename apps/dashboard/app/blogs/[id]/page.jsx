"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { setActiveTab } from "../../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import Image from "next/image";
import API from "@/app/GlobalState/ApiCalls/blogApiCall";
import { Interweave } from "interweave";
import DeleteBlogModel from "@/components/DeleteBlogModel";

const page = ({ params }) => {
  const id = params.id;
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [model, setModel] = useState(false);
  const { username, token } = useSelector((state) => state.User.SignInData);

  const GetBlog = async (url, id) => {
    try {
      const res = await url.get(`/blogs/${id}`);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      setBlog(res.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    GetBlog(API, id);
  }, []);

  return (
    <div className="relative">
      {username && token ? (
        <div className="container flex flex-col gap-6">
          <div className="flex items-center gap-4 -mb-4 text-md">
            <span
              className="cursor-pointer flex items-center justify-center p-[10px] rounded-full hover:bg-gray-100 active:bg-gray-300 transition-all"
              title="Dashboard"
              onClick={() => {
                navigate.push("/");
                dispatch(setActiveTab(0));
              }}
            >
              <AiFillHome />
            </span>
            <span className="text-[10px] font-bold text-gray-500">
              <MdOutlineArrowForwardIos />
            </span>
            <span
              title="All Blogs"
              onClick={() => {
                navigate.push("/blogs");
                dispatch(setActiveTab(1));
              }}
              className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
              All Blogs
            </span>
            <span className="text-[10px] font-bold text-gray-500">
              <MdOutlineArrowForwardIos />
            </span>
            <span
              title="Current blog"
              className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
            >
              blog
            </span>
          </div>

          {/* single blog */}
          <div className="rounded-xl w-full md:w-full lg:w-full xl:w-[85%] shadow-md px-10 py-8 border-[1px] border-gray-100 my-8">
            {pending ? (
              <div className="flex items-center justify-center h-full w-full mt-8">
                <Puff width="400" color="#4fa94d" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{blog.title}</h1>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        navigate.push(`/blogs/editblog/${blog._id}`)
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md shadow-md hover:shadow-lg bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all"
                    >
                      <FaEdit /> <span>EDIT</span>
                    </button>
                    <button
                      onClick={() => setModel(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md shadow-md hover:shadow-lg bg-red-500 hover:bg-red-600 active:scale-95 transition-all"
                    >
                      <ImBin /> <span>DELETE</span>
                    </button>
                  </div>
                </div>
                <Image
                  src={blog.imageUrl || "/blog.jpg"}
                  alt="blog picture"
                  className="mt-4 h-96 w-full rounded-md"
                  width={2000}
                  height={2000}
                />
                <div className="flex items-center gap-4 font-bold mt-3">
                  <div className="flex items-center gap-1 text-xl">
                    <BiLike className="text-2xl" />
                    <span className="text-primary-default">{blog.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xl  text-gray-500">
                    <FiClock /> <span>{blog.createdAt.split("T")[0]}</span>
                  </div>
                </div>
                <p className="mt-4 text-xl">
                  <Interweave content={blog.description} />
                </p>
                <div className="flex flex-col gap-2">
                  {blog?.comments?.length == 0 ? (
                    ""
                  ) : (
                    <h1 className="px-4 py-1 bg-gray-200 text-primary-default font-bold rounded-full mt-6 w-28">
                      Comments
                    </h1>
                  )}
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
        </div>
      ) : (
        ""
      )}
      {model && (
        <div className="absolute z-10 top-0  h-full w-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <DeleteBlogModel model={model} setModel={setModel} blogId={id} />
        </div>
      )}
    </div>
  );
};

export default page;
