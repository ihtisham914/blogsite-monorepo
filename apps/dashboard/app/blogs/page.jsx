"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { setActiveTab } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
// import { Allblogs } from "@/public/projectdata/blog";
import { useSelector } from "react-redux";
import API from "../GlobalState/ApiCalls/blogApiCall";
import Image from "next/image";
import { Interweave } from "interweave";
const blogs = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  const GetBlogs = async (url) => {
    try {
      const res = await url.get(`/blogs`);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      setBlogs(res.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    GetBlogs(API);
  }, []);

  const { username, token } = useSelector((state) => state.User.SignInData);

  const handleClick = (id) => {
    navigate.push(`/blogs/${id}`);
  };

  return (
    <>
      {username && token ? (
        <div>
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
                className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
              >
                <span>All Blogs</span>
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold">Blogs</h1>
          </div>
          <div className="flex items-center flex-wrap gap-4 my-6">
            {pending ? (
              <div className="flex items-center justify-center h-full w-full mt-52">
                <Puff width="400" color="#4fa94d" />
              </div>
            ) : (
              <>
                {blogs.map(
                  (
                    { _id, title, likes, imageUrl, description, createdAt },
                    index
                  ) => (
                    <div
                      key={index}
                      onClick={() => handleClick(_id)}
                      className={`flex flex-col justify-end bg-slate-50 rounded-xl overflow-hidden w-72 shadow-md cursor-pointer hover:opacity-90 transition-all`}
                    >
                      <Image
                        src={imageUrl}
                        className="h-52 w-full rounded-b-xl"
                        height={1000}
                        width={1000}
                        alt={title}
                      />
                      <div className="p-3">
                        <div className="flex items-center gap-4 font-bold">
                          <div className="flex items-center gap-1 text-sm">
                            <BiLike />
                            <span>{likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <FiClock /> <span>{createdAt?.split("T")[0]}</span>
                          </div>
                        </div>
                        <h1 className="text-md font-bold mt-2">{title}</h1>
                        <p className="text-sm">
                          <Interweave content={description.slice(0, 100)} />
                          ...
                        </p>
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default blogs;
