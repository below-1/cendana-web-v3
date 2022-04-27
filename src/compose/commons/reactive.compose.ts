import { getCurrentInstance, computed, Ref } from 'vue'

export function useReactive<T>(props: any, name: string, field: string) {
  const vm = getCurrentInstance()
  return computed({
    get: () => props[name][field] as T,
    set: (val: T) => {
      vm!.emit(`update:${name}`, {
        ...props[name],
        [field]: val
      })
    }
  })
}
