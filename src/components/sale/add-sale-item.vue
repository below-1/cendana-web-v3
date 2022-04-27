<template>
  <q-dialog v-model="showState">
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Tambah Item</h6>
      </div>
      <q-separator/>
      <q-card-section>
        <q-form ref="form">
          <free-product-for-order 
            v-model="payload.product" 
            :order-id="saleId" 
            class="q-mb-md"
            :rules="[
              v => !!v || 'Produk Harus diisi'
            ]"
          />
          <q-input
            type="number"
            v-model.number="payload.quantity" 
            label="QTY" 
            class="q-mb-md"
            :min="1"
            :rules="[
              v => !!v || 'Jumlah Barang Harus diisi',
              v => v > 0 || 'Jumlah Barang Harus lebih besar dari 0'
            ]"
          />
          <q-input type="number" v-model.number="payload.discount" label="Diskon" suffix="%" class="q-mb-md" />
          <rupiah-input label="Harga Jual" v-model="payload.sellPrice" class="q-mb-md" />
          <q-input placeholder="keterangan" type="textarea" v-model="payload.description" />
        </q-form>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="center">
        <q-btn 
          @click="onSubmit"
          unelevated label="simpan" dark color="primary"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { 
  defineComponent, 
  PropType, 
  reactive, 
  watch, 
  toRef, 
  ref, 
  unref,
  Ref, 
  onMounted,
  inject
} from 'vue'
import { useModel } from 'src/compose/commons'
import FreeProductForOrder from 'components/product/free-product-for-order.vue'
import RupiahInput from 'components/rupiah-input.vue'
import { useCreateEntity } from 'src/compose/entity'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    FreeProductForOrder,
    RupiahInput
  },
  props: {
    saleId: {
      type: String as PropType<string>,
      required: true
    },
    show: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  emits: ['done'],
  setup(props, { emit }) {
    const showState = useModel(props, 'show')
    const payload = reactive<any>({
      product: {},
      quantity: 1,
      sellPrice: '0',
      discount: 0,
      description: ''
    })

    const selectedProduct = toRef(payload, 'product')
    watch(selectedProduct, (val: any) => {
      if (!val || !val.stockRecords) {
        return
      }
      const [ latestStock ] = val.stockRecords
      payload.sellPrice = latestStock.sellPrice
      payload.discount = latestStock.discount
      // console.log('new value = ', val)
    })

    const user = inject<Ref<any>>('user')
    const quasar = useQuasar()
    const { 
      result: createResult, 
      createEntity: createSaleItem 
    } = useCreateEntity('Item Penjualan')
    const form: Ref<any> = ref(null)
    const onSubmit = async () => {
      const formElement = form.value
      if (!formElement) {
        throw new Error(`formElement is undefined`)
      }
      const isValid = await formElement.validate(true)
      if (!isValid) {
        return
      }
      const { product, ...rest } = payload
      if (!product.id || !product.stockRecords) {
        quasar.notify({
          type: 'negative',
          message: 'Produk tidak valid'
        })
        return
      }      
      const [ latestStock ] = product.stockRecords
      const userValue = unref(user)
      if (!userValue) {
        quasar.notify({
          type: 'negative',
          message: 'Kesalahan autentikasi'
        })
        return
      }

      const realPayload = {
        ...rest,
        authorId: userValue.id,
        productId: product.id,
        stockItemId: latestStock.id,
        orderId: props.saleId
      }
      createSaleItem('/v1/api/order-items', realPayload)
        .then(() => {
          emit('done')
          showState.value = false
        })
    }

    return {
      showState,
      payload,
      form,
      onSubmit
    }
  }
})
</script>
