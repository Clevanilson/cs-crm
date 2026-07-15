export interface HttpClient {
  get<TResponse = void>(url: string): Promise<TResponse>
  post<TResponse = void>(url: string, data: unknown): Promise<TResponse>
  put<TResponse = void>(url: string, data: unknown): Promise<TResponse>
  delete<TResponse = void>(url: string): Promise<TResponse>
}
