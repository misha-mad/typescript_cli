import {ImmutableCategory} from './immutable-category'

export type GenericCategoryReturn<T> = T extends string ? ImmutableCategory & {categoryName: string} : ImmutableCategory
