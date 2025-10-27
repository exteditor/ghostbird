import mermaid from "mermaid";
import "docsify";

// @ts-check

/**
 * Build a URL to a GitHub resource
 * @param {string} type The type of resource ('blob' or 'tree')
 * @param {string} path Absolute path (/ points to the repository root) to the resource
 * @returns {string} The URL to the resource
 */
const urlFor = (type, path) => `https://github.com/exteditor/ghostbird/${encodeURIComponent(type)}/main/${encodeURIComponent(path.replace(/^[/]+/, ''))}`;

/**
 * Build a Markdown text that redirects to a URL
 * @param {string} url The URL to redirect to
 * @returns {string} A Markdown text
 */
const redirectTo = (url) => JSON.stringify({ redirectTo: url });

/**
 * Does redirect if the text is an instruction for it.
 * @param {string} text A Markdown text that may contain a redirect instruction
 * @returns {string | undefined} a message if the text is a redirect instruction; `undefined` otherwise
 */
function tryRedirect(text) {
  try {
    if (text.startsWith('{"redirectTo":"')) {
      const { redirectTo } = JSON.parse(text);
      location.replace(redirectTo);
      return "Redirecting...";
    }
  } catch (e) {
    console.warn("failed to parse the redirect instruction", e);
  }
  return undefined;
}

/**
 * Add a footer to the Markdown text
 * @param {string} text The Markdown text
 * @returns {string} Markdown text with footer added
 */
const addFooter = (text, vm) => `${text}

____

[▲ Back to Top](#top)
<div align="right">

Last Update: [{docsify-updated}](${urlFor('blob', vm.route.file)})<br>
Powered by [Docsify](https://docsify.js.org/)

</div>
`;

// see https://docsify.js.org/#/configuration

window.$docsify = {
  name: 'Ghostbird \u{1faba}\u{1f4eb}\u{1f47b}',
  repo: 'exteditor/ghostbird',
  logo: 'ext/blue.svg',
  formatUpdated: '{YYYY}-{MM}-{DD}',
  relativePath: true,
  executeScript: false,
  homepage: "homepage.md",
  coverpage: "coverpage.md",
  loadNavbar: "navbar.md",
  mergeNavbar: true,
  auto2top: true,
  maxLevel: 3,
  themeColor: '#0b9dd6',
  routes: {
    '/README': (route) => redirectTo(urlFor('blob', `${route}.md`)),
    '/LICENSE': (route) => redirectTo(urlFor('blob', route)),
    '/[-._/a-zA-Z]*[.][a-zA-Z]+$': (route) => redirectTo(urlFor('blob', route)),
    '/[-._/a-zA-Z]+/$': (route) => redirectTo(urlFor('tree', route)),
  },
  search: [
    '/',
    '/BUILDING',
    '/CONTRIBUTING',
    '/doc/faq',
    '/doc/faq-architectural',
    '/doc/design',
    '/doc/building',
    '/doc/testing',
  ],
  markdown: {
    renderer: {
      code(code, lang) {
        if (lang === "mermaid") {
          return `<pre class="mermaid">${code}</pre>`;
        }
        return this.origin.code.apply(this, arguments);
      }
    }
  },
  plugins: [
    (hook, vm) => {
      hook.beforeEach((text) => tryRedirect(text) ?? addFooter(text, vm) ?? text);
      hook.doneEach(() => mermaid.run());
    },
  ],
};

mermaid.initialize({ startOnLoad: false });

// load the plugin here having the global `$docsify` defined
await import("docsify/plugins/search");
