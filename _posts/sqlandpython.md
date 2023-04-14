---
title: Connecting SQL with Python
tags:
  - Tech
  - Python
  - Database
  - SQL
date: '2023-04-14T10:35:07.322Z'
---

A great deal of data flexibility is made available through MongoDB's aggregations. 

When it comes to SQL, that same ability to query and combine data is a first-class process by nature of the language itself. 

Combine that with a scripting language like python, and the possibilities continue to open up!

Here are the basics to getting started with passing SQL queries in from Python.

# Setting Up

A bit of installing needs to be done first:

- You may need to `pip install mysqlclient` so that the ORM can pick up your mysql config.
- You may also need to download mysql through homebrew.
- Lastly, I think it's helpful to have the [MySQL workbench GUI](https://dev.mysql.com/doc/workbench/en/).

To setup mysql on the command line after install, you'll want to login with this command:

```
$ mysql -u root -p
```

Leaving the password flag blank by default on first login, though this can be changed later.

# SQLAlchemy & MySQL Workbench

[SQLAlchemy](https://www.sqlalchemy.org/) will be the ORM of choice for this post. There are other great options, though I personally chose this because it has first class support in the Pandas [method `DataFrame.to_sql()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_sql.html). 

The nice thing about using an ORM is you have access to methods that simplify queries down to a single call. 

```
#Equivalent to 'SELECT * FROM schools'
query = db.select([schools]) 
```

Sometimes, though, you have to open up the hood and write more intricate queries yourself.

# Writing the Script

Ok! The fun part begins!

In an environment variable, set your connection url:

```
mysql+mysqldb://root:PASSWORD@localhost/DBNAME
```

Above I've already created a DB, so I'm skipping that step here. You can programmatically do this through Python and the steps looking similar to `create_db_connection` below.

We'll pass that url into our `create_db_connection` method:

```
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from sqlalchemy.orm import Session

def create_db_connection(url):
  connection = None
  try:
    connection = create_engine(url)
    print("MySQL Database Connection Successful 👍")
  except Error as err:
    print(f"Error: '{err}'")
  
  return connection
```

While we're at it, let's write our method for executing a query and reading a result:

```
def execute_query(connection, query):
  try:
    with connection.connect() as session:
      session.execute(query)
      print('Query Successful')
  except Error as err:
      print(f"Error: '{err}")

def read_query(connection, query):
  result = None
  try:
      with connection.connect() as session:
        result = session.execute(query)
        return result
  except Error as err:
      print(f"Error: '{err}'")
```

If you'd like to pass in values dynamically, you can use the text module. Here's an example form [this article](https://chartio.com/resources/tutorials/how-to-execute-raw-sql-in-sqlalchemy/):

```
from sqlalchemy.sql import text
with engine.connect() as con:

    data = ( { "id": 1, "title": "The Hobbit", "primary_author": "Tolkien" },
             { "id": 2, "title": "The Silmarillion", "primary_author": "Tolkien" },
    )

    statement = text("""INSERT INTO book(id, title, primary_author) VALUES(:id, :title, :primary_author)""")

    for line in data:
        con.execute(statement, **line)
```

For us, though, a raw string works just as well:

```
pop_client = """
INSERT INTO client VALUES
(101, 'Starbucks', '123 Cool St., Dallas TX', 'Fast Food'),
(102, 'Cava', '27 Yum Dr., Austin TX', 'Lunch'),
(103, 'Flavor Town',  '20 W Good Food Lane, Houston TX', 'Dine In'),
"""
```

One reason to use MySQL workbench here is that it's WAY easier to debug through their console than to do it within our Python program. So, as you're writing queries, I would recommend giving them a whirl in the GUI first. 

After confirming the above insert works in the GUI, you can clear it by truncating the table:

```
TRUNCATE TABLE client
```

From here, it's as easy as calling our methods:

```
connection = create_db_connection(url)

q1 = text("""
SELECT *
FROM client;
""")

execute_query(connection, pop_client)
results_first = read_query(connection, q1)

for row in results_first:
  print(row)
```

Reading and writing, done! From here, the only limits are your SQL savvy and your python chops.  