import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/api/data')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
