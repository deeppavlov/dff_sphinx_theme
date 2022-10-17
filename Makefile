SHELL = /bin/bash

VENV_PATH = venv

DEMO_BASE_URL = .

VERSIONING_FILES = setup.py demo/docs/conf.py

help:
	@echo "Thanks for your interest in DFF Sphinx Theme!"
	@echo
	@echo "make build-demo: Build Demo website site"
	@echo "make build-doc: Build Sphinx docs; activate your virtual environment before execution"
	@echo "make build: Build all artifacts"
	@echo "make lint: Run linters"
	@echo "TODO: make test: Run basic tests (not testing most integrations)"
	@echo "TODO: make test-all: Run ALL tests (slow, closest to CI)"
	@echo "TODO: make format: Run code formatters (destructive)"
	@echo "TODO: make pre_commit: Register a git hook to lint the code on each commit"
	@echo "make version-major: increment version major in metadata files 8.8.1 -> 9.0.0"
	@echo "make version-minor: increment version minor in metadata files 9.1.1 -> 9.2.0"
	@echo "make version-patch: increment patch number in metadata files 9.9.1 -> 9.9.2"
	@echo
.PHONY: help

print-version:
	$(VENV_PATH)/bin/python3 -m current_version_printer.py
.PHONY: print-version



venv:
	python3 -m venv $(VENV_PATH)

install: venv
	$(VENV_PATH)/bin/pip install -r requirements.txt
.PHONY: install

install-dev: install
	$(VENV_PATH)/bin/pip install --upgrade pip setuptools wheel bump2version flake8 black
	npm install
.PHONY: install-dev

# install-test: install
#	$(VENV_PATH)/bin/pip install --upgrade pytest pytest-cov pytest-asyncio
# .PHONY: install-test



build-theme: install-dev
	npx webpack
.PHONY: build-theme

build-wheels: build-theme
	$(VENV_PATH)/bin/python setup.py bdist_wheel
	$(VENV_PATH)/bin/python setup.py sdist
.PHONY: build-wheels

demo-install: venv build-wheels
	$(VENV_PATH)/bin/pip install --force-reinstall ./dist/dff_sphinx_theme-*.whl
	$(VENV_PATH)/bin/pip install -r ./demo/requirements.txt
.PHONY: build-install

build-demo: demo-install
	$(VENV_PATH)/bin/sphinx-build -M clean demo/docs web-build
	$(VENV_PATH)/bin/sphinx-build -M html -D html_theme_options.base_url=$(DEMO_BASE_URL) demo/docs web-build
.PHONY: build-demo

build-doc: demo-install
	$(VENV_PATH)/bin/sphinx-build -M clean docs doc-build
	$(VENV_PATH)/bin/sphinx-build -M html docs doc-build
.PHONY: build-doc

build: build-wheels build-demo build-doc
.PHONY: build



lint-python: install-dev
	$(VENV_PATH)/bin/flake8 --max-line-length 120 extras/
	$(VENV_PATH)/bin/flake8 --max-line-length 120 setup.py
	$(VENV_PATH)/bin/flake8 --max-line-length 120 theme_init.py
.PHONY: lint-python

lint-scripts: install-dev
	npx eslint '**/*.ts'
.PHONY: lint-scripts

lint-styles: install-dev
	npx stylelint '**/*.scss'
.PHONY: lint-styles

lint-jinja: install-dev
	npx djlint templates
.PHONY: lint-jinja

lint: lint-python lint-scripts lint-styles lint-jinja
.PHONY: lint



format-python: install-dev
	$(VENV_PATH)/bin/black --exclude="setup\.py" --line-length=120 .
.PHONY: format-python

# TODO: add format-scripts

# TODO: add format-styles

# TODO: add format-jinja

# TODO: add format



# test: venv
# 	$(VENV_PATH)/bin/pytest --cov-report html --cov-report term --cov=df_runner tests/
# .PHONY: test

# test_all: venv test lint
# .PHONY: test_all

# pre_commit: venv
#	echo -e "#!/bin/sh\n\nmake test_all" > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# .PHONY: pre_commit



version-patch: venv
	$(VENV_PATH)/bin/bump2version patch $(VERSIONING_FILES) --allow-dirty
.PHONY: version-patch

version-minor: venv
	$(VENV_PATH)/bin/bump2version minor $(VERSIONING_FILES) --allow-dirty
.PHONY: version-minor

version-major: venv
	$(VENV_PATH)/bin/bump2version major $(VERSIONING_FILES) --allow-dirty
.PHONY: version-major
