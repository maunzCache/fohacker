import esbuild from "npm:esbuild@0.20.2";

await esbuild.build({
  entryPoints: ["./src/fohacker.js"],
  bundle: true,
  outdir: "./dist",
});
