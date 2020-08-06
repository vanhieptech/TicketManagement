const IResp = {
    code: number,
    status: string,
    success: boolean,
    results: any,
    message: any,
};

const IQuery = {
    pageSize: number,
    pageIndex: number,
    sort: string,
    filter: object,
};
export { IResp, IQuery };