import { getCurrentInstance, computed } from 'vue'

export function useModel<T>(props: any, name: string) {
  const vm = getCurrentInstance()
  return computed<T>({
    get: () => props[name] as T,
    set: (val: T) => {
      vm!.emit(`update:${name}`, val)
    }
  })
}
