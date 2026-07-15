import { describe, it, expect, beforeEach } from 'vitest'
import { ClientHttpGateway } from './client-http.gateway'
import { HttpClientMock } from '@/http/http-client-mock'
import type { ClientResDto } from '@/domain/dto/client-res.dto'

describe(ClientHttpGateway.name, () => {
  let httpClient: HttpClientMock
  let sut: ClientHttpGateway

  it('[GET] /api/clients', async () => {
    const response: ClientResDto = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '79988334455',
    }
    httpClient.addResponse([response])
    const result = await sut.list()
    expect(httpClient.lastCall?.url).toBe('api/clients')
    expect(httpClient.lastCall?.method).toBe('GET')
    expect(result).toEqual([response])
  })

  it('[POST] /api/clients', async () => {
    const response = {
      id: '1',
    }
    httpClient.addResponse(response)
    const result = await sut.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '79988334455',
    })
    expect(httpClient.lastCall?.url).toBe('api/clients')
    expect(httpClient.lastCall?.method).toBe('POST')
    expect(result).toEqual(response)
  })

  beforeEach(() => {
    httpClient = new HttpClientMock()
    sut = new ClientHttpGateway(httpClient)
  })
})
