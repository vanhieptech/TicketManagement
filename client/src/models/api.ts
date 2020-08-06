export interface IResp {
  code: number
  status: string
  success: boolean
  results: any,
  message: any
}

export interface IQuery {
  pageSize: number,
  pageIndex: number,
  sort: string,
  filter: object
}
