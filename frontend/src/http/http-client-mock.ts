import type { HttpClient } from './http-client'

export class HttpClientMock implements HttpClient {
  private _calls: HttpClientMockCall[] = []
  private responses: unknown[] = []

  get calls(): readonly HttpClientMockCall[] {
    return Object.freeze(this._calls)
  }

  get lastCall(): HttpClientMockCall | undefined {
    return this.calls[this.calls.length - 1]
  }

  public resetCalls(): void {
    this._calls = []
  }

  addResponse(response: unknown): void {
    this.responses.push(response)
  }

  get<TResponse = void>(url: string): Promise<TResponse> {
    const response = this.responses.shift()
    const call: HttpClientMockCall = {
      url,
      method: 'GET',
      response,
    }
    this._calls.push(call)
    return Promise.resolve(response as TResponse)
  }

  post<TResponse = void>(url: string, data: unknown): Promise<TResponse> {
    const response = this.responses.shift()
    const call: HttpClientMockCall = {
      url,
      method: 'POST',
      body: data,
      response,
    }
    this._calls.push(call)
    return Promise.resolve(response as TResponse)
  }

  put<TResponse = void>(url: string, data: unknown): Promise<TResponse> {
    const response = this.responses.shift()
    const call: HttpClientMockCall = {
      url,
      method: 'PUT',
      body: data,
      response,
    }
    this._calls.push(call)
    return Promise.resolve(response as TResponse)
  }

  delete<TResponse = void>(url: string): Promise<TResponse> {
    const response = this.responses.shift()
    const call: HttpClientMockCall = {
      url,
      method: 'DELETE',
      response,
    }
    this._calls.push(call)
    return Promise.resolve(response as TResponse)
  }
}

type HttpClientMockCall = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  response: unknown
}
