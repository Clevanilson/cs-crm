import type { ClientGateway } from '@/application/gateway/client.gateway'
import type { ClientReqDTO } from '@/domain/dto/client-req.dto'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import type { IdResDTO } from '@/domain/dto/id-res.dto'
import type { ListClientsReqDTO } from '@/domain/dto/list-clients-req.dto'
import type { OutputWithPaginationDTO } from '@/domain/dto/output-with-pagination'
import type { HttpClient } from '@/http/http-client'

export class ClientHttpGateway implements ClientGateway {
  private readonly baseUrl = 'api/clients'

  constructor(private readonly http: HttpClient) {}

  async list(query: ListClientsReqDTO): Promise<OutputWithPaginationDTO<ClientResDTO>> {
    return this.http.get(this.baseUrl, { query })
  }

  async create(client: ClientReqDTO): Promise<IdResDTO> {
    return this.http.post(this.baseUrl, client)
  }
}
