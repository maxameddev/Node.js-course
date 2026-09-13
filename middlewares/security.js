import cors from "cors";
import rateLimit from "express-rate-limit";

export const corsOptions = {
  origin(origin, callback) {
    const configuredOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((value) => value.trim())
      : process.env.NODE_ENV === "production"
        ? []
        : ["http://localhost:3000", "http://localhost:5173"];

    // Render supplies its public URL here, allowing Swagger UI on the same app.
    const allowedOrigins = process.env.RENDER_EXTERNAL_URL
      ? [...configuredOrigins, process.env.RENDER_EXTERNAL_URL]
      : configuredOrigins;

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error("Origin is not allowed by CORS");
    error.statusCode = 403;
    return callback(error);
  },
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many login or registration attempts. Please try again later." },
});
