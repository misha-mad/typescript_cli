import {Category} from 'types/category/category'
import {ImmutableFields} from 'types'

export type ImmutableCategory = ImmutableFields<Category, 'id' | 'categoryId'>
