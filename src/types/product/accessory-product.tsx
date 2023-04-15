import {Color} from './color'

export type AccessoryProduct = {
  id: string
  name: `[ACCESSORY]${string}`
  categoryId: string
  color: Color
  price: number
}
