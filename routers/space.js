const { Router } = require("express");
const Space = require("../models").space;
const auth = require("../auth/middleware");
const Story = require("../models").story;
const spacesRouter = new Router();

spacesRouter.get("/", async (request, response, next) => {
  try {
    const getSpaces = await Space.findAll();
    response.send(getSpaces);
  } catch (e) {
    next(e.message);
  }
});

spacesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Space id is not a number" });
  }

  const space = await Space.findByPk(id, {
    include: [Story],
    order: [[Story, "createdAt", "DESC"]],
  });

  if (space === null) {
    return res.status(404).send({ message: "Space not found" });
  }

  res.status(200).send({ message: "ok", space });
});

spacesRouter.delete;

spacesRouter.delete(
  "/:spaceId/stories/:storyId",
  auth,
  async (req, res, next) => {
    try {
      const { spaceId, storyId } = req.params;
      const story = await Story.findByPk(storyId, { include: [Space] });
      if (!story) {
        return res.status(404).send("Story not found");
      }

      // Check if this user is the owner of the space
      if (story.space.userId !== req.user.id) {
        return res
          .status(401)
          .send("You're not authorized to delete this story");
      }

      await story.destroy();

      res.send({ message: "ok", storyId });
    } catch (e) {
      next(e);
    }
  }
);

spacesRouter.post("/:id/stories", auth, async (req, res) => {
  const space = await Space.findByPk(req.params.id);
  console.log(space);

  if (space === null) {
    return res.status(404).send({ message: "This space does not exist" });
  }

  if (!space.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
  }

  const { name, imageUrl, content } = req.body;

  if (!name) {
    return res.status(400).send({ message: "A story must have a name" });
  }

  const story = await Story.create({
    name,
    imageUrl,
    content,
    spaceId: space.id,
  });

  return res.status(201).send({ message: "Story created", story });
});

module.exports = spacesRouter;
