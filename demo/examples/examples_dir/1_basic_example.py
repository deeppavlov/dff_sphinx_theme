# %% [markdown]
"""
# Basic Example
The following example shows basic usage examples
"""


# %%
import os


# %% [markdown]
"""
The example prints current directory (`getchwd`).
"""


# %%
def some_function():
    print(os.getcwd())


# %%
if __name__ == "__main__":
    print("Current working directory:")
    some_function()
