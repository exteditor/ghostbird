// You have to adjust it to debug
// See: https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-run
// See: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#use-a-custom-profile
export default {
  run: {
    // You can use flatpak by specifying "flatpak:org.mozilla.Thunderbird"
    firefox: "/usr/bin/thunderbird",
    firefoxProfile: "/home/your/.config/your-testing-thunderbird-profile",
    profileCreateIfMissing: true,
  },
};
