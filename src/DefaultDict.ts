export class DefaultDict<T> {
  value: Record<string | number, T> = {}
  private defaultValue: T
  constructor(defaultValue: T) {
    this.defaultValue = defaultValue
  }
  get(key: string | number): T {
    if (!(key in this.value)) {
      this.value[key] = this.defaultValue
    }
    return this.value[key]
  }

  set(key: string | number, val: T) {
    this.value[key] = val
  }
}
