import React from "react";

const page = ({ params }) => {
  const id = params.blogid;
  return <div>blog id {id}</div>;
};

export default page;
