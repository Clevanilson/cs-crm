import type { ClientReqDTO } from '@/domain/dto/client-req.dto'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import type { IdResDTO } from '@/domain/dto/id-res.dto'
import type { ListClientsReqDTO } from '@/domain/dto/list-clients-req.dto'
import type { OutputWithPaginationDTO } from '@/domain/dto/output-with-pagination'

export interface ClientGateway {
  list(params?: ListClientsReqDTO): Promise<OutputWithPaginationDTO<ClientResDTO>>
  create(client: ClientReqDTO): Promise<IdResDTO>
}
