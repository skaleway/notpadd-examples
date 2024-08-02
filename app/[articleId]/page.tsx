"use client";

import { apiEndpoint } from "@/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Article } from "@/types";
import Image from "next/image";
import { NotpaddContent } from "notpadd-content/client";
const ArticlePage = ({ params }: { params: { articleId: string } }) => {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  //   console.log(params);

  const articleId = searchParams.get("id");

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(apiEndpoint + `/${articleId}`, {
          headers: {
            USER_KEY: "dXNlcl8yaHBiQzJTME9yY0Zhd09lYjc0TENIa1NNTk4",
            USER_SECRET: "MzYxNGEyMDAtOTI4Ni00MGFlLTlkMTAtOGU5MGRjMzZjNWRl",
          },
        });

        const data: Article = await response.json();

        console.log(data);

        setArticle(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getArticle();
  }, [articleId]);

  if (!articleId) return alert("article id require");

  // console.log(article);

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

          <NotpaddContent
            content={JSON.stringify(article?.content)}
            theme="light"
          />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
