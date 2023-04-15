export type ImmutableFields<T, K extends keyof T> = Readonly<Pick<T, K>> & Omit<T, K>
