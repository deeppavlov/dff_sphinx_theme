SHELL = /bin/bash

VENV_PATH = venv
PATH := $(VENV_PATH)/bin:$(PATH)

DEMO_BASE_URL = .


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
	@python3 current_version_printer.py
.PHONY: print-version



venv:
	python3 -m venv $(VENV_PATH)
	pip install -r requirements.txt
	pip install --upgrade pip setuptools wheel bump2version flake8 black

node_modules:
	npm install

# install-test: install
#	$(VENV_PATH)/bin/pip install --upgrade pytest pytest-cov pytest-asyncio
# .PHONY: install-test



dff_sphinx_theme: node_modules
	npx webpack

dist: venv dff_sphinx_theme
	python3 setup.py bdist_wheel
	python3 setup.py sdist

demo/requirements-lock.txt: dist
	pip install --force-reinstall ./dist/dff_sphinx_theme-*.whl
	pip install -r ./demo/requirements.txt
	pip freeze > ./demo/requirements-lock.txt

demo-build: demo/requirements-lock.txt
	sphinx-build -M clean demo/docs demo-build
	sphinx-build -M html -D html_baseurl=$(DEMO_BASE_URL) demo/docs demo-build

doc-build: dist
	sphinx-build -M clean docs doc-build
	sphinx-build -M html docs doc-build

build: dist demo-build # doc-build
.PHONY: build

rebuild: clean build
.PHONY: rebuild



lint-python: venv
	flake8 --max-line-length 120 extras/
	flake8 --max-line-length 120 setup.py
	flake8 --max-line-length 120 theme_init.py
.PHONY: lint-python

lint-scripts: node_modules
	npx eslint '**/*.ts'
.PHONY: lint-scripts

lint-styles: node_modules
	npx stylelint '**/*.scss'
.PHONY: lint-styles

lint-jinja: venv node_modules
	npx djlint templates
.PHONY: lint-jinja

lint: lint-python lint-scripts lint-styles lint-jinja
.PHONY: lint



format-python: venv
	black --exclude="setup\.py" --line-length=120 .
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
	bump2version patch $(VERSIONING_FILES) --allow-dirty
.PHONY: version-patch

version-minor: venv
	bump2version minor $(VERSIONING_FILES) --allow-dirty
.PHONY: version-minor

version-major: venv
	bump2version major $(VERSIONING_FILES) --allow-dirty
.PHONY: version-major



clean:
	rm -rf build
	rm -rf dff_sphinx_theme
	rm -rf dff_sphinx_theme.egg-info
	rm -rf dist
	rm -rf web-build
	rm -rf demo/docs/examples
.PHONY: clean

clean-all: clean
	rm -rf venv
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf demo/requirements-lock.txt
.PHONY: clean
