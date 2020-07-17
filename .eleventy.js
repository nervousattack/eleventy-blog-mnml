const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
      markdownIt = require('markdown-it');
const markdownItFootnote = require("markdown-it-footnote");

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('favicon.ico');
  const options = {
    html: true,
    breaks: true,
    linkify: false
  };

  const markdownComp = markdownIt(options).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownComp);

  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/pdfs");

  markdownComp.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ":" + tokens[idx].meta.subId;
    }

    return n;
  };
  return {
    // Use liquid in html templates
    htmlTemplateEngine: "liquid"
  };
};
