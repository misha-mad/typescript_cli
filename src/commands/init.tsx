import {Dispatch, SetStateAction} from 'react'
import {Database} from 'sqlite'
import {Database as Sqlite3Database, Statement} from 'sqlite3'
import {errorHandler} from './common/helpers'

export const init = async (
  database: Database<Sqlite3Database, Statement>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
) => {
  try {
    await database.exec(
      'CREATE TABLE IF NOT EXISTS Catalog (' +
        'id             UUID     PRIMARY KEY    NOT NULL, ' +
        'name           STRING                  NOT NULL, ' +
        'categoryId     UUID                              ' +
        ')',
    )

    await database.exec(
      'CREATE TABLE IF NOT EXISTS ColorType (' +
        'Type     STRING      PRIMARY KEY      NOT NULL, ' +
        'Seq      INTEGER                      NOT NULL  ' +
        ')',
    )

    await database.exec(
      'CREATE TABLE IF NOT EXISTS SizeType (' +
        'Type      CHAR(1)       PRIMARY KEY      NOT NULL, ' +
        'Seq       INTEGER                        NOT NULL  ' +
        ')',
    )

    await database.exec(
      'INSERT INTO ColorType(Type, Seq) VALUES ' + '("red",   1), ' + '("green", 2), ' + '("blue",  3);',
    )

    await database.exec('INSERT INTO SizeType(Type, Seq) VALUES ' + '("s", 1), ' + '("m", 2), ' + '("x", 3);')

    await database.exec(
      'CREATE TABLE IF NOT EXISTS Product (' +
        ' id           UUID     PRIMARY KEY     NOT NULL,' +
        ' name         STRING                   NOT NULL,' +
        ' categoryId   UUID                     NULL,    ' +
        ' color        STRING                   NULL     REFERENCES ColorType(Type),' +
        ' size         CHAR(1)                  NULL     REFERENCES SizeType(Type),' +
        ' price        NUMBER                   NOT NULL' +
        ')',
    )
  } catch (error) {
    errorHandler(error, setErrorMessage)
  }
}
