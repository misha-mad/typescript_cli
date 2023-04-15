import {AccessoryProduct} from './accessory-product'
import {ClothingProduct} from './clothing-product'
import {Color} from './color'
import {ProductParams} from './product-params'
import {Size} from './size'

export namespace ProductNamespace {
  export type Product = AccessoryProduct | ClothingProduct
  export type Params = ProductParams
  export type ColorType = Color
  export type SizeType = Size
}
