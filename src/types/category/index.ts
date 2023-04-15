import {GenericCategoryReturn} from './generic-category'
import {ImmutableCategory} from './immutable-category'

export namespace CategoryNamespace {
  export type GenericCategory<T> = GenericCategoryReturn<T>
  export type ImmutableCategoryType = ImmutableCategory
}
