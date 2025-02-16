import fs from 'node:fs';
import deepmerge from 'deepmerge';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

const isFirefox = process.env.__FIREFOX__ === 'true';

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = deepmerge(
  {
    manifest_version: 3,
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: 'RECLaiM',
    version: packageJson.version,
    description: 'AI Powered Study Tool',
    host_permissions: ['<all_urls>'],
    permissions: ['storage', 'scripting', 'tabs', 'notifications', 'activeTab'],
    options_page: 'options/index.html',
    background: {
      service_worker: 'background.iife.js',
      type: 'module',
    },
  
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'QHacks-Logo (1).png',
    },
    icons: {
      128: 'QHacks-Logo (1).png',
    },
    // content_scripts: [
    //   {
    //     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    //     js: ['content/index.iife.js'],
    //   },
    //   {
    //     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    //     js: ['content-ui/index.iife.js'],
    //   },
    //   {
    //     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    //     css: ['content.css'], // public folder
    //   },
    // ],
    devtools_page: 'devtools/index.html',
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
        matches: ['*://*/*'],
      },
    ],
  },
  !isFirefox,
);

export default manifest;
