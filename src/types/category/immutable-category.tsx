import {Category} from 'types/category/category'
import {ImmutableFields} from '../common/immutable-fields'

export type ImmutableCategory = ImmutableFields<Category, 'id' | 'categoryId'>
