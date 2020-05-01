type K = string | number
// type K = keyof any

export class DefaultDict<T> {
  value: Record<K, T> = {}
  private defaultValue: T
  constructor(defaultValue: T) {
    this.defaultValue = defaultValue
  }
  get(key: K): T {
    if (!(key in this.value)) {
      this.value[key] = this.defaultValue
    }
    return this.value[key]
  }

  set(key: K, val: T) {
    this.value[key] = val
  }
}
