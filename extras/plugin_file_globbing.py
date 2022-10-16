import fnmatch
import glob
import os
import shutil
import sys
from pathlib import Path
from typing import Iterable, List, Tuple, cast


def _fnmatchcase_any(filename: str, patterns: Iterable[str]) -> bool:
    return any([fnmatch.fnmatchcase(filename, pattern) for pattern in patterns])


def _get_packages(path: str) -> List[str]:
    work_dir = Path(path)
    exception_dirs = [".", "..", "*.egg-info", "__pycache__"]
    return [str(f.resolve()) for f in work_dir.glob('*') if f.is_dir() and not _fnmatchcase_any(f.name, exception_dirs)]


def sphinx_gallery_find_example_and_build_dirs(path: str) -> Tuple[List[str], List[str]]:
    packages = _get_packages(path)
    examples_paths = [Path(f'{package}/examples') for package in packages]
    auto_examples_paths = [Path(f'{package}/docs/examples') for package in packages]

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
