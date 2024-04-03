import esbuild from "npm:esbuild@0.20.2";

const buildCtx = await esbuild.context({
  entryPoints: ["./src/app.jsx"],
  bundle: true,
  outfile: "./dist/index.js",
});

await buildCtx.watch();
console.log("Waiting for file changes...");
