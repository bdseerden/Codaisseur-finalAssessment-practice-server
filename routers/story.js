const { Router } = require("express");
const Story = require("../models").story;
const storiesRouter = new Router();

storiesRouter.get("/stories", async (request, response, next) => {
  try {
    const getStories = await Story.findAll();
    response.send(getStories);
  } catch (e) {
    next(e.message);
  }
});

module.exports = storiesRouter;
