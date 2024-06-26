import Blogs from "@/components/blogs";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen px-20">
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="font-extrabold tracking-tight text-6xl lg:text-9xl text-zinc-700">
          Notpadd examples
        </h1>
      </div>
      <Blogs />
    </div>
  );
};

export default LandingPage;
