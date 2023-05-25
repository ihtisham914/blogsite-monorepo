"use client";
import React, { useState, useRef, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { setActiveTab } from "../GlobalState/TabSlice";
import { setLoading } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateBlog } from "@/Schema_validation/NewBlogSchema";
import Image from "next/image";
import { Puff } from "react-loader-spinner";
import { CreateBlog } from "../GlobalState/ApiCalls/blogApiCall";

const newblog = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.User.SignInData);
  const { loading } = useSelector((state) => state.Tab);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const imageRef = useRef("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [load, setLoad] = useState(false);
  const [pending, setPending] = useState(false);

  dispatch(setLoading(false));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateBlog) });

  const UploadAttachment = async (e) => {
    setLoad(true);
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
        setLoad(false);
        toast.success("Image Uploaded Successfully", {
          position: "top-center",
          style: { width: "auto", height: "auto" },
          duration: 3000,
        });
        console.log(imageData.secure_url);
        setImage(fileUrl);
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please Upload blog image first", {
        style: { width: "auto", height: "auto" },
      });
      return;
    }
    setPending(true);
    const { title } = data;
    const NewBlog = {
      title: title,
      description: content,
      imageUrl: imageUrl,
    };
    // calling API for creating blog
    const res = await CreateBlog(NewBlog);
    if (res.status == "success") {
      const id = res.data.blog._id;
      setPending(false);
      navigate.push(`/blogs/${id}`);
      toast.success("Blog Published! redirecting to Blogs page", {
        style: { width: "auto", height: "auto" },
      });
      // after calling api clear the form
      reset();
      setImage(null);
    } else {
      toast.error("Blog Publishing failed! Please Try again 🙂", {
        style: { width: "auto", height: "auto" },
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="container flex items-center justify-center w-full h-screen">
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
          {" "}
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
                  title="New Blog"
                  className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
                >
                  <span>NewBlog</span>
                </span>
              </div>

              {/* new blog */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 rounded-xl w-full md:w-full lg:w-full xl:w-[85%] shadow-md px-10 py-8 border-[1px] border-gray-100 my-8"
              >
                <div className={`relative rounded-md w-full h-[450px] `}>
                  <div
                    className={`w-full h-full object-cover border-2 rounded-md border-gray-200 shadow-md ${
                      load
                        ? "backdrop-filter backdrop-grayscale backdrop-blur-3xl"
                        : ""
                    } `}
                  >
                    {image ? (
                      <Image
                        className="rounded-md h-full w-full aspect-auto"
                        src={image}
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
                    {load ? (
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
                    {...register("title")}
                    placeholder="Enter Title of the blog"
                    className={`outline-none rounded-md border-2 border-gray-400 px-3 py-2 text-lg focus:border-primary-default font-bold ${
                      errors.title ? "focus:border-red-500" : ""
                    }`}
                  />
                  <div className="text-sm text-red-500">
                    {errors.title?.message}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-lg">
                    Enter Blog Description
                  </label>
                  {/* <input
                type="text"
                {...register("description")}
                placeholder="Start typing..."
                className={`outline-none rounded-md border-2 border-gray-400 px-3 py-2 text-lg focus:border-primary-default ${
                  errors.description ? "focus:border-red-500" : ""
                } `}
              /> */}
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  />
                  {/* <div className="text-sm text-red-500">
                {errors.description?.message}
              </div> */}
                </div>
                <button
                  type="submit"
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
                    "Publish Blog"
                  )}
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default newblog;
