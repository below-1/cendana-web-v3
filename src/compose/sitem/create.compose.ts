import { inject, Ref } from 'vue';
import { useCreateEntity } from 'src/compose/entity';
import { User } from 'src/models/user.model';

export function useCreateStockItem() {
  const url = '/v1/api/stock-items'
  const user = inject<Ref<User>>('user')
  const { result, createEntity } = useCreateEntity('Item Pembelian')
  const create = async (payload: any) => {
    if (!user) {
      throw new Error('User is not defined')
    }
    const realPayload = {
      ...payload,
      authorId: user.value.id
    }
    console.log(realPayload)
    await createEntity(url, realPayload);
  }
  return {
    result,
    create
  }
}