import type { PaginationResDTO } from '../dto/pagination-res.dto'

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_PAGINATION: PaginationResDTO = {
  total: 0,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
}
