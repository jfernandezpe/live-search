/* 
I'm using the legacy open-wc's storybook due to a issue on windows:
https://github.com/modernweb-dev/web/issues/1229

*/

module.exports = {
  stories: ['../**/stories/*.stories.{js,md,mdx}'],
  addons: [
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-viewport/register.js',
    'storybook-prebuilt/addon-a11y/register.js',
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-actions/register.js',
  ],
  esDevServer: {
    // custom es-dev-server options
    nodeResolve: true,
    watch: true,
    open: true,
  },
  //TODO: disable keyboard shortcuts
};
