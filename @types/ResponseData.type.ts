export type TDataRES = {
    results?:number,
    data?:unknown
}

export type TPaginateResults = {
    limit?:number
    currentPage?:number,
    totalResults?:number
    totalPages?:number
    next?:number | null,
    prev?:number | null
}