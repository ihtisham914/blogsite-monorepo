"use client";
import HomeScreen from "@/components/HomeScreen";
import Login from "@/components/Auth/Login";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { username } = useSelector((state) => state.User.SignInData);
  // const username = true;
  return (
    <div className="container">{username ? <HomeScreen /> : <Login />}</div>
  );
}
