<template>
  <q-card flat bordered>
    <q-toolbar class="bg-grey-2">
      <q-toolbar-title>
        Tambah Item
      </q-toolbar-title>
    </q-toolbar>
    <q-form ref="form" @submit="onSubmit">
      <q-card-section>
          <free-product-for-order 
            v-model="payload.product" 
            :order-id="orderId" 
            class="q-mb-md"
            :rules="[
              v => !!v || 'Produk Harus diisi'
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
            class="q-mb-md"
            label="Jumlah Item"
            v-model.number="payload.quantity"
            type="number"
            :max="maxQTY"
            :rules="[
              v => !!v || 'Jumlah Item Harus Diisi',
              ruleMaxQTY
            ]"
          />
          <q-input
            class="q-mb-md"
            label="Diskon"
            type="number"
            min="0"
            max="100"
            v-model.number="payload.discount"
          />
          <q-input placeholder="keterangan" type="textarea" v-model="payload.description" />
      </q-card-section>
      <q-card-actions align="center" class="bg-grey-2">
        <q-btn type="submit" label="Simpan" color="primary" unelevated dark />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  toRef,
  computed,
  ref,
  unref,
  inject,
  Ref,
  watch,
} from 'vue'
import FreeProductForOrder from 'components/product/free-product-for-order.vue'
import RupiahInput from 'components/rupiah-input.vue'
import {
  decGreaterThan,
  decLessThan
} from 'src/serv/decimal'
import { useCreateEntityV2 } from 'src/compose/entity'
import { User } from 'src/models/user.model'

export default defineComponent({
  props: {
    orderId: {
      type: [Number, String] as PropType<number | string>,
      required: true
    }
  },
  components: {
    FreeProductForOrder,
    RupiahInput,
  },
  emits: ['item-added'],
  setup(props, { emit }) {
    const form: Ref<any> = ref()
    const maxQTY = ref(0)
    const payload = reactive({
      product: {},
      quantity: 1,
      sellPrice: '0',
      discount: 0,
      description: ''
    })

    const $selectedProduct: Ref<any> = toRef(payload, 'product')
    watch($selectedProduct, (selectedProduct) => {
      if (!selectedProduct || !selectedProduct.id) {
        return
      }
      payload.sellPrice = selectedProduct.sellPrice
      payload.discount = selectedProduct.discount
      maxQTY.value = selectedProduct.available
      console.log('maxQTY.value = ', maxQTY.value)
    })

    const errorMessageMaxQTY = 'jumlah item tidak boleh melebihi batas maksimal'
    const ruleMaxQTY = (v: number) => v <= maxQTY.value || errorMessageMaxQTY

    const $user = inject<Ref<User>>('user')
    const {
      result: $result,
      createEntity: createStockItem
    } = useCreateEntityV2({
      entityName: 'Item Penjualan',
      transform: (v: any) => {
        const user = unref($user)
        if (!user) {
          throw new Error('user is undefined')
        }

        const { product, ...rest } = v

        return {
          ...rest,
          productId: product.id,
          orderId: props.orderId,
          authorId: user.id
        }
      }
    })

    const onSubmit = async () => {
      const url = '/v1/api/order-items'
      const f = unref(form)
      const valid = await f.validate(true)
      if (!valid) {
        return
      }
      try {
        await createStockItem(url, payload)
        emit('item-added')
      } catch (err) {
        console.log(err)
      }
    }

    return { 
      form,
      payload,
      result: $result,
      decGreaterThan,
      onSubmit,
      maxQTY,
      ruleMaxQTY
    }
  }
})
</script>
