import {v4 as uuid} from 'uuid'
import {CategoryNamespace, ProductNamespace} from '../types'
import {throwIf} from './common/helpers'

// eslint-disable-next-line complexity -- temporary turn off the complexity eslint rule
export const addProduct = async (params: ProductNamespace.Params) => {
  let result: ProductNamespace.Product | null = null
  let category: CategoryNamespace.ImmutableCategoryType | undefined

  // The category-id must refer to the existing category if presented
  if (params.categoryId) {
    try {
      category = await params.database.get(`SELECT * FROM Catalog WHERE id = "${params.categoryId}"`)
      throwIf({condition: !category?.id, errorMessage: 'There is no such category'})
    } catch (error) {
      return {result, error: error.message}
    }
  }

  // The color must be one of the enumeration values
  if (params.color) {
    try {
      throwIf({
        condition: params.color !== 'red' && params.color !== 'green' && params.color !== 'blue',
        errorMessage: 'Please select a different color',
      })
    } catch (error) {
      return {result, error: error.message}
    }
  }

  // Product name validation
  try {
    throwIf({condition: !params.productName, errorMessage: 'The product name is missing'})

    throwIf({
      condition: !!params.productName && params.productName.length < 2,
      errorMessage: 'Product name is too short',
    })
  } catch (error) {
    return {result, error: error.message}
  }

  // Price validation
  try {
    throwIf({condition: !params.price, errorMessage: 'Price is missing'})
  } catch (error) {
    return {result, error: error.message}
  }

  try {
    if (params.categoryId) {
      const productArray = await params.database.all(`SELECT * FROM Product WHERE categoryId = "${params.categoryId}"`)

      // Product name must be unique to all products in the category
      if (productArray && productArray.length) {
        const isDuplicate = Boolean(await productArray.find((product) => String(product.name) === params.productName))
        throwIf({condition: isDuplicate, errorMessage: 'A product with that name from that category already exists'})
      }
    } else {
      const productDuplicate = await params.database.all(`SELECT * FROM Product WHERE name = "${params.productName}"`)
      throwIf({condition: productDuplicate.length > 0, errorMessage: 'A product with that name already exists'})
    }
  } catch (error) {
    return {result, error: error.message}
  }

  // Insert into catalog
  try {
    await params.database.exec(
      `INSERT INTO Product(id, name, categoryId, color, size, price) VALUES ("${uuid()}", "${params.productName}", "${
        params.categoryId ?? null
      }", "${params.color ?? null}", "${params.size ?? null}", "${params.price}");`,
    )

    result = await params.database.all(`SELECT * FROM Product WHERE name = "${params.productName}"`)
  } catch (error) {
    return {result, error: error.message}
  }

  return {result, error: null}
}
