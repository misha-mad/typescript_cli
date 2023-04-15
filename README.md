# Advanced TypeScript - education course for mad

We are going to create CLI tool for managing a catalog of products. 
The catalog will be hosted on the local computer in SQLite DB, so there will be no server-client interaction. 
All the operations over the catalog will be performed using Ink — React-based tool for building modern CLI interactions.

## Commands
| Name                     | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `catalog`                | Main command                                                                |
| `--help`                 | Call of the script output white text "This is a product catalog software ©" |
| `--version`              | Call of output the version from package.json.                               |
| `catalog init`           | Initializing a database                                                     |
| `catalog drop`           | Drops a database                                                            |
| `catalog category add`   | Adds a new product category                                                 |
| `catalog product add`    | Adds a new product                                                          |
| `catalog product edit`   | Edits a product item                                                        |
| `catalog product delete` | Deletes a product item                                                      |

## Flags
| Name       | Description |
|------------|-------------|
| parentId   |             |
| name       |             |
| color      |             |
| size       |             |
| categoryId |             |
| price      |             |
| productId  |             |
