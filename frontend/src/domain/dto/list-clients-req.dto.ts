import type { PaginationReqDTO } from './pagination-req.dto'

export type ListClientsReqDTO = PaginationReqDTO & {
  name?: string
}
