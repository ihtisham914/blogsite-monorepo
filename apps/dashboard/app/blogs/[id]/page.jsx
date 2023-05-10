"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { setActiveTab } from "../../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { singleBlog } from "@/public/projectdata/singleBlog";
import Image from "next/image";

const page = ({ params }) => {
  const id = params.id;
  const navigate = useRouter();
  const dispatch = useDispatch();
  return (
    <>
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
        <div className="rounded-xl w-2/3 shadow-md px-10 py-8 border-[1px] border-gray-100 my-8">
          <h1 className="text-3xl font-bold">{singleBlog.title}</h1>
          <div className="flex items-center gap-1 text-sm font-bold text-gray-500 mt-4">
            <FiClock /> <span>{singleBlog.createdAt}</span>
          </div>
          <Image
            src="/blog.jpg"
            alt="blog picture"
            className="mt-4 h-96 w-full rounded-md"
            width={1}
            height={1}
          />
          <div className="flex items-center gap-4 font-bold mt-3">
            <div className="flex items-center gap-1 text-xl">
              <BiLike className="text-2xl" />
              <span className="text-primary-default">{singleBlog.likes}</span>
            </div>
          </div>
          <p className="mt-4 text-xl">{singleBlog.description}</p>
          <div className="flex flex-col gap-2">
            <h1 className="px-4 py-1 bg-gray-200 text-primary-default font-bold rounded-full mt-6 w-28">
              Comments
            </h1>
            {/* comments */}
            {singleBlog.comments.map((comment, index) => (
              <div key={index} className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <HiUserCircle className="text-5xl text-gray-500" />
                  <div className="flex flex-col text-sm">
                    <h1 className="font-bold">{comment.username}</h1>
                    <p>{comment.email}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-gray-100 ml-14">
                  {comment.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
