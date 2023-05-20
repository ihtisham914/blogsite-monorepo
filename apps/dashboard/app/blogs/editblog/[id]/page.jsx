"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { useRouter } from "next/navigation";
import JoditEditor from "jodit-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { EditBlog } from "@/app/GlobalState/ApiCalls/blogApiCall";
import API from "@/app/GlobalState/ApiCalls/blogApiCall";
const page = ({ params }) => {
  const id = params.id;
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.User.SignInData);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const imageRef = useRef("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetBlog = async (url, id) => {
    try {
      const res = await url.get(`/blogs/${id}`);
      if (res && !res.error) {
        setTimeout(() => setPending(false), 1000);
      }
      const blogData = res.data.data;
      setTitle(blogData.title);
      setContent(blogData.description);
      setImageUrl(blogData.imageUrl);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    GetBlog(API, id);
  }, []);

  const UploadAttachment = async (e) => {
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "xguxdutu");
      data.append("cloud_name", "dgpwe8xy6");
      data.append("folder", "blog");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await response.json();
        setImageUrl(imageData.secure_url);
        setLoading(false);
        toast.success("Image Uploaded Successfully", {
          style: { width: "auto", height: "auto" },
        });
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please Upload blog image first", {
        style: { width: "auto", height: "auto" },
      });
      return;
    }
    setPending(true);
    const EditBlogData = {
      title: title,
      description: content,
      imageUrl: imageUrl,
    };
    console.log(EditBlogData);
    // calling API for Editing blog
    const res = await EditBlog(EditBlogData, id);
    console.log(res);
    if (res.status == "success") {
      console.log(res);
      const id = res.data.blog._id;
      setPending(false);
      toast.success("Blog Edited Successfully", {
        style: {
          height: "auto",
          width: "auto",
        },
      });
      navigate.push(`/blogs/${id}`);

      // after calling api clear the form
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
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
              title="visit current blog"
              onClick={() => {
                navigate.push(`/blogs/${id}`);
              }}
              className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              blog
            </span>
            <span className="text-[10px] font-bold text-gray-500">
              <MdOutlineArrowForwardIos />
            </span>
            <span
              title="Edit current blog"
              className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
            >
              edit blog
            </span>
          </div>

          {/* edit blog form */}
          <form className="flex flex-col gap-6 rounded-xl w-full md:w-full lg:w-full xl:w-[85%] shadow-md px-10 py-8 border-[1px] border-gray-100 my-8">
            <div className={`relative rounded-md w-full h-[450px] `}>
              <div
                className={`w-full h-full object-cover border-2 rounded-md border-gray-200 shadow-md ${
                  loading
                    ? "backdrop-filter backdrop-grayscale backdrop-blur-3xl"
                    : ""
                } `}
              >
                {imageUrl ? (
                  <Image
                    className="rounded-md h-full w-full aspect-auto"
                    src={imageUrl}
                    width={2000}
                    height={2000}
                    alt="previewImage"
                  />
                ) : (
                  <Image
                    className={`rounded-md h-full w-full aspect-auto`}
                    src="/noimage.png"
                    width={2000}
                    height={2000}
                    alt="previewImage"
                  />
                )}
              </div>
              <div
                className="absolute  bottom-[40%]  left-0  right-0 flex  items-center flex-col cursor-pointer text-slate-400 hover:text-primary-light "
                onClick={() => imageRef.current.click()}
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="inline w-20 h-20 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-slate-600 dark:fill-slatwe-100"
                    viewBox="0 0 100 101"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  <>
                    <HiCamera className="text-7xl" />
                    <span className=" text-lg font-bold">Upload Photo</span>
                  </>
                )}
              </div>
              <div className="hidden">
                <input
                  accept="image/*"
                  ref={imageRef}
                  onChange={UploadAttachment}
                  type="file"
                  capture="environment"
                  name="image"
                />
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
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title of the blog"
                className={`outline-none rounded-md border-2 border-gray-400 px-3 py-2 text-lg focus:border-primary-default font-bold`}
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
              onClick={(e) => handleSubmit(e)}
              className="px-2 py-2 text-white rounded-md shadow-md hover:shadow-lg bg-primary-default hover:bg-primary-dark active:scale-95 transition-all w-40"
            >
              {pending ? (
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-slate-600 dark:fill-slatwe-100"
                  viewBox="0 0 100 101"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Edit & Publish Blog"
              )}
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default page;
