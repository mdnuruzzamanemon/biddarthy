"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="zge330wxfqiwr4it38rmsm7lvgky3bo5w59bpe4lgp4wmtq9" // You can leave this empty for local use
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 300,
        menubar: false,
        plugins: "lists link image",
        toolbar:
          "undo redo | formatselect | " +
          "bold italic underline | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat",
      }}
    />
  );
}
