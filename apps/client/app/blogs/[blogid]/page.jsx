"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/GlobalState/ApiCalls/ApiCalls";
import { Puff } from "react-loader-spinner";
import { HiUserCircle } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { Interweave } from "interweave";
import Image from "next/image";

const page = ({ params }) => {
  const id = params.blogid;
  const navigate = useRouter();
  const [blog, setBlog] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

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
  console.log(blog);

  return (
    <div className="grid items-start gap-6 grid-cols-4">
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
                <AiFillLike className="text-xl" />
                <span className="text-primary-default">{blog.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-lg">
                <AiFillClockCircle />{" "}
                <span>{blog.createdAt.split("T")[0]}</span>
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
      <div className="h-96 p-3 bg-white mt-8"></div>
    </div>
  );
};

export default page;
