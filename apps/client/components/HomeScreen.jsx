"use client";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillClockCircle } from "react-icons/ai";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import { config } from "@/app/GlobalState/ApiCalls/config";
import { API } from "@/app/GlobalState/ApiCalls/ApiCalls";
import { useRouter } from "next/navigation";
import { Puff } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Allblogs } from "@/public/data/blog";
import { Interweave } from "interweave";

const HomeScreen = () => {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const rates = [1, 2, 3, 4, 5];

  const GetBlogs = async () => {
    try {
      const res = await API.get(`http://localhost:8000/api/v1/blogs`, config);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      const data = res.data.data;
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

  const handleReview = async (e) => {
    e.preventDefault();
    if (rating == 0) {
      toast.error("Please provide rating 🙂", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
      return;
    }
    try {
      const res = await API.post(
        `http://localhost:8000/api/v1/reviews`,
        { name, rating, text },
        config
      );
      if (res && !res.error) {
        toast.success("Thank you! Your thoughts are Appriciated", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        setText("");
        setName("");
      }
    } catch (error) {
      toast.error("There was an error submitting your review", {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
      setError(true);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold my-2">Recent Posts</h1>
      <div className="grid items-start gap-4 grid-cols-4">
        <div className="col-span-3">
          <div
            className={`bg-white flex items-start justify-center gap-3 p-4 flex-wrap mb-4 ${
              pending && "h-96 items-center"
            }`}
          >
            {pending ? (
              <Puff width="400" color="#4fa94d" />
            ) : (
              <>
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
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-2">Popular posts</h1>
            <div
              className={`bg-white grid grid-cols-2 items-center gap-6 p-4  mb-4 ${
                pending && "h-96 items-center"
              }`}
            >
              {pending ? (
                <Puff width="400" color="#4fa94d" />
              ) : (
                <>
                  {blogs
                    .slice(0, 4)
                    .map(
                      (
                        { _id, title, likes, imageUrl, createdAt, description },
                        index
                      ) => (
                        <div
                          key={index}
                          onClick={() => handleClick(_id)}
                          className={`flex flex-col justify-end overflow-hidden w-full shadow-md cursor-pointer hover:opacity-90 transition-all`}
                        >
                          <div className="relative h-56 w-full ">
                            <div className="h-56 w-full animate-pulse duration-75  bg-gray-400"></div>
                            <Image
                              src={imageUrl}
                              className="absolute top-0 bottom-0 left-0 right-0 h-56 w-full"
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
                                <span className="text-primary-light">
                                  {likes}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <AiFillClockCircle />
                                <span>{createdAt?.split("T")[0]}</span>
                              </div>
                            </div>
                            <h1 className="text-lg font-bold mt-2">{title}</h1>
                            <p>
                              <Interweave content={description.slice(0, 100)} />
                            </p>
                          </div>
                        </div>
                      )
                    )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* ASIDE */}
        <div className="flex flex-col gap-4">
          <form
            className="bg-white p-4 flex flex-col gap-1 items-start"
            onSubmit={handleReview}
          >
            <h1 className="font-semibold text-gray-500">Review</h1>

            <div className="flex items-center gap-1 text-3xl mt-2">
              {rates.map((star, index) => (
                <span key={index}>
                  {star <= rating ? (
                    <HiStar
                      onClick={() => setRating(star)}
                      className="text-primary-default cursor-pointer"
                    />
                  ) : (
                    <HiStar
                      onClick={() => setRating(star)}
                      className="text-gray-400 hover:text-primary-default cursor-pointer"
                    />
                  )}
                </span>
              ))}
            </div>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="outline-none px-2 py-1 w-full border-[1px] border-gray-400 focus:border-primary-default"
              placeholder="Your good name"
            />
            <input
              type="text"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
              className="outline-none px-2 py-1 w-full border-[1px] border-gray-400 focus:border-primary-default"
              placeholder="Your thoughts"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-primary-default hover:bg-primary-light text-white text-sm uppercase font-semibold rounded mt-2"
            >
              Submit
            </button>
          </form>
          <div className="bg-white p-4">
            <h1 className="font-semibold text-gray-500">
              You may like to read
            </h1>
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
      </div>
    </>
  );
};

export default HomeScreen;
