"use client";

import { apiEndpoint } from "@/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Article } from "@/types";
import Image from "next/image";
import "@blocknote/core/fonts/inter.css";

import dynamic from "next/dynamic";

const BlogContent = dynamic(() => import("./_components/Blog"), { ssr: false });

const ArticlePage = ({ params }: { params: { articleId: string } }) => {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  //   console.log(params);

  const articleId = searchParams.get("id");

  if (!articleId) return alert("article id require");

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(
          apiEndpoint + `/${params.articleId}?id=${articleId}`,
          {
            headers: {
              next_notpadd_userId: "user_2hoy34no9fxbFjEqmv8zyz3sMFw",
              next_notpadd_projectId: "2db16ab3-93ae-4693-bf99-9f95cd2733ed",
            },
          }
        );

        const data: Article = await response.json();
        setArticle(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getArticle();
  }, [articleId]);

  return (
    <div className="min-h-screen ">
      {article && (
        <div className="h-full w-full p-5 max-w-4xl mx-auto">
          <div className="relative h-72 ">
            <Image
              src={
                article.displayImage ? article.displayImage : "/placeholder.svg"
              }
              fill
              className="object-cover rounded-lg"
              alt="Image"
            />
          </div>
          <h1 className="text-3xl my-4">{article.title}</h1>
          <BlogContent content={article.content} />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
