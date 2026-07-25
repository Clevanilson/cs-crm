import type { HttpOptions, HttpParam } from './http-client'

export class FetchAdapter {
  async get(url: string, options?: HttpOptions) {
    const response = await fetch(this.parseUrl(url, options))
    return this.parse(response)
  }

  async post(url: string, data: unknown, options?: HttpOptions) {
    const response = await fetch(this.parseUrl(url, options), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.parse(response)
  }

  async put(url: string, data: unknown, options?: HttpOptions) {
    const response = await fetch(this.parseUrl(url, options), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.parse(response)
  }

  async delete(url: string, options?: HttpOptions) {
    const response = await fetch(this.parseUrl(url, options), {
      method: 'DELETE',
    })
    return this.parse(response)
  }

  private async parse(response: Response) {
    if (!response.ok) {
      const message = await this.extractErrorMessage(response)
      throw new Error(message)
    }

    if (response.status === 204) {
      return undefined
    }

    return response.json()
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const body = await response.json()
      if (typeof body?.message === 'string') {
        return body.message
      }
    } catch {
      // ignore parse errors
    }
    return `Erro na requisição (${response.status})`
  }

  private parseUrl(url: string, options?: HttpOptions): string {
    let finalUrl = `http://localhost:8080/${url}`
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        finalUrl = this.parseParam(finalUrl, key, value)
      })
    }
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        finalUrl = this.parseQuery(finalUrl, key, value)
      })
    }
    return finalUrl
  }

  private parseParam(url: string, key: string, value: HttpParam) {
    return url.replace(`{${key}}`, value.toString())
  }

  private parseQuery(url: string, key: string, value: HttpParam) {
    if (url.includes('?')) {
      return `${url}&${key}=${value}`
    }
    return `${url}?${key}=${value}`
  }
}
