"use client";

import { apiEndpoint } from "@/constants";
import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Blogs: React.FC = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [mostRecent, setMostRecent] = useState<Article | null>(null);

  const fetchThem = async () => {
    const headers = new Headers({
      next_notpadd_userId: "user_2hoy34no9fxbFjEqmv8zyz3sMFw",
      next_notpadd_projectId: "2db16ab3-93ae-4693-bf99-9f95cd2733ed",
      get_only_public_articles: "True",
      // Uncomment these lines if you need to send these headers
      // get_all_articles: "True",
      // get_only_private_articles: "",
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: Article[] = await response.json();

      // Sorting the data based on createdAt
      const sortedArticles = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Slog-data
      const slogedData = sortedArticles.map((article) => {
        return {
          ...article,
          slug: article.title.split(" ").join("-"),
        };
      });

      // Set the most recent article
      const mostRecentArticle = slogedData[0];
      const otherArticles = slogedData.slice(1);

      setMostRecent(mostRecentArticle);
      setArticles(otherArticles);
    } catch (error: any) {
      console.error("Failed to fetch articles:", error.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 py-20">
      <button
        onClick={fetchThem}
        className="bg-gradient-to-tr from-green-500 text-white font-medium to-gray-500 via-orange-500 px-10 py-2 rounded-md w-fit "
      >
        Fetch Articles
      </button>

      {mostRecent && (
        <div className="border rounded-xl mb-10 overflow-hidden">
          <div className="relative h-96 group ">
            <Image
              src={
                mostRecent.displayImage
                  ? mostRecent.displayImage
                  : "/placeholder.svg"
              }
              fill
              className="object-cover rounded-lg"
              alt="Most Recent Image"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/25 opacity-0 flex flex-col justify-between group-hover:opacity-100 transition duration-300">
              <div />

              <div className="p-5 text-white first-letter:capitalize">
                <Link
                  href={{
                    pathname: `/${mostRecent.slug}`,
                    query: {
                      id: mostRecent.id,
                    },
                  }}
                  className="hover:underline text-3xl first-letter:capitalize"
                >
                  {mostRecent.title}
                </Link>
                <p className="text-sm antialiased line-clamp-2">
                  {mostRecent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 overflow-hidden">
        {articles?.map((article) => (
          <div key={article.id} className="border rounded-lg">
            <div className="relative h-56">
              <Image
                src={
                  article.displayImage
                    ? article.displayImage
                    : "/placeholder.svg"
                }
                fill
                className="object-cover rounded-lg"
                alt="Image"
              />
            </div>
            <div className="p-3">
              <Link
                href={{
                  pathname: `/${article.slug}`,
                  query: {
                    id: article.id,
                  },
                }}
                className="hover:underline"
              >
                {article.title}
              </Link>
              <p className="text-sm line-clamp-3">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
