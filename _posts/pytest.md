---
title: Testing with Pytest
tags:
  - Tech
  - Python
date: '2023-06-23T10:35:07.322Z'
---

A quick start guide:

1. [Install Pytest](https://docs.pytest.org/en/7.1.x/getting-started.html) through pip.
2. When running your tests, call it through the command line:

```
python3.7 -m pytest .
```

There's documentation for calling it globally, but I had no luck. Calling it through the same version of python with the `-m` flag did the trick for me.

3. Write your test file!

```
import pytest

@pytest.fixture(scope='class')
def my_tests_init(request):
	# Set up DB connection here
	
	try:
		# Insert any sample date
	except Exception as e:
		# Handle exceptions

	yield # Your tests will happen here

	# Tear down: remove sample data from db.
	# Close DB
```

Pytest will use decorators to add in the functionality needed to interpret your file correctly. 

All your tests will live in a class like this one:

```
@pytest.mark.usefixtures("my_tests_init")
class TestMyClass:

	def test_my_method(self):
		expected = [{'cool': True}]

		result = self.my_class.my_method()
		assert result == expected

```

Here, the decorator ensures the the init method runs before and after these tests.

From there, test methods must start with "test" in the method name.

And you do your thing from there!

Pytest, unlike testing libraries like unittest or Jest in JS, doesn't use assertion methods. Here we just have the `assert` keyword being used against a boolean expression. Even if we use a reference type, Pytest will know to assert the values of the dictionary or list deeply.

Additionally: If you're not finding what you need from the command line error logs, adding the `v` flag will give you a closer look, while `vv` gives you even more details. `vv` Goes as far to show a git-like comparison, line by line, of what conflicts between your expected and actual results!

