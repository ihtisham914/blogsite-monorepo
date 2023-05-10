"use client";
import React, { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { setActiveTab } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import JoditEditor from "jodit-react";

const newblog = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
            title="New Blog"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
          >
            <span>NewBlog</span>
          </span>
        </div>

        {/* new blog */}
        <form className="flex flex-col gap-6 rounded-xl w-3/4 shadow-md px-10 py-8 border-[1px] border-gray-100 my-8">
          <div className="flex items-center justify-center rounded-md w-full h-96 bg-[url('/blog.jpg')]  bg-center bg-cover">
            <div className="flex items-center flex-col cursor-pointer">
              <HiCamera className="text-white text-7xl" />
              <span className="text-white text-lg font-bold">Upload Photo</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-lg">
              Enter Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title of the blog"
              className="outline-none rounded-md border-[1px] border-gray-400 px-3 py-2 text-lg focus:border-primary-default font-bold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg">
              Enter Blog Description
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </div>
          <button
            type="submit"
            className="px-2 py-2 text-white rounded-md shadow-md hover:shadow-lg bg-primary-default hover:bg-primary-dark active:scale-95 transition-all w-40"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default newblog;
