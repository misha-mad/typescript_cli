#!/usr/bin/env ts-node
import {Box, render, Text} from 'ink'
import Table from 'ink-table'
import meow from 'meow'
import {memo, useCallback, useEffect, useState} from 'react'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import {addCategory, addProduct, deleteProduct, drop, editProduct, init} from './commands'
import {CategoryNamespace, ProductNamespace} from './types'

enum Commands {
  add = 'add',
  catalog = 'catalog',
  category = 'category',
  delete = 'delete',
  dropDataBase = 'drop',
  edit = 'edit',
  initialize = 'init',
  product = 'product',
}

const cli = meow('This is a product catalog software ©', {
  flags: {
    help: {alias: 'h', type: 'boolean'},
    version: {alias: 'v', type: 'boolean'},
    parentId: {alias: 'pid', type: 'string'},
    name: {alias: 'n', type: 'string'},
    color: {alias: 'c', type: 'string'},
    size: {alias: 's', type: 'string'},
    categoryId: {alias: 'cid', type: 'string'},
    price: {alias: 'p', type: 'number'},
    productId: {alias: 'prid', type: 'string'},
  }
})

type CategoryReturn = CategoryNamespace.GenericCategory<typeof cli.flags.parentId>

export const App = memo(() => {
  const [errorMessage, setErrorMessage] = useState('')
  const [tableData, setTableData] = useState<Array<CategoryReturn> | undefined>(undefined)

  const initDatabase = useCallback(
    async () =>
      await open({
        driver: sqlite3.Database,
        filename: 'src/database/database.db',
      }),
    [],
  )

  const runCommand = useCallback(async () => {
    const database = await initDatabase()
    let result

    if (cli.input[0] === Commands.initialize) {
      await init(database, setErrorMessage)
    }

    if (cli.input[0] === Commands.dropDataBase) {
      await drop(database, setErrorMessage)
    }

    if (cli.input[0] === Commands.category && cli.input[1] === Commands.add) {
      result = await addCategory(database, cli.flags.parentId, cli.flags.name)
    }

    if (cli.input[0] === Commands.product && cli.input[1] === Commands.add) {
      result = await addProduct({
        categoryId: cli.flags.categoryId,
        color: cli.flags.color as ProductNamespace.ColorType,
        database,
        price: cli.flags.price,
        productName: cli.flags.name,
        size: cli.flags.size as ProductNamespace.SizeType,
      })
    }

    if (cli.input[0] === Commands.product && cli.input[1] === Commands.edit) {
      result = await editProduct({
        productId: cli.flags.productId,
        categoryId: cli.flags.categoryId,
        color: cli.flags.color as ProductNamespace.ColorType,
        database,
        price: cli.flags.price,
        productName: cli.flags.name,
        size: cli.flags.size as ProductNamespace.SizeType,
      })
    }

    if (cli.input[0] === Commands.product && cli.input[1] === Commands.delete) {
      result = await deleteProduct({
        productId: cli.flags.productId,
        database,
      })
    }

    if (result?.error) {
      setErrorMessage(result.error)
    }

    if (result?.result) {
      setTableData(Array.isArray(result.result) ? result.result : [result.result])
    }
  }, [initDatabase])

  // Run tables initialization when flags equal 'init' or run tables drop if flag equal 'drop'
  useEffect(() => {
    runCommand()
  }, [runCommand])

  return (
    <Box justifyContent="center">
      <Text>
        {cli.flags.help && 'This is a product catalog software ©'}
        {cli.flags.version && cli.pkg.version}
        {!errorMessage && cli.input[0] === Commands.dropDataBase && 'Database successfully dropped'}
        {!errorMessage && cli.input[0] === Commands.initialize && 'Database successfully initialized'}
      </Text>

      <Text color="red" italic>
        {errorMessage}
      </Text>

      {tableData && <Table data={tableData} />}
    </Box>
  )
})

render(<App />)
