const { Router } = require("express");
const Space = require("../models").space;
const spacesRouter = new Router();

spacesRouter.get("/", async (request, response, next) => {
  try {
    const getSpaces = await Space.findAll();
    response.send(getSpaces);
  } catch (e) {
    next(e.message);
  }
});

module.exports = spacesRouter;
