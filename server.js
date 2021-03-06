"use strict";

// Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment
const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

// Logging in development environment
if (ENV === "development") {
  app.use(morgan("combined"));
}

// API routes
const {
  contactFieldOptionsRouter,
  contactFieldTypesRouter,
  componentRouter,
  componentsRouter,
  componentTypesRouter,
  pageNavigationTypesRouter,
  pageReviewRouter,
  pageRouter,
  pagesRouter,
  pageTemplatesRouter,
  pageTypesRouter,
  recycleBinRouter,
  userRouter,
  usersRouter,
} = require("./routes");
app.use("/api/contact-field-options", contactFieldOptionsRouter);
app.use("/api/contact-field-types", contactFieldTypesRouter);
app.use("/api/component", componentRouter);
app.use("/api/components", componentsRouter);
app.use("/api/component-types", componentTypesRouter);
app.use("/api/page", pageRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/page-navigation-types", pageNavigationTypesRouter);
app.use("/api/page-review", pageReviewRouter);
app.use("/api/page-templates", pageTemplatesRouter);
app.use("/api/page-types", pageTypesRouter);
app.use("/api/recycle-bin", recycleBinRouter);
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);

// Use React app's build directory as static mount point
app.use(express.static(path.join(__dirname, "app", "build")));

// React routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
