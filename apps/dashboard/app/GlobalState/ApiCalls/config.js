"use client";
const User = JSON.parse(localStorage.getItem("User"));
console.log(User.token);

export const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${User.token}`,
  },
  withCredentials: true,
};
