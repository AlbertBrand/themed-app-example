/**
 * Define all themes that are specified with the 'theme' attribute on style tags.
 * If not specified via the VUE_THEME env variable, the first theme will be selected when bundling the CSS.
 */
const THEMES = ['a', 'b', 'c'];

/**
 * Add theme support for Vue SFC files.
 */
function addThemeSupport(config) {
  let theme = process.env.VUE_THEME;
  if (theme === undefined || !THEMES.includes(theme)) {
    theme = THEMES[0];
  }
  console.log(`Theme "${theme}" used`); // eslint-disable-line no-console

  const otherThemes = THEMES.filter(t => t !== theme);
  const otherThemesCond = otherThemes.map(
    theme => new RegExp(`theme=${theme}`)
  );

  ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'].forEach(rule => {
    // exclude other themes in existing rules
    config.module
      .rule(rule)
      .oneOf('vue-modules')
      .resourceQuery({
        test: config.module
          .rule(rule)
          .oneOf('vue-modules')
          .get('resourceQuery'),
        not: otherThemesCond,
      });
    config.module
      .rule(rule)
      .oneOf('vue')
      .resourceQuery({
        test: config.module
          .rule(rule)
          .oneOf('vue')
          .get('resourceQuery'),
        not: otherThemesCond,
      });
    config.module
      .rule(rule)
      .oneOf('normal-modules')
      .resourceQuery({ not: otherThemesCond });
    config.module
      .rule(rule)
      .oneOf('normal')
      .resourceQuery({ not: otherThemesCond });

    // add catch-all rule to null other themes
    config.module
      .rule(rule)
      .oneOf('theme')
      .resourceQuery({ or: otherThemesCond })
      .use('null')
      .loader('null-loader')
      .end();
  });
}

module.exports = {
  chainWebpack: config => {
    addThemeSupport(config);
  },
};
