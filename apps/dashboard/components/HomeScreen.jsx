"use client";
import React, { useState } from "react";
import { setLoading } from "@/app/GlobalState/TabSlice";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Tab);
  dispatch(setLoading(false));

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
        <div className="flex flex-col gap-6 overflow-y-scroll h-[85vh] pr-8 -mr-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
