import crypto from "node:crypto";

export function requestIdMiddleware(req, res, next) {
  req.id = crypto.randomUUID();
  res.setHeader("x-request-id", req.id);
  next();
}