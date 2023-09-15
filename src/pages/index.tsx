import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import plugin from "grapesjs-preset-webpage";
import newPlugin from "grapesjs-preset-newsletter";
import thePlugin from "grapesjs-plugin-export";
import { useState } from "react";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export default function DefaultEditor() {
  const [editor, setEditor] = useState<Editor>();

  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
    editor?.setComponents(`<html>
    <head>
      <style>* { box-sizing: border-box; } body {margin: 0;}#iotg{height:150px;margin:0 auto 10px auto;padding:5px 5px 5px 5px;width:100%;}#ilun{padding:0;margin:0;vertical-align:top;width:50%;}#ib5k{padding:0;margin:0;vertical-align:top;width:50%;}.bdg-sect{background-color:#f41313;}</style>
    </head>
      <body><table id="iotg"><tbody><tr><td id="ilun"><section class="bdg-sect"><h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p></section></td><td id="ib5k"></td></tr></tbody></table></body>
    <script></script>
    </html>`);
    setEditor(editor);
  };

  const exportHTML = () => {
    const html = editor?.getHtml();
    const css = editor?.getCss();
    const js = editor?.getJs();

    const combinedCode = `
    <html>
    <head>
      <style>${css}</style>
    </head>
      ${html}
    <script>${js}</script>
    </html>
  `;

    console.log(combinedCode);

    const blob = new Blob([combinedCode], { type: "text/html" });

    const formData = new FormData();
    formData.append("file", blob, "index.html");

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
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
          // projectData: initProject,
        }}
        onEditor={onEditor}
        plugins={[plugin, newPlugin]}
      />
      <button onClick={exportHTML}>Export HTML</button>
    </>
  );
}
