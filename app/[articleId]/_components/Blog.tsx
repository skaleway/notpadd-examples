import React from "react";

import { NotpaddContent } from "notpadd-content/client";

const Blog = ({ content }: { content: string }) => {
  return <NotpaddContent content={content} />;
};

export default Blog;
