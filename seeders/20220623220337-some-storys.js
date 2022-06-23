"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Codaisseur",
          content: "Learned alot!",
          imageUrl:
            "https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/Codaisseur-square/original.png?1560209974",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Css",
          content: "Easy to learn hard to master",
          imageUrl:
            "https://play-lh.googleusercontent.com/RTAZb9E639F4JBcuBRTPEk9_92I-kaKgBMw4LFxTGhdCQeqWukXh74rTngbQpBVGxqo",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Redux",
          content: "is scary!",
          imageUrl: "https://redux.js.org/img/redux-logo-landscape.png",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "React",
          content: "Was the hardest week for me!",
          imageUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--wCGgterD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
