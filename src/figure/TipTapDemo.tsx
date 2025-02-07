import React, { useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Code from "@tiptap/extension-code";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import Gapcursor from "@tiptap/extension-gapcursor";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TipTapDemo = () => {
  const linkRef = useRef<HTMLInputElement>(null);

  const extensions = [
    Youtube.configure({
      width: 500,
      height: 400,
      inline: false,
      controls: true,
      nocookie: true,
      allowFullscreen: false,
      autoplay: false,
      ccLanguage: "es",
      ccLoadPolicy: true,
      enableIFrameApi: true,
      disableKBcontrols: true,
    }),
    Text,
    Paragraph,
    HorizontalRule,
    StarterKit,
    Image.configure({ inline: true, allowBase64: true }),
    Underline,
    Strike,
    Highlight.configure({ multicolor: true }),
    Link.configure({
      defaultProtocol: "https",
    }),
    Subscript,
    Superscript,
    Code,
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    Blockquote,
    BulletList,
    ListItem,
    CodeBlock,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Gapcursor,
    CharacterCount.configure({ limit: null }),
  ];

  const content = "<p>Hello World!</p>";

  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) return null;

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      if (typeof imageUrl == "string")
        editor.chain().focus().setImage({ src: imageUrl }).run();
    };
    if (file) reader.readAsDataURL(file);
  };

  const addLink = () => {
    if (linkRef.current?.value) {
      const link: string = linkRef.current?.value;
      editor.commands.setYoutubeVideo({
        src: link,
      });
    }
  };
  return (
    <>
      <div>
        <div className="bg-white border p-2 flex gap-x-2 flex-wrap mb-2">
          <button
            className={`py-1 px-2 h-fit text-xs font-mono rounded-md font-bold ${
              editor.isActive("bold") ? "bg-primary" : "bg-slate-400"
            } text-white`}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
          >
            B
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs font-mono rounded-md italic ${
              editor.isActive("italic") ? "bg-primary" : "bg-slate-400"
            } text-white`}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
          >
            I
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono underline ${
              editor.isActive("underline") ? "bg-primary" : "bg-slate-400"
            } text-white`}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            disabled={!editor?.can().chain().focus().toggleUnderline().run()}
          >
            U
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono  ${
              editor.isActive("highlight", { color: "#09B291" })
                ? "bg-primary"
                : "bg-slate-400"
            } text-white`}
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHighlight({ color: "#09B291" })
                .run()
            }
            disabled={
              !editor
                ?.can()
                .chain()
                .focus()
                .toggleHighlight({ color: "#09B291" })
                .run()
            }
          >
            Hightlight
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("code") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editor?.can().chain().focus().toggleCode().run()}
          >
            Code
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono  ${
              editor.isActive("heading", { level: 1 })
                ? "bg-primary"
                : "bg-slate-400"
            } text-white`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Heading 1
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono  ${
              editor.isActive("heading", { level: 2 })
                ? "bg-primary"
                : "bg-slate-400"
            } text-white`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={
              !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            Heading 2
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono  ${
              editor.isActive("heading", { level: 3 })
                ? "bg-primary"
                : "bg-slate-400"
            } text-white`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={
              !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            Heading 3
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md line-through font-mono text-white ${
              editor.isActive("strike") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            Strike
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("strike") ? "bg-primary" : "bg-slate-400"
            }`}
            // onClick={() => editor?.chain().focus().toggleLink().run()}
            // disabled={!editor.can().chain().focus().toggleLink().run()}
          >
            Link
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("subscript") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
            disabled={!editor?.can().chain().focus().toggleSubscript().run()}
          >
            X<sub>abc</sub>
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("superscript") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
            disabled={!editor?.can().chain().focus().toggleSuperscript().run()}
          >
            X<sup>abc</sup>
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("blockquote") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
          >
            Blockquote
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("bulletList") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          >
            Bullet List
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("orderedList") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          >
            Ordered List
          </button>
          {/* <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("listItem") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() =>
              editor?.chain().focus().splitListItem("listItem").run()
            }
            disabled={!editor?.can().splitListItem("listItem")}
          >
            List Item
          </button> */}
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white ${
              editor.isActive("codeBlock") ? "bg-primary" : "bg-slate-400"
            }`}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
          >
            Code block
          </button>
          <button
            className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          >
            Hr
          </button>
          <div>
            <label
              htmlFor="insert_image"
              className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
              // onClick={addImage}
            >
              Image
            </label>
            <input
              hidden
              type="file"
              id="insert_image"
              onChange={(e) => addImage(e)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
              >
                Table
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48">
              <div className="grid gap-2">
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                >
                  Insert
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  Add column before
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  Add column after
                </button>{" "}
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  Delete column
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().deleteTable().run()}
                >
                  Delete table
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().mergeCells().run()}
                >
                  Merge cell
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().splitCell().run()}
                >
                  Split cell
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() =>
                    editor.chain().focus().toggleHeaderColumn().run()
                  }
                >
                  Toggle header column
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                >
                  Toggle header row
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() =>
                    editor.chain().focus().toggleHeaderCell().run()
                  }
                >
                  Toggle header cell
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().mergeOrSplit().run()}
                >
                  Merge or split
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() =>
                    editor.chain().focus().setCellAttribute("colspan", 2).run()
                  }
                >
                  Set cell attribute
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().fixTables().run()}
                >
                  Fix tables
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() => editor.chain().focus().goToNextCell().run()}
                >
                  Go to next cell
                </button>
                <button
                  className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                  onClick={() =>
                    editor.chain().focus().goToPreviousCell().run()
                  }
                >
                  Go to previous cell
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
              >
                Youtube
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">URL</Label>
                    <Input
                      id="width"
                      ref={linkRef}
                      placeholder="Nhập link..."
                      className="col-span-2 h-8"
                    />
                    <button
                      className={`py-1 px-2 h-fit text-xs rounded-md font-mono text-white bg-slate-400`}
                      onClick={addLink}
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div>
            <div>
              Tổng từ: <span>{editor.storage.characterCount.words()}</span>{" "}
              <br />
              Kí tự: <span> {editor.storage.characterCount.characters()}</span>
            </div>
          </div>
        </div>
        <div>
          <EditorContent editor={editor} className="h-96"></EditorContent>
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <button
                className={`py-1 px-2 h-fit text-xs font-mono rounded-md font-bold ${
                  editor.isActive("bold") ? "bg-primary" : "bg-slate-400"
                } text-white`}
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={!editor?.can().chain().focus().toggleBold().run()}
              >
                B
              </button>
              <button
                className={`py-1 px-2 h-fit text-xs font-mono rounded-md italic ${
                  editor.isActive("italic") ? "bg-primary" : "bg-slate-400"
                } text-white`}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={!editor?.can().chain().focus().toggleItalic().run()}
              >
                I
              </button>
              <button
                className={`py-1 px-2 h-fit text-xs rounded-md font-mono underline ${
                  editor.isActive("underline") ? "bg-primary" : "bg-slate-400"
                } text-white`}
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                disabled={
                  !editor?.can().chain().focus().toggleUnderline().run()
                }
              >
                U
              </button>
            </BubbleMenu>
          )}
        </div>
      </div>
    </>
  );
};

export default TipTapDemo;
