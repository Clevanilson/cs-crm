import type { ClientGateway } from '@/application/gateway/client.gateway'
import type { ClientReqDTO } from '@/domain/dto/client-req.dto'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import type { IdResDTO } from '@/domain/dto/id-res.dto'
import type { OutputWithPaginationDTO } from '@/domain/dto/output-with-pagination'
import type { PaginationReqDTO } from '@/domain/dto/pagination-req.dto'
import type { HttpClient, HttpOptions } from '@/http/http-client'

export class ClientHttpGateway implements ClientGateway {
  private readonly baseUrl = 'api/clients'

  constructor(private readonly http: HttpClient) {}

  async list(query: PaginationReqDTO): Promise<OutputWithPaginationDTO<ClientResDTO>> {
    return this.http.get(this.baseUrl, { query })
  }

  async create(client: ClientReqDTO): Promise<IdResDTO> {
    return this.http.post(this.baseUrl, client)
  }
}
