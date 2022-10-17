"""
This is some file in gallery
============================
"""

# TODO: remove & replace as soon as https://github.com/c4urself/bump2version/pull/209 is merged!

import configparser
config = configparser.ConfigParser()

config.read('../../../setup.cfg')
print(config['bumpversion']['current_version'])
