import { Block } from "@blocknote/core";

export type Article = {
  id: string;
  content: string;
  title: string;
  displayImage: string;
  description: string;
  createdAt: string;
  slug: string; // Change to string to match the typical date format from APIs
};
