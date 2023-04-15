import {ProductNamespace} from '../types'
import {throwIf} from './common/helpers'

// eslint-disable-next-line complexity -- temporary turn off the complexity eslint rule
export const editProduct = async (params: {productId: string | undefined} & ProductNamespace.Params) => {
  let result: ProductNamespace.Product | null = null
  let product

  if (params.productId) {
    try {
      product = await params.database.get(`SELECT * FROM Product WHERE id = "${params.productId}"`)
      throwIf({condition: !product?.id, errorMessage: 'There is no such product'})
    } catch (error) {
      return {result, error: error.message}
    }
  } else {
    return {result, error: 'Please enter the product id'}
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
  if (params.productName) {
    try {
      throwIf({
        condition: !!params.productName && params.productName.length < 2,
        errorMessage: 'Product name is too short',
      })
    } catch (error) {
      return {result, error: error.message}
    }
  }

  // Update the product
  try {
    await params.database.run(
      'UPDATE Product SET name = $name, categoryId = $categoryId, color = $color, size = $size, price = $price WHERE id = $productId',
      {
        $name: params.productName || product.name,
        $categoryId: params.categoryId || product.categoryId,
        $color: params.color || product.color,
        $size: params.size || product.size,
        $price: params.price || product.price,
        $productId: params.productId,
      },
    )

    result = await params.database.all(`SELECT * FROM Product WHERE id = "${params.productId}"`)
  } catch (error) {
    return {result, error: error.message}
  }

  return {result, error: null}
}
