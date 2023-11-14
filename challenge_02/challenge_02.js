import defaultCompiler from "./compiler.js";
// Obtain message
const encoded = await fetch("https://codember.dev/data/message_02.txt").then(e=>e.text()).then(e=>e.trim());
defaultCompiler.compile(encoded);
