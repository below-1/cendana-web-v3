import { inject } from 'vue'
import { useCreateEntityV2 } from 'src/compose/entity'

export function useCreateOpex() {
  const user = inject<any>('user')
  const { createEntity, result } = useCreateEntityV2({
    entityName: 'Beban Usaha',
    transform: (p) => {
      const userVal = user.value
      return {
        ...p,
        authorId: userVal.id
      }
    }
  })

  function createOpex (payload: any)  {
    if (!payload.id) {
      throw new Error(`id is undefined`)
    }
    const { id, ...rest } = payload
    const url = `/v1/api/opexes/${id}/transactions`
    return createEntity(url, payload)
  }
  return {
    createOpex,
    result
  }
}