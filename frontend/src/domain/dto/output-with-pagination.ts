import type { PaginationResDTO } from './pagination-res.dto'

export type OutputWithPaginationDTO<T> = {
  data: T[]
  pagination: PaginationResDTO
}
