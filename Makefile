# This Makefile is here so that `make build` is a bit shorter than
# `corepack enable && yarn install && yarn build`

.PHONY: all build check clean deepclean devenv dist doc fmt fix js start test web-ext xpi

GIT=git
YARN=corepack yarn
CP=cp

all: test xpi

build: xpi

check:
	$(YARN) run check

clean:
	$(GIT) clean -dXf src dist build

deepclean:
	$(GIT) clean -dXf

devenv: .yarn/sdks .vscode/settings.json .vscode/launch.json .vscode/tasks.json .web-ext-config.mjs

dist: js

doc: build/doc

fmt:
	$(YARN) run fmt

fix:
	$(YARN) run fix

js: .yarn
	$(YARN) run build-js

start: js .web-ext-config.mjs
	$(YARN) run start

test: js
	$(YARN) run test

web-ext: .web-ext-config.mjs
	$(YARN) run web-ext docs

xpi: js
	$(YARN) run build-xpi

.yarn:
	$(YARN)

.yarn/sdks: .yarn
	$(YARN) run sdk vscode

build/:
	mkdir build

build/doc: js
	$(YARN) run doc

.vscode/settings.json: | .vscode/settings.example.json
	$(CP) .vscode/settings.example.json $@

.vscode/launch.json: | .vscode/launch.example.json
	$(CP) .vscode/launch.example.json $@

.vscode/tasks.json: | .vscode/tasks.example.json
	$(CP) .vscode/tasks.example.json $@

.web-ext-config.mjs: | .web-ext-config.example.mjs
	$(CP) .web-ext-config.example.mjs $@
