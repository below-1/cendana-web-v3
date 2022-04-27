<template>
  <q-dialog :model-value="true" persistent>
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Update Item</h6>
      </div>
      <q-separator/>
      <loading-pane v-if="detail.type == 'loading'"/>
      <q-card-section v-else-if="detail.type == 'data'">
        <q-form ref="form">
          <q-input
            type="number"
            v-model.number="payload.quantity" 
            label="QTY" 
            class="q-mb-md"
            :min="1"
            :max="detail.latestStock.quantity"
            :rules="[
              v => !!v || 'Jumlah Barang Harus diisi',
              v => v > 0 || 'Jumlah Barang Harus lebih besar dari 0'
            ]"
          />
          <q-input
            type="number" 
            v-model.number="payload.discount" 
            label="Diskon" 
            suffix="%" 
            class="q-mb-md"
          />
          <rupiah-input label="Harga Jual" v-model="payload.sellPrice" class="q-mb-md" />
          <q-input placeholder="keterangan" type="textarea" v-model="payload.description" />
        </q-form>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="center">
        <q-btn
          @click="router.back()"
          label="batal"
          unelevated
          class="q-mr-md"
        />
        <q-btn 
          @click="onSubmit"
          :loading="updateResult.type == 'loading'"
          unelevated 
          label="simpan" 
          dark 
          color="primary"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, toRef, ref, Ref, onMounted, inject } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import RupiahInput from 'components/rupiah-input.vue'
import { useDetailSaleItem } from 'src/compose/oitem'
import { useUpdateEntity } from 'src/compose/entity'
import FreeProductForOrder from 'components/product/free-product-for-order.vue'
import LoadingPane from 'components/loading-pane.vue'

export default defineComponent({
  components: {
    FreeProductForOrder,
    RupiahInput,
    LoadingPane
  },
  props: {
    saleItemId: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['done'],
  setup(props, { emit }) {
    const payload = reactive<any>({
      quantity: 1,
      sellPrice: '0',
      discount: 0,
      description: ''
    })

    const saleItemId = toRef(props, 'saleItemId')
    const { result: detail, getDetail } = useDetailSaleItem(saleItemId)
    onMounted(() => {
      getDetail()
        .then((data: any) => {
          if (data.type != 'data') {
            return
          }
          payload.discount = data.orderItem.discount
          payload.sellPrice = data.orderItem.sellPrice
          payload.quantity = data.orderItem.quantity
          payload.description = data.orderItem.description
        })
    })

    const router = useRouter()
    const quasar = useQuasar()
    const form: Ref<any> = ref(null)
    const { 
      result: updateResult, 
      updateEntity: updateSaleItem
    } = useUpdateEntity('Item Penjualan')
    const onSubmit = async () => {
      const formElement = form.value
      if (!formElement) {
        quasar.notify({
          type: 'negative',
          message: 'Terjadi kesalahan saat melakukan validasi'
        })
        return
      }
      const isValid = await formElement.validate(true)
      if (!isValid) {
        return
      }
      const url = `/v1/api/order-items/${saleItemId.value}`
      updateSaleItem(url, {...payload})
        .then(() => {
          router.back()
        })
    }

    return {
      detail,
      payload,
      form,
      onSubmit,
      updateResult,
      router
    }
  }
})
</script>
