import {Database} from 'sqlite'
import {Database as Sqlite3Database, Statement} from 'sqlite3'
import {CategoryNamespace} from 'types'
import {v4 as uuid} from 'uuid'
import {throwIf} from './common/helpers'

export const addCategory = async (
  database: Database<Sqlite3Database, Statement>,
  parentId: string | undefined,
  categoryName: string | undefined,
) => {
  let result: CategoryNamespace.GenericCategory<typeof parentId> | null = null
  let parentCategory: CategoryNamespace.ImmutableCategoryType | undefined = undefined
  let categoryArray: Array<CategoryNamespace.ImmutableCategoryType> | undefined = undefined

  // category name validation
  try {
    throwIf({condition: !categoryName, errorMessage: 'The category name is missing'})
    throwIf({condition: !!categoryName && categoryName.length < 2, errorMessage: 'Category name is too short'})
  } catch (error) {
    return {result, error: error.message}
  }

  if (parentId) {
    // insert into catalog with parent ID
    try {
      parentCategory = await database.get(`SELECT * FROM Catalog WHERE id = "${parentId}"`)
      categoryArray = await database.all(`SELECT * FROM Catalog WHERE categoryId = "${parentId}"`)
      throwIf({condition: !parentCategory?.id, errorMessage: 'There is no such parent category'})

      if (categoryArray && categoryArray.length) {
        const isDuplicate = Boolean(await categoryArray.find((category) => String(category.name) === categoryName))
        throwIf({condition: isDuplicate, errorMessage: 'A category with that name already exists'})
      }

      await database.exec(
        `INSERT INTO Catalog(id, name, categoryId) VALUES ("${uuid()}", "${categoryName}", "${parentId}");`,
      )

      let addedCategory: CategoryNamespace.GenericCategory<typeof parentId> = (
        await database.all(`SELECT * FROM Catalog WHERE categoryId = "${parentId}"`)
      )?.find((category) => category.name === categoryName)

      addedCategory.categoryName = parentCategory!.name
      result = addedCategory
    } catch (error) {
      return {result, error: error.message}
    }
  } else {
    // insert into catalog without parent ID
    try {
      await database.exec(`INSERT INTO Catalog(id, name) VALUES ("${uuid()}", "${categoryName}");`)
      result = await database.all(`SELECT * FROM Catalog WHERE name = "${categoryName}"`)
    } catch (error) {
      return {result, error: error.message}
    }
  }

  return {result, error: null}
}
