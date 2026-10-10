import { config } from "./src/config/index.js";
import app from "./src/app.js";

const server = app.listen(config.port, "0.0.0.0", () => {
  console.log(`Resume Analyzer API running on port ${config.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close((error) => {
    if (error) {
      console.error("Error while shutting down the server.");
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));