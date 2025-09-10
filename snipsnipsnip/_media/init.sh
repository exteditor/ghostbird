corepack install
corepack yarn install
corepack yarn run sdk vscode
corepack enable
jq .recommendations[] .vscode/extensions.json | xargs -n 1 code --install-extension
cp .vscode/settings.example.json .vscode/settings.json
