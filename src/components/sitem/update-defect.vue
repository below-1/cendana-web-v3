<template>
  <q-card flat bordered style="width: 500px;">
    <div class="q-pa-sm" v-if="product.type == 'result'">
      <h6 class="q-my-none">{{ product.data.name }}  --  Ubah Jumlah Rusak</h6>
    </div>
    <q-separator/>
    <q-card-section>
      <q-form ref="form">
        <q-input
          v-model="payload.defect"
          type="number"
          :min="0"
          :max="maxDefect"
          label="Jumlah Rusak"
        />
      </q-form>
    </q-card-section>
    <q-separator/>
    <q-card-actions align="center">
      <q-btn 
        @click="onSubmit"
        :loading="updateResult.type == 'loading'"
        outline 
        color="primary"
        label="submit"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { 
  defineComponent,
  PropType,
  ref,
  toRef,
  unref,
  reactive,
  watch,
  computed,
  onMounted
} from 'vue'
import { 
  useSingleEntity,
  useUpdateEntityV2
} from 'src/compose/entity'
import { useModel } from 'src/compose/commons'

export default defineComponent({
  props: {
    id: {
      type: [Number, String] as PropType<number | string>
    },
    productId: {
      type: Number as PropType<number>,
      required: true
    }
  },
  emits: ['done'],
  setup(props, { emit }) {
    const $id = toRef(props, 'id')

    const payload = reactive({
      defect: 0
    })

    const {
      result: $stockItem,
      getSingleEntity: _getStockItem
    } = useSingleEntity<any>('Stok Item')

    const getStockItem = async () => {
      const id = unref($id)
      console.log(`id changed = ${id}`)
      await _getStockItem(`/v1/api/stock-items/${id}`)
    }

    watch($id, getStockItem)

    const maxDefect = computed(() => {
      const stockItem = unref($stockItem)
      if (stockItem.type != 'result') {
        return 0
      }
      const { data } = stockItem
      const { available } = data
      return available
    })

    const {
      result: $product,
      getSingleEntity: _getProduct
    } = useSingleEntity('Product')

    const getProduct = async () => {
      const productId = props.productId
      const url = `/v1/api/products/${productId}`
      await _getProduct(url)
    }

    onMounted(getProduct)

    const {
      result: updateResult,
      updateEntity: updateStockItem
    } = useUpdateEntityV2({
      entityName: 'Stok Barang'
    })

    const $form = ref<any>(null)
    const onSubmit = async () => {
      const form = unref($form)
      if (!form) {
        throw new Error(`form is undefined`)
      }
      const isValid = await form.validate(true)
      if (!isValid) {
        throw new Error('form is not valid')
      }
      const id = unref($id)
      updateStockItem(`/v1/api/stock-items/${id}/defect`, payload)
        .then(() => {
          emit('done')
        })
    }

    return {
      product: $product,
      payload,
      maxDefect,
      form: $form,
      onSubmit,
      updateResult
    }
  }
})
</script>