Install project dependencies: `npm i`  
NB! Requires NodeJS >= 8.4.0

Build project: `webpack`  
Build project with sourcemaps: `webpack --mode development`  
Add root public path using `webpack --env root_path=[your custom path]`

Build package: `python setup.py bdist_wheel && python setup.py sdist`

For testing with demo module:
- Build theme package (see above)
- Install wheel locally: `pip install --force-reinstall ./dist/dff_sphinx_theme-*.whl`
- Install demo module dependencies: `pip install -r demo/requirements.py`
- Build docs: `sphinx-build demo/docs web-build`

Analyzed and updated source files (`.ts` and `.scss`) are marked with following header:
```typescript
/**
 * Final redaction
 **/
```

**WARNING!**  
SASS styling is still under way.
By the time this inscription is being made, designing (mobile, middle-size) is still in process.
After website is finished and _all_ required elements added, we should revisit SASS files once again.
We should:
1. Restore everything that was useful and for any reason was deleted (regarding not-yet-included Sphinx addons and possibilities).
2. Finish styling for website to match design.
3. If needed, revisit TypeScript files too, some (most) of them were untouched since PyTorch import, only God knows if (and how) they work.
4. Remove everything unused (RTD and PyTorch classes or Sphinx addons we don't need).
5. Remove big files (`_sphinx_base.scss`), split them into smaller ones, specifying design for one particular element of website.

I'm sorry to release the theme in this condition.
However, I don't have enough time to fix it and most importantly I don't know what website will look like yet, so it's impossible to check if most of the elements work, how they work and if they are needed at all.
Dear future programmer of DFF Sphinx theme, please accept my apologies and be strong.

**TODO**:
- Replace `.ts` string concatenation with `-wrapped strings
- Add pencil icon (if needed) `_static/pencil-16.png`
- Fix button from `sphinx_copybutton` plugin
- Finish color replacement with variables in `.scss` files + clean variables
- Check jinja nested blocks, flatten
- Fix extra-long function definitions (in documented packages)
- Check top-bar height, adjust logo height if necessary
- Fix TODOs and FIXMEs (multiple)
- Transfer build process to `collect_documentation.py`
- Extract `theme_tutorial_name` variable to examples build (sphinx gallery)

**NOTES**:  
- Jupyter Notebooks:  
  - Use this: https://github.com/ngoldbaum/RunNotebook
  - Use Google Colab
- Extra beautiful features:
  - Use examples from here: https://pytorch.org/tutorials/
