export const throwIf = (params: {condition: boolean, errorMessage: string}) => {
  if(params.condition) {
    throw new Error(params.errorMessage)
  }
}
