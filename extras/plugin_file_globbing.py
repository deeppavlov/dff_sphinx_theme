import os
import shutil
import sys
from pathlib import Path
from typing import List, Tuple, cast


def sphinx_gallery_find_example_and_build_dirs(dest: str, *sources: str) -> Tuple[List[str], List[str]]:
    destination = Path(dest)
    shutil.rmtree(destination, ignore_errors=True)

    examples_paths = [Path(source) for source in sources]
    auto_examples_paths = [destination / example.name for example in examples_paths]

    examples_pairs = [(e, ae) for e, ae in zip(examples_paths, auto_examples_paths) if e.exists() and e.is_dir()]
    for example, auto_example in examples_pairs:
        auto_example.mkdir(parents=True, exist_ok=True)

    examples = tuple(map(list, zip(*[[str(e.resolve()), str(ae.resolve())] for e, ae in examples_pairs])))
    return cast(Tuple[List[str], List[str]], examples if len(examples) == 2 else ([], []))


def sphinx_gallery_add_source_dirs_to_path(*paths: str):
    for module in paths:
        sys.path.append(os.path.abspath(module))
