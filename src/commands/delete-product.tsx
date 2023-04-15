import {Database} from 'sqlite'
import {Database as Sqlite3Database, Statement} from 'sqlite3'
import {ProductNamespace} from '../types'
import {throwIf} from './common/helpers'

export const deleteProduct = async (params: {
  database: Database<Sqlite3Database, Statement>
  productId: string | undefined
}) => {
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

  // Delete product
  try {
    await params.database.run('DELETE FROM Product WHERE id = $productId', {
      $productId: params.productId,
    })

    result = product
  } catch (error) {
    return {result, error: error.message}
  }

  return {result, error: null}
}
