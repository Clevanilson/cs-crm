export interface HttpClient {
  get<TResponse = void>(url: string, options?: HttpOptions): Promise<TResponse>
  post<TResponse = void>(url: string, data: unknown, options?: HttpOptions): Promise<TResponse>
  put<TResponse = void>(url: string, data: unknown, options?: HttpOptions): Promise<TResponse>
  delete<TResponse = void>(url: string, options?: HttpOptions): Promise<TResponse>
}

export type HttpOptions = {
  params?: Record<string, HttpParam>
  query?: Record<string, HttpParam>
}

export type HttpParam = string | number | boolean
