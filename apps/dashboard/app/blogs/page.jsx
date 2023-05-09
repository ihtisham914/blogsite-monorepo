"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { setActiveTab } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { Allblogs } from "@/public/projectdata/blog";

const blogs = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    navigate.push(`blogs/${id}`);
  };
  return (
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
      <div className="flex items-center flex-wrap gap-4 mt-6">
        {Allblogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => handleClick(blog.id)}
            className="flex flex-col justify-end p-3 rounded-xl bg-[url('/blog.jpg')]  bg-center bg-cover h-52 w-72 shadow-md cursor-pointer hover:opacity-90 transition"
          >
            <div className="text-white ">
              <h1 className="text-xl font-bold">{blog.title}</h1>
              <div className="flex items-center gap-4 font-bold">
                <div className="flex items-center gap-1 text-sm">
                  <BiLike />
                  <span>{blog.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <FiClock /> <span>{blog.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default blogs;
