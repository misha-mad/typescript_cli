import {ProductNamespace} from 'types'
import {ImmutableFields} from 'types/common/immutable-fields'

export type ImmutableProduct = ImmutableFields<ProductNamespace.Product, 'id' | 'categoryId'>
