type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const prefix = `[ai:${level}]`;
  if (meta) {
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](prefix, message, meta);
  } else {
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](prefix, message);
  }
}

export const aiLog = {
  info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),
};
