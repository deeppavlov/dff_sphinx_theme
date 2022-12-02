from pathlib import Path
from setuptools import setup


LOCATION = Path(__file__).parent.resolve()

readme_file = LOCATION / "README.md"
readme_lines = [line.strip() for line in readme_file.open().readlines()]
description = [line for line in readme_lines if line and not line.startswith("#")][0]
long_description = "\n".join(readme_lines)

theme_dir = LOCATION / "dff_sphinx_theme/static"
theme_files = [str(path.relative_to(LOCATION / "dff_sphinx_theme")) for path in theme_dir.rglob('./*/*')]

reqs_file = LOCATION / "requirements.txt"
reqs_lines = [line.strip() for line in reqs_file.open().readlines()]
requirements = [line for line in reqs_lines if line and not line.startswith("#")]

demo_reqs_file = LOCATION / "demo/requirements.txt"
demo_reqs_lines = [line.strip() for line in demo_reqs_file.open().readlines()]
demo_requirements = [line for line in demo_reqs_lines if line and not line.startswith("#")]


setup(
    name='dff_sphinx_theme',
    version="0.1.14",
    author='Alexander Sergeev',
    author_email='shveitsar215@gmail.com',
    url="https://github.com/deeppavlov/dff_sphinx_theme",
    docs_url="https://github.com/deeppavlov/dff_sphinx_theme",
    description=description,
    python_requires=">=3.6, <4",
    long_description=long_description,
    long_description_content_type="text/markdown",
    py_modules=[
        'dff_sphinx_theme'
    ],
    packages=[
        'dff_sphinx_theme', 'dff_sphinx_theme.extras'
    ],
    include_package_data=True,
    zip_safe=False,
    package_data={
        'dff_sphinx_theme': [
            'theme.conf',
            '*.html',
            'theme_variables.jinja',
            *theme_files
        ]
    },
    entry_points={
        'sphinx.html_themes': [
            'dff_sphinx_theme = dff_sphinx_theme',
        ]
    },
    license='MIT License',
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Internet",
        "Topic :: Software Development :: Documentation",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3 :: Only"
    ],
    install_requires=requirements,
    tests_require=demo_requirements
)
