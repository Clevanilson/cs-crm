import type { ClientGateway } from '@/application/gateway/client.gateway'
import type { ClientReqDto } from '@/domain/dto/client-req.dto'
import type { ClientResDto } from '@/domain/dto/client-res.dto'
import type { IdResDto } from '@/domain/dto/id-res.dto'
import type { HttpClient } from '@/http/http-client'

export class ClientHttpGateway implements ClientGateway {
  private readonly baseUrl = 'api/clients'

  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ClientResDto[]> {
    return this.http.get<ClientResDto[]>(this.baseUrl)
  }

  async create(client: ClientReqDto): Promise<IdResDto> {
    return this.http.post<IdResDto>(this.baseUrl, client)
  }
}
