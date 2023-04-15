import {AccessoryProduct} from './accessory-product.js'
import {ClothingProduct} from './clothing-product.js'
import {Color} from './color.js'
import {ProductParams} from './product-params.js'
import {Size} from './size.js'

export namespace ProductNamespace {
  export type Product = AccessoryProduct | ClothingProduct
  export type Params = ProductParams
  export type ColorType = Color
  export type SizeType = Size
}
