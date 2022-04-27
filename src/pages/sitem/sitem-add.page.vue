<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Tambah Item Pembelian #{{ order }}
      </q-toolbar-title>
    </q-toolbar>

    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card class="rounded-borders">
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
                  v => !!v || 'Harga Beli Harus Diisi',
                  decimalGreaterThanZero
                ]"
              />
              <rupiah-input
                label="Harga Jual"
                v-model="payload.sellPrice"
                :rules="[
                  v => !!v || 'Harga Jual Harus Diisi',
                  decimalGreaterThanZero
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
                filled
                class="q-mb-md"
                label="Jumlah Item Rusak"
                v-model.number="payload.defect"
                type="number"
              />
              <q-input
                filled
                class="q-mb-md"
                label="Diskon"
                type="number"
                min="0"
                max="100"
                v-model.number="payload.discount"
              />
            </q-form>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              @click="onSubmit" 
              :loading="result.type == 'loading'"
              square 
              dark 
              color="primary" 
              label="simpan"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, 
  computed, 
  PropType, 
  onMounted, 
  reactive, 
  ref, 
  unref, 
  Ref
} from 'vue';
import LoadingPane from 'components/loading-pane.vue';
import ProductSearchInput from 'components/product-search-input.vue';
import RupiahInput from 'components/rupiah-input.vue'
import { useCreateStockItem } from 'src/compose/sitem';
import { useFilterProduct } from 'src/compose/product'

export default defineComponent({
  components: {
    LoadingPane,
    ProductSearchInput,
    RupiahInput
  },
  props: {
    order: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const {
      result: productResult,
      parameters: productParameters,
      getProducts
    } = useFilterProduct()
    const productOptions = computed(() => productResult.value.items)
    const onFilterProducts = (val: any, update: any) => {
      productParameters.keyword = val;
    }

    const form: Ref<any> = ref();
    const payload = reactive({
      orderId: 0,
      product: {} as any,
      buyPrice: '0',
      sellPrice: '0',
      quantity: 0,
      available: 0,
      defect: 0
    })

    const decimalGreaterThanZero = (v: any) => {
      const vnum = parseFloat(v)
      return vnum > 0 || 'Harga harus lebih besar dari 0'
    }

    const { result, create } = useCreateStockItem()
    const onSubmit = async () => {
      const url = '/v1/api/stock-items'
      const f = unref(form)
      const valid = await f.validate(true)
      if (!valid) {
        return;
      }
      const { product, ...rest } = payload
      const quantity = rest.available + rest.defect
      const realPayload = {
        ...rest,
        productId: payload.product.id,
        orderId: props.order,
        quantity
      }
      try {
        await create(realPayload)
      } catch (err) {
        console.log(err)
      }
    }

    return {
      value: 'OK',
      payload,
      onFilterProducts,
      productOptions,
      decimalGreaterThanZero,
      form,
      onSubmit,
      result
    }
  }
})
</script>
