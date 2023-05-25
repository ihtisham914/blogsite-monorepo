"use client";
import HomeScreen from "@/components/HomeScreen";
import Login from "@/components/Auth/Login";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.User.SignInData);

  return (
    <div className="container">
      {username && token ? <HomeScreen /> : <Login />}
    </div>
  );
}
