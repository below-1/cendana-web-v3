<template>
  <q-card flat bordered>
    <q-toolbar class="bg-grey-2">
      <q-toolbar-title>
        Tambah Data Item
      </q-toolbar-title>
    </q-toolbar>
    <q-card-section>
      <q-form ref="form">
        <product-search-input
          v-model="payload.product"
          :rules="[
            v => !!v || 'Produk Harus Diisi'
          ]"
        />
        <rupiah-input
          label="Harga Beli"
          v-model="payload.buyPrice"
          :rules="[
            decGreaterThan('0', 'Harga Beli harus lebih besar dari 0')
          ]"
        />
        <rupiah-input
          label="Harga Jual"
          v-model="payload.sellPrice"
          :rules="[
            decGreaterThan('0', 'Harga Jual harus lebih besar dari 0')
          ]"
        />                      
        <q-input
          filled
          class="q-mb-md"
          label="Jumlah Item Baik"
          v-model.number="payload.available"
          type="number"
          :rules="[
            v => !!v || 'Jumlah Item Baik Harus Diisi'
          ]"
        />
        <q-input
          class="q-mb-md"
          label="Jumlah Item Rusak"
          v-model.number="payload.defect"
          type="number"
        />
        <q-input
          class="q-mb-md"
          label="Diskon"
          type="number"
          min="0"
          max="100"
          v-model.number="payload.discount"
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="center" class="bg-grey-2">
      <q-btn @click="onSubmit" label="Simpan" color="primary" unelevated dark />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  ref,
  unref,
  inject,
  Ref
} from 'vue'
import ProductSearchInput from 'components/product-search-input.vue'
import RupiahInput from 'components/rupiah-input.vue'
import {
  decGreaterThan,
  decLessThan
} from 'src/serv/decimal'
import { useCreateEntityV2 } from 'src/compose/entity'
import { User } from 'src/models/user.model'

export default defineComponent({
  emits: ['done'],
  props: {
    orderId: {
      type: [Number, String] as PropType<number | string>,
      required: true
    }
  },
  components: {
    ProductSearchInput,
    RupiahInput,
  },
  setup(props, { emit }) {
    const form: Ref<any> = ref()
    const payload = reactive({
      orderId: 0,
      product: {} as any,
      buyPrice: '0',
      sellPrice: '0',
      quantity: 0,
      available: 0,
      defect: 0
    })

    const $user = inject<Ref<User>>('user')
    const {
      result: $result,
      createEntity: createStockItem
    } = useCreateEntityV2({
      entityName: 'Item Pembelian',
      transform: (v: any) => {
        const user = unref($user)
        if (!user) {
          throw new Error('user is undefined')
        }

        const { product, ...rest } = v
        const quantity = rest.available + rest.defect

        return {
          ...rest,
          productId: product.id,
          quantity,
          orderId: props.orderId,
          authorId: user.id
        }
      }
    })

    const onSubmit = async () => {
      const url = '/v1/api/stock-items'
      const f = unref(form)
      const valid = await f.validate(true)
      if (!valid) {
        return
      }
      try {
        await createStockItem(url, payload)
        emit('done')
      } catch (err) {
        console.log(err)
      }
    }

    return { 
      form,
      payload,
      result: $result,
      decGreaterThan,
      onSubmit
    }
  }
})
</script>
