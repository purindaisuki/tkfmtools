const path = require("path");
const langConfig = require("./src/languageConfig.json");
const page_tr = require("./src/data/string/page_zh-TW.json");
const char_tr = require("./src/data/string/character_zh-TW.json");
const item_tr = require("./src/data/string/item_zh-TW.json");
const stage_tr = require("./src/data/string/stage_zh-TW.json");
const skill_tr = require("./src/data/string/skill_zh-TW.json");
const page_en = require("./src/data/string/page_en.json");
const char_en = require("./src/data/string/character_en.json");
const item_en = require("./src/data/string/item_en.json");
const stage_en = require("./src/data/string/stage_en.json");
const skill_en = require("./src/data/string/skill_en.json");
const page_ja = require("./src/data/string/page_ja.json");
const char_ja = require("./src/data/string/character_ja.json");
const item_ja = require("./src/data/string/item_ja.json");
const stage_ja = require("./src/data/string/stage_ja.json");
const skill_ja = require("./src/data/string/skill_ja.json");
const page_ko = require("./src/data/string/page_ko.json");
const char_ko = require("./src/data/string/character_ko.json");
const item_ko = require("./src/data/string/item_ko.json");
const stage_ko = require("./src/data/string/stage_ko.json");
const skill_ko = require("./src/data/string/skill_ko.json");

const stringData = {
  "zh-TW": {
    pageString: page_tr,
    charString: char_tr,
    itemString: item_tr,
    stageString: stage_tr,
    skillString: skill_tr,
  },
  en: {
    pageString: page_en,
    charString: char_en,
    itemString: item_en,
    stageString: stage_en,
    skillString: skill_en,
  },
  ja: {
    pageString: page_ja,
    charString: char_ja,
    itemString: item_ja,
    stageString: stage_ja,
    skillString: skill_ja,
  },
  ko: {
    pageString: page_ko,
    charString: char_ko,
    itemString: item_ko,
    stageString: stage_ko,
    skillString: skill_ko,
  },
};

// Absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Delete the incoming page that was automatically created by Gatsby
  deletePage(page);

  Object.entries(langConfig).map((entry) => {
    const localizedPath = entry[1].default
      ? page.path
      : `${entry[1].path}${page.path}`;

    const withTabs =
      localizedPath.includes("enlist/") ||
      localizedPath.includes("drop/") ||
      localizedPath.includes("analysis/");

    const withLineupData =
      localizedPath.includes("analysis/") || localizedPath.includes("team/");
    const withTeamData = localizedPath.includes("team/");

    // Check if the page is a localized 404
    if (localizedPath.match(/^[a-z]{2}\/404\/$/)) {
      page.matchPath = `/${entry[0]}/*`;
      // Recreate the modified page
      return createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          lang: entry[0],
          stringData: stringData[entry[0]],
        },
      });
    }

    return createPage({
      ...page,
      path: localizedPath,
      // Pass in the stringData as context to every page
      context: {
        ...page.context,
        pagePath: page.path,
        isIndex: page.component.includes("index"),
        lang: entry[0],
        stringData: stringData[entry[0]],
        withTabs,
        withLineupData,
        withTeamData,
      },
    });
  });
};
