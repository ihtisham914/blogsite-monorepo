"use client";
import React, { useState } from "react";
// import { IoNotifications } from "react-icons/io";
import { BsFillBellFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SignOutUser } from "@/app/GlobalState/UserSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const { username } = useSelector((state) => state.User.SignInData);
  const dispatch = useDispatch();
  return (
    <div>
      {username ? (
        <div className="w-full flex justify-between px-8 py-4 ">
          <input
            type="text"
            placeholder="search in Blogs"
            className="outline-none border-2 border-gray-300 rounded-full py-1 px-4 w-80 focus:border-primary-default"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-4 text-3xl text-primary-default">
            <h1 className="text-black text-lg">Shadman Yosuf</h1>
            <div onClick={() => dispatch(SignOutUser)}>
              <FaUserCircle />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
