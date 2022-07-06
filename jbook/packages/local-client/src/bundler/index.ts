import { initialize, build } from "esbuild-wasm";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";

let service = false;

export interface Bundle {
  code: string;
  err: string;
}

const bundle = async (input: string): Promise<Bundle> => {
  if (!service) {
    await initialize({
      wasmURL: "/esbuild.wasm",
      worker: true,
    });
    service = true;
  }

  try {
    const result = await build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.en.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (error: any) {
    return {
      code: "",
      err: error.message,
    };
  }
};

export default bundle;
