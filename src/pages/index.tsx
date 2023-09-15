import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import plugin from "grapesjs-preset-webpage";
import newPlugin from "grapesjs-preset-newsletter";
import thePlugin from "grapesjs-plugin-export";
import { useState } from "react";

export default function DefaultEditor() {
  const [editor, setEditor] = useState<Editor>();

  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
    setEditor(editor);
  };

  const exportHTML = () => {
    const html = editor?.getHtml();
    const css = editor?.getCss();
    const projectData = editor?.getProjectData();

    // localStorage.setItem("projectData", JSON.stringify(html2));
    // console.log(html);
    // console.log(css);
    editor?.runCommand("gjs-export-zip");
    console.log(html, css, projectData);
  };

  // let projectData;
  // if (typeof window !== "undefined") {
  //   projectData = JSON.parse(localStorage.getItem("projectData") as any);
  // }

  const initProject = {
    assets: [],
    styles: [],
    pages: [
      {
        frames: [
          {
            component: {
              type: "wrapper",
              stylable: [
                "background",
                "background-color",
                "background-image",
                "background-repeat",
                "background-attachment",
                "background-position",
                "background-size",
              ],
              components: [
                {
                  tagName: "section",
                  classes: ["bdg-sect"],
                  components: [
                    {
                      tagName: "h1",
                      type: "text",
                      classes: ["heading"],
                      components: [
                        {
                          type: "textnode",
                          content: "Insert title here",
                        },
                      ],
                    },
                    {
                      tagName: "p",
                      type: "text",
                      classes: ["paragraph"],
                      components: [
                        {
                          type: "textnode",
                          content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            id: "mj3nHa9KjKJpySmz",
          },
        ],
        type: "main",
        id: "5Si6SKtkmmiTvDll",
      },
    ],
  };

  return (
    <>
      <GjsEditor
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        // GrapesJS init options
        options={{
          height: "100vh",
          storageManager: false,
          projectData: initProject,
        }}
        onEditor={onEditor}
        plugins={[plugin, thePlugin]}
      />
      <button onClick={exportHTML}>Export HTML</button>
    </>
  );
}
