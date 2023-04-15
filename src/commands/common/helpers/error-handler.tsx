import {Dispatch, SetStateAction} from 'react'

export const errorHandler = (error: unknown, setErrorMessage: Dispatch<SetStateAction<string>>) => {
  if (error instanceof Error) {
    return setErrorMessage(error.message)
  }

  return setErrorMessage('Something went wrong')
}
