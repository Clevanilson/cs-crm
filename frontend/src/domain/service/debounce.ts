import { SEARCH_DEBOUNCE_MS } from '../const/debounce.const'

export class Debounce {
  private timeout: ReturnType<typeof setTimeout> | undefined

  constructor(private readonly delayMs: number = SEARCH_DEBOUNCE_MS) {}

  run(callback: () => void) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(callback, this.delayMs)
  }

  cancel() {
    clearTimeout(this.timeout)
    this.timeout = undefined
  }
}
