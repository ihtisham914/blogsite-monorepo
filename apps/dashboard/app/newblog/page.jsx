"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";

const newblog = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
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
            <span>NewBlog</span>
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold">New Blog</h1>
      </div>
    </div>
  );
};

export default newblog;
