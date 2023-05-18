"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "../GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { AllReviews } from "@/public/projectdata/reviews";
import { HiUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { UpdateStore } from "../GlobalState/UserSlice";

const reviews = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.User.SignInData);
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
              className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-gray-200"
            >
              <span>Reviews</span>
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold">Reviews</h1>
          <div className="flex flex-col gap-6 rounded-xl w-full md:w-full lg:w-full xl:w-[85%] shadow-md px-10 py-8 border-[1px] border-gray-100 mb-8 mt-4">
            <div className="flex items-center gap-2">
              <span>Total Reviews:</span>
              <span className="px-3 py-1 rounded-full bg-primary-default text-white">
                {AllReviews.length}
              </span>
            </div>
            {AllReviews.map((review, index) => (
              <div key={index} className="flex items-start gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <HiUserCircle className="text-5xl text-gray-500" />
                </div>
                <div className="px-3 py-1 rounded-lg bg-gray-100">
                  <div className="flex items-center gap-2">
                    <h1 className="font-bold">{review.name}</h1>
                    <span className="text-[10px] font-semibold">
                      reviewed on April 03, 2023
                    </span>
                  </div>
                  <span>{review.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default reviews;
