"use client";
import HomeScreen from "@/components/HomeScreen";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <HomeScreen />;
}
