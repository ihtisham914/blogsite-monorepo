"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Image from "next/image";
import cover from "../public/cover.jpg";
import { items } from "@/public/data/navbar";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const activeTab = useSelector((state) => state.Tab);
  const handleClick = (index, link) => {
    dispatch(setActiveTab(index));
    navigate.push(`${link}`);
  };
  return (
    <div>
      <div className="bg-green-100 text-center p-1">anouncement</div>
      <Image src={cover} className="h-[35vh] w-full" />
      {/* HEADER */}
      <div className="bg-slate-400">
        <div className="flex items-center justify-between mx-auto px-4 py-4 max-w-screen-lg">
          <ul className="flex items-center gap-6">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleClick(index, item.link)}
                className="flex flex-col gap-[2px] cursor-pointer"
              >
                <span>{item.name}</span>

                <span
                  className={`${
                    activeTab.index === index ? "bg-orange-600" : ""
                  } h-1  w-3/4 rounded-full`}
                ></span>
              </li>
            ))}
          </ul>
          <div>donat</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
