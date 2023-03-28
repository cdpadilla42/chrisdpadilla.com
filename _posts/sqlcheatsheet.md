---
title: SQL Cheat Sheet
tags:
  - Tech
  - SQL
  - Database
date: '2023-03-28T10:35:07.322Z'
---

I've been picking up SQL! I wanted to take my MongoDB experience and see what some of that database querying would look like in the world's most popular database querying language.

Not a very narrative write up, but maybe some of these will help pull back the curtain on what SQL looks like!

Notes are courtesy of [this introduction to MySQL](https://youtu.be/7S_tz1z_5bA).

## Arithmetic

When selecting, you can do arithmetic on integers. You can also give them alias's with the AS clause:

```
USE sql_store;

SELECT
	first_name,
    last_name,
    points,
    points * 10 + 100 AS "discount factor"
FROM customers
-- WHERE state = 'FL'
ORDER BY first_name
```

You can edit the data returned and apply the changes. Neat!

`SELECT DISTINCT state` returns only the unique values with no repeating values

```
USE sql_store;

SELECT name, unit_price, ROUND(unit_price * 1.1, 2) AS "New Price"
FROM products
```

`<>` is the same as `!=`

single or double quotes work.

not case sensitive with strings.

## Query by date

```
USE sql_store;

SELECT *
FROM orders
WHERE YEAR(order_date) >= YEAR(CURDATE()) - 5
```

Order of ops in logic operators:

AND goes first. then OR

IN and NOT

```
USE sql_store;

SELECT *
FROM Customers
WHERE birth_date > '1990-01-01' OR points > 1000 AND
	state NOT IN ('VA', 'GA', 'FL')
```

BETWEEN

```
USE sql_store;

SELECT *
FROM customers
WHERE birth_date BETWEEN '1990-01-01' AND '2000-01-01'
```

LIKE operator

```
USE sql_store;

SELECT *
FROM customers
WHERE last_name LIKE 'b__y'
-- % any number of characters
-- _ single character
```

```
USE sql_store;

SELECT *
FROM customers
WHERE phone LIKE '___-___-___9' AND
	address LIKE '%Trail' OR
    address LIKE '%Avenue'
```

## REGEXP

Special characters:

- ^ beginning
- $ end
- | logical or
- [abcd] match one of these values for one character
- [a-z] match within range for one character

```
USE sql_store;

SELECT *
FROM customers
WHERE last_name REGEXP 'b[ru]'
```

## IS NULL

```
USE sql_store;

SELECT *
FROM orders
WHERE shipped_date IS NULL
```

## Joins

Inner Join: The basic. We're starting from orders and we're pulling in the other table

```
USE sql_store;

SELECT order_id, first_name, last_name, o.customer_id
FROM orders o
JOIN customers c
	ON o.customer_id = c.customer_id
```

We're also giving an alias to orders and customers as `o` and `c`. Nice!

Another example:

```
USE sql_store;

SELECT order_id, p.product_id, name, quantity, p.unit_price
FROM order_items oi
JOIN products p
	ON oi.product_id = p.product_id

```

## Join across DB's

Not hard...

```
USE sql_store;

SELECT *
FROM order_items oi
JOIN sql_inventory.products p
	ON oi.product_id = p.product_id

```

## Self Join

```
USE sql_hr;

SELECT e.first_name, e.last_name, m.first_name as manager_first_name, m.last_name as manager_last_name
FROM employees e
JOIN employees m
	ON e.reports_to = m.employee_id

```

## Joining Multiple Tables

```
USE sql_store;

SELECT *
FROM orders o
JOIN customers c
	on c.customer_id = o.customer_id
JOIN order_statuses os
	ON os.order_status_id = o.status

```

Great visual explanation of Inner and outer joins, with the ven diagram visual. √

[Inner and Outer Joins SQL Examples and the Join Block](http://www.datamartist.com/sql-inner-join-left-outer-join-full-outer-join-examples-with-syntax-for-sql-server)

[Another ref for table joins](https://www.scaler.com/topics/inner-join-vs-outer-join/)

Inner join - You're getting only the intersections between the tables

Outer joins - you are including one full table plus the intersecting data.
A left join includes all the customers, along with their order details.
A right join gets the same result as the inner join if you're selected table is the left one.

```
USE sql_invoicing;

SELECT
	pm.name as payment_method,
   c.name as client_name,
   date,
   amount
FROM payments p
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id
JOIN clients c
	ON p.client_id = c.client_id

```

## Compound Join Conditions

`order_items` has a compound key. Meaning, the unique identifier here is not a single id, but is in fact the combination of two id's from other tables.

Why not use a unique id here? Are there benefits to that? Shouldn't all tables have unique ids?

Well, regardless, here's how you handle it:

```
SELECT *
FROM order_items oi
```

## Implicit Join

```
SELECT *
FROM orders o, customers c
WHERE o.customer_id = c.customer_id
```

Same as what we've been writing above. Not recommended, because leaving out will return a cross join.

## Outer Joins

```
SELECT
	c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
LEFT JOIN orders o
	ON c.customer_id = o.customer_id
ORDER BY c.customer_id

```

```
SELECT
	c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
RIGHT JOIN orders o
	ON c.customer_id = o.customer_id
ORDER BY o.order_id

```

```
SELECT
	oi.product_id,
    name,
    oi.quantity
FROM products p
LEFT JOIN order_items oi
	ON oi.product_id = p.product_id
```

Multiple tables:

```
USE sql_store;

SELECT
	c.customer_id,
    c.first_name,
    o.order_id,
    sh.name as shipper
FROM customers c
LEFT JOIN orders o
	ON o.customer_id = c.customer_id
LEFT JOIN shippers sh
	ON o.shipper_id = sh.shipper_id

```

Note: Avoid right joins. Right joining can lead to complex, hard to understand queries.

```
SELECT
	o.order_date,
    o.order_id,
    c.first_name,
    s.name,
    os.name as order_status
FROM orders o
JOIN customers c
	ON o.customer_id = c.customer_id
LEFT JOIN shippers s
	ON o.shipper_id = s.shipper_id
JOIN order_statuses os
	ON o.status = os.order_status_id
ORDER BY order_status, o.order_id
```

## Self Outer Joins

```
SELECT *
FROM employees e
LEFT JOIN employees m
	ON e.reports_to = m.employee_id
```

In this case, this query will include the manager that we are requesting.

## USING

```
LEFT JOIN shippers sh
	ON o.shipper_id = sh.shipper_id

-- SAME AS

JOIN shipers
	USING (shipper_id)
```

Easier to write if the ids match!

Works for matching multiple columns, too

```
SELECT *
FROM order_items oi
JOIN orde_item_notes oin
	USING (order_id, product_id)
```

```
SELECT date, c.name as client, amount, pm.name as credit_card_name
FROM payments p
JOIN clients c
	USING (client_id)
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id

```

## Natural Joins

Easier to code, but not recommended.

Joins tables based on the columns that match.

```
SELECT *
FROM orders o
NATURAL JOIN customers c
```

## Cross Joins

Between two tables, shows all possible combinations for all rows in the two tables.

Colors:
red
blue
green

size:
s
m
l

Res:

red s
blue s
green s
red m
blue m
green m
etc...

```
SELECT *
FROM customers c, orders o
```

OR

```
SELECT *
FROM customers c
CROSS JOIN orders o
```

Prefer the explicit syntax

## Union

```
SELECT
	order_id,
    order_date,
    'Active' AS status
FROM orders
WHERE order_date >= '2019-01-01'
UNION
SELECT
	order_id,
    order_date,
    'Archived' AS status
FROM orders
WHERE order_date < '2019-01-01'
```

Can combine records from multiple queries!

Columns that you return should be equal. Otherwise, you will get an error. This will error:

```
SELECT first_name, last_name -- cause of the error
from customers
UNION
SELECT name -- only one column here
FROM shippers
```

## Inserting a Row

One way, if using all columns:

```
INSERT INTO customers
VALUES (
	DEFAULT,
    'Chris',
    'Padilla',
    '1922-01-01',
    DEFAULT,
    'address',
    'city',
    'TX',
	DEFAULT
)
```

If explicitly defining columns

```
INSERT INTO customers (
	first_name,
    last_name,
    birth_date,
    address,
    city,
    state
)
VALUES (
    'Chris',
    'Padilla',
    '1922-01-01',
    'address',
    'city',
    'TX'
)
```

## INSERTING multiple rows

```
INSERT INTO products (name)
VALUE ('Chris'),
	('Jenn')

```

## Inserting Hierarchical Rows

Parent > Child relationships. One parent can have multiple children...

1. Add a new order.
2. Insert based on the `LAST_INSERT_ID()`

```
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, '2023-03-27', 1);

INSERT INTO order_items
VALUES
	(LAST_INSERT_ID(), 1, 1, 2.00),
    (LAST_INSERT_ID(), 2, 1, 4.00)

```

## Copying a table...

```
CREATE TABLE orders_archived AS
SELECT * FROM orders -- Sub query - queries for use in another query
```

You have to set your primary key and AI column....

Using conditional select statement as a subquery

```
INSERT INTO orders_archived
SELECT *
FROM orders
WHERE order_date < '2019-01-01'
```

```
CREATE TABLE invoices_archive AS
SELECT
	i.invoice_id,
    c.name,
    i.invoice_total,
    i.payment_total,
    i.invoice_date,
    i.due_date,
    i.payment_date
FROM invoices i
JOIN clients c
	USING (client_id)
WHERE payment_date IS NOT NULL

```

## Updating a row

```
UPDATE invoices
SET payment_total = 10, payment_date = "2023-03-27"
WHERE invoice_id = 1

```

Using variables in your SET... you can use other fields to make updates like so:

```
UPDATE invoices
SET
	payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE invoice_id = 3

```

## Updating multiple rows

Uses the same syntax. MySQL specifically has a safe mode that prevents updating multiple rows. You can turn it off by unticking "Safe Updates" in the preferences. You may have to restart MySQL after The IN clause can be handy, too.

```
UPDATE invoices
SET
	payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE client_id IN (3, 4)

```

## Using Subqueries in an Update Statement

Fun fact - you can select part of your SQL doc to run a script

```
UPDATE invoices
SET
	payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE client_id =
	(SELECT client_id
	FROM clients
	WHERE name = 'Myworks')

```

Use the IN operator for multiple values:

```
UPDATE invoices
SET
	payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE client_id IN
	(SELECT client_id
	FROM clients
	WHERE state IN ('CA', 'NY'))
```

Good practice: Select your query BEFORE you run an update statement on your DB

```
UPDATE orders
SET comments = 'GOLD'
-- SELECT *
-- FROM orders
WHERE customer_id IN (
	SELECT customer_id
    FROM customers
    WHERE points >= 3000)

```

## Deleting Rows

```
DELETE FROM invoices
WHERE client_id = (
	SELECT client_id
	FROM clients
	WHERE name = 'Myworks'
)

```
