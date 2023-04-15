import {Database} from 'sqlite'
import {Database as Sqlite3Database, Statement} from 'sqlite3'
import {Color} from './color'
import {Size} from './size'

export type ProductParams = {
  categoryId: string | undefined
  color: Color | undefined
  database: Database<Sqlite3Database, Statement>
  price: number | undefined
  productName: string | undefined
  size: Size | undefined
}
