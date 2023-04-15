import {Size} from './size'

export type ClothingProduct = {
  id: string
  name: `[CLOTHING]${string}`
  categoryId: string
  size: Size
  price: number
}
