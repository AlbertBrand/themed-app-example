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

  const oneOfs = ['vue-modules', 'vue', 'normal-modules', 'normal'];
  ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'].forEach(style => {
    // workaround for https://github.com/neutrinojs/webpack-chain/issues/119,
    // store and remove existing rules
    const oneOfRules = config.module.rule(style).oneOfs;
    const rules = oneOfs.map(rule => oneOfRules.get(rule));
    oneOfs.forEach(rule => oneOfRules.delete(rule));

    // prepend existing style rules which nullifies other theme styles
    config.module
      .rule(style)
      .oneOf('nullify-other-themes')
      .resourceQuery({ or: otherThemesCond })
      .use('null-loader')
      .loader('null-loader')
      .end();

    // append existing rules
    oneOfs.forEach((rule, idx) => oneOfRules.set(rule, rules[idx]));
  });
}

module.exports = {
  chainWebpack: config => {
    addThemeSupport(config);
  },
};
