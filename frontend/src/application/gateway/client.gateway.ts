import type { ClientReqDTO } from '@/domain/dto/client-req.dto'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import type { IdResDTO } from '@/domain/dto/id-res.dto'
import type { OutputWithPaginationDTO } from '@/domain/dto/output-with-pagination'
import type { PaginationReqDTO } from '@/domain/dto/pagination-req.dto'

export interface ClientGateway {
  list(params?: PaginationReqDTO): Promise<OutputWithPaginationDTO<ClientResDTO>>
  create(client: ClientReqDTO): Promise<IdResDTO>
}
