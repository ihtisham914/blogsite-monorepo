"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { setActiveTab, setLoading } from "@/app/GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
// import { Allblogs } from "@/public/projectdata/blog";
import { useSelector } from "react-redux";
import API from "../GlobalState/ApiCalls/blogApiCall";
import Image from "next/image";

const blogs = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const { username, token } = useSelector((state) => state.User.SignInData);
  const { loading } = useSelector((state) => state.Tab);
  dispatch(setLoading(false));

  const GetBlogs = async (url) => {
    try {
      const res = await url.get(`/blogs`);
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
    GetBlogs(API);
  }, []);

  const selectPagehandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(blogs.length / 8) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const handleClick = (id) => {
    navigate.push(`/blogs/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="container flex items-center justify-center w-full h-full">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {username && token ? (
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
                    {blogs
                      .slice(page * 8 - 8, page * 8)
                      .map(
                        ({ _id, title, likes, imageUrl, createdAt }, index) => (
                          <div
                            key={index}
                            onClick={() => handleClick(_id)}
                            className={`flex flex-col justify-end bg-gray-50 rounded-xl overflow-hidden w-72 shadow-md cursor-pointer hover:opacity-90 transition-all`}
                          >
                            <div className="relative h-52 w-full rounded-b-xl">
                              <div className="h-52 w-full rounded-md animate-pulse duration-75  bg-gray-400"></div>
                              <Image
                                src={imageUrl}
                                className="absolute top-0 bottom-0 left-0 right-0 h-52 w-full rounded-b-xl"
                                height={1000}
                                width={1000}
                                alt={title}
                              />
                            </div>

                            <div className="p-3">
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
                              <h1 className="text-lg font-bold mt-2">
                                {title}
                              </h1>
                              {/* <p className="text-sm">
                              <Interweave content={description.slice(0, 100)} />
                              ...
                            </p> */}
                            </div>
                          </div>
                        )
                      )}
                  </>
                )}
              </div>
              {blogs.length > 8 && (
                <div className="flex items-center justify-center w-full">
                  <div className="my-10 flex items-center gap-2 text-2xl">
                    <span
                      className={
                        page > 1
                          ? "hover:text-primary-default transition-all cursor-pointer text-gray-700"
                          : "opacity-0"
                      }
                      onClick={() => selectPagehandler(page - 1)}
                    >
                      <BsCaretLeftSquareFill />
                    </span>
                    {blogs.length > 8 &&
                      [...Array(Math.ceil(blogs.length / 8))].map(
                        (_, index) => (
                          <span
                            className={
                              page === index + 1
                                ? "bg-gray-300 font-semibold text-sm rounded-md px-2 py-1 cursor-pointer"
                                : "bg-transparent text-sm rounded-md px-2 py-1  cursor-pointer"
                            }
                            onClick={() => selectPagehandler(index + 1)}
                          >
                            {index + 1}
                          </span>
                        )
                      )}
                    <span
                      className={
                        page < Math.ceil(blogs.length / 8)
                          ? "hover:text-primary-default transition-all cursor-pointer text-gray-700"
                          : "opacity-0"
                      }
                      onClick={() => selectPagehandler(page + 1)}
                    >
                      <BsCaretRightSquareFill />
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default blogs;
