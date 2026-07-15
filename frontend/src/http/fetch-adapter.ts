export class FetchAdapter {
  async get(url: string) {
    const response = await fetch(this.parseUrl(url))
    return this.parse(response)
  }

  async post(url: string, data: unknown) {
    const response = await fetch(this.parseUrl(url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.parse(response)
  }

  async put(url: string, data: unknown) {
    const response = await fetch(this.parseUrl(url), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return this.parse(response)
  }

  async delete(url: string) {
    const response = await fetch(this.parseUrl(url), {
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

  private parseUrl(url: string): string {
    return `http://localhost:8080/${url}`
  }
}
