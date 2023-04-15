import {Dispatch, SetStateAction} from 'react'
import {Database} from 'sqlite'
import {Database as Sqlite3Database, Statement} from 'sqlite3'
import {errorHandler} from './common/helpers'

export const drop = async (
  database: Database<Sqlite3Database, Statement>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
) => {
  try {
    await database.get('SELECT name FROM sqlite_master WHERE type="table" AND name="Catalog"', (error: unknown) => {
      errorHandler(error, setErrorMessage)
    })

    await database.exec(
      'DROP TABLE IF EXISTS Catalog; ' +
        'DROP TABLE IF EXISTS ColorType; ' +
        'DROP TABLE IF EXISTS SizeType; ' +
        'DROP TABLE IF EXISTS Product;',
    )
  } catch (error) {
    errorHandler(error, setErrorMessage)
  }
}
