import fnmatch
import glob
import os
import shutil
import sys
from pathlib import Path
from typing import Iterable, List, Tuple, cast


def _fnmatchcase_any(filename: str, patterns: Iterable[str]) -> bool:
    return any([fnmatch.fnmatchcase(filename, pattern) for pattern in patterns])


def _get_packages(path: str) -> List[Path]:
    work_dir = Path(path)
    exception_dirs = [".", "..", "*.egg-info", "__pycache__"]
    return [f for f in work_dir.glob('*') if f.is_dir() and not _fnmatchcase_any(f.name, exception_dirs)]


def sphinx_gallery_find_example_and_build_dirs(source: str, dest: str) -> Tuple[List[str], List[str]]:
    destination = Path(dest)
    shutil.rmtree(destination, ignore_errors=True)

    examples_paths = _get_packages(source)
    auto_examples_paths = [destination / package.name for package in examples_paths]

    examples_pairs = [(e, ae) for e, ae in zip(examples_paths, auto_examples_paths) if e.exists() and e.is_dir()]
    for example, auto_example in examples_pairs:
        auto_example.mkdir(parents=True, exist_ok=True)
        for support_file in [file for file in example.glob(f'_*') if file.is_file()]:
            shutil.copy(support_file, auto_example)

    examples = tuple(map(list, zip(*[[str(e.resolve()), str(ae.resolve())] for e, ae in examples_pairs])))
    return cast(Tuple[List[str], List[str]], examples if len(examples) == 2 else ([], []))


def sphinx_gallery_add_source_dirs_to_path(path: str):
    sys.path.append(os.path.abspath(f'{path}/'))
    for module in glob.glob(f'{path}/*/'):
        sys.path.append(os.path.abspath(module))
