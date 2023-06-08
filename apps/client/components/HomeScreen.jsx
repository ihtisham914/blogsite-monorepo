"use client";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillClockCircle } from "react-icons/ai";
import Image from "next/image";
import { config } from "@/app/GlobalState/ApiCalls/config";
import { API } from "@/app/GlobalState/ApiCalls/ApiCalls";
import { useRouter } from "next/navigation";
import { Puff } from "react-loader-spinner";
import { Allblogs } from "@/public/data/blog";

const HomeScreen = () => {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

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
    GetBlogs();
  }, []);

  const handleClick = (id) => {
    navigate.push(`blogs/${id}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold my-2">Recent Posts</h1>
      <div className="grid items-start gap-8 grid-cols-4">
        <div
          className={`col-span-3 bg-white flex items-start justify-center gap-3 p-4 flex-wrap mb-4 ${
            pending && "h-96 items-center"
          }`}
        >
          {pending ? (
            <Puff width="400" color="#4fa94d" />
          ) : (
            <>
              {" "}
              {blogs
                .slice(0, 6)
                .map(({ _id, title, likes, imageUrl, createdAt }, index) => (
                  <div
                    key={index}
                    onClick={() => handleClick(_id)}
                    className={`flex flex-col justify-end bg-gray-50 rounded-xl overflow-hidden w-72 shadow-md cursor-pointer hover:opacity-90 transition-all`}
                  >
                    <div className="relative h-52 w-full ">
                      <div className="h-52 w-full rounded-md animate-pulse duration-75  bg-gray-400"></div>
                      <Image
                        src={imageUrl}
                        className="absolute top-0 bottom-0 left-0 right-0 h-52 w-full"
                        height={1000}
                        width={1000}
                        alt={title}
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-4 font-bold text-gray-500">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-md">
                            <AiFillLike />
                          </span>
                          <span className="text-primary-light">{likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <AiFillClockCircle />
                          <span>{createdAt?.split("T")[0]}</span>
                        </div>
                      </div>
                      <h1 className="text-lg font-bold mt-2">{title}</h1>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        <div className="h-96 p-3 bg-white">
          <h1 className="font-semibold text-gray-500">You may like to read</h1>
          <div className="flex flex-col mt-4">
            {Allblogs.map(({ title, imageUrl, _id, createdAt }, index) => (
              <div
                className="flex items-start gap-2"
                key={index}
                onClick={() => navigate.push(`blogs/${_id}`)}
              >
                <Image src={imageUrl} height={50} width={50} alt={title} />
                <div className="flex flex-col">
                  <h1 className="text-sm">{title}</h1>
                  <span className="flex items-center gap-2 text-[12px]">
                    <AiFillClockCircle /> {createdAt?.split("T")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
