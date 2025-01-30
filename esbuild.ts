import esbuild from "npm:esbuild@0.24.2";

const buildCtx = await esbuild.context({
  entryPoints: ["./src/index.jsx"],
  // loader: { ".js": "jsx" },
  bundle: true,
  outfile: "./dist/index.js",
});

await buildCtx.watch();
console.log("Waiting for file changes...");

// TODO: Find a way to show when rebuilds are triggered
