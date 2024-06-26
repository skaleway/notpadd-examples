"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block } from "@blocknote/core";

// Our <Editor> component we can reuse later
export default function Blog({ content }: { content: Block[] }) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: content,
  });

  //   editor.removeStyles({ backgroundColor: "pink" });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} editable={false} />;
}
