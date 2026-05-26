var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to load Vite in dev mode:", e);
    }
  } else {
    const distPath = import_path.default.resolve(process.cwd(), "dist");
    app.use("/assets", import_express.default.static(import_path.default.join(distPath, "assets"), {
      immutable: true,
      maxAge: "1y",
      fallthrough: false
    }));
    const rootAssets = ["/manifest.json", "/sw.js", "/favicon.ico", "/icon.svg", "/robots.txt"];
    rootAssets.forEach((asset) => {
      app.get(asset, (req, res) => {
        res.sendFile(import_path.default.join(distPath, asset));
      });
    });
    app.get("/", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    app.get("/api/health", (req, res) => {
      res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
    });
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"), (err) => {
        if (err) {
          console.error("Internal routing error:", err);
          res.status(500).send("App error");
        }
      });
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
