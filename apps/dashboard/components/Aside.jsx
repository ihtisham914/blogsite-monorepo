"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { items } from "@/public/projectdata/asideData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

function Aside() {
  const navigate = useRouter();
  const activeTab = useSelector((state) => state.Tab);
  const dispatch = useDispatch();

  const clickHander = (link, index) => {
    navigate.push(`${link}`);
    dispatch(setActiveTab(index));
  };
  const { username } = useSelector((state) => state.User.SignInData);

  return (
    <div>
      {username ? (
        <aside className="h-screen w-[200px] fixed shadow top-0">
          <div className="mt-4 pl-7">
            {/* <img src={Fgpc_logo} alt="logo" height="60px" width="60px" /> */}
            <h1 className="text-3xl font-bold ">Blogify</h1>
          </div>
          <div className="mt-8 flex flex-col  gap-2 ml-2">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={`py-2 px-4 w-3/4 flex justify-start cursor-pointer items-center transition-all border-l-4 border-l-transparent rounded-full ${
                  activeTab.index === index
                    ? "bg-gray-100 text-primary-light  border-l-primary-default"
                    : ""
                }`}
              >
                {/* <div className={`flex items-center justify-start ml-4`}> */}
                <span className="text-lg">{item.icon}</span>
                <span className="text-md ml-2">{item.name}</span>
                {/* </div> */}
              </div>
            ))}
          </div>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
}

export default Aside;
