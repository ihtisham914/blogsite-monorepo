"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { items } from "@/public/projectdata/asideData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

// import Fgpc_logo  from '../assets/fgpc_logo.svg'

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
          <ul className="mt-6 w-full">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => clickHander(item.to, index)}
                className={`py-4 flex w-full justify-start cursor-pointer items-center transition-all border-l-4 ${
                  activeTab.index === index
                    ? "bg-gray-100 font-bold text-primary-light  border-primary-default"
                    : ""
                }`}
              >
                <div className={`flex items-center justify-start ml-4`}>
                  {/* {item.icon} */}
                  <span className="text-lg ml-2">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
}

export default Aside;
