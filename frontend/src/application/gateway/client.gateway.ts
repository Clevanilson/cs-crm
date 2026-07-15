import type { ClientReqDto } from '@/domain/dto/client-req.dto'
import type { ClientResDto } from '@/domain/dto/client-res.dto'
import type { IdResDto } from '@/domain/dto/id-res.dto'

export interface ClientGateway {
  list(): Promise<ClientResDto[]>
  create(client: ClientReqDto): Promise<IdResDto>
}
