interface ISuccess<T> {
    value: T,
    success: true
}

interface IFailure<E> {
    error: E,
    success: false

}




export const Succes = <T>(value: T): ISuccess<T> => ({
    success: true,
    value
})


export const Failure = <E>(error:E): IFailure<E> => ({
    error,
    success:false
})


export type ResultResponse<T,E> = ReturnType<typeof Succes<T>> | ReturnType<typeof Failure<E>>