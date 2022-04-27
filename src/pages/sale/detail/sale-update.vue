<template>
  <q-card flat bordered>
    <div class="q-pa-sm">
      <h6 class="q-my-none">Edit Penjualan</h6>
    </div>
    <q-separator/>
    <q-card-section v-if="sale.type == 'loading'">
    </q-card-section>
    <q-form ref="form" v-else>
      <q-card-section>
        <customer-search-input
          v-model="payload.targetUser"
        />
        <q-input
          label="Pajak (%)"
          class="q-mb-md"
          v-model.number="payload.tax"
          type="number"
        />
        <rupiah-input
          label="Biaya Pengiriman (IDR)"
          v-model="payload.shipping"
        />
        <q-input
          label="Diskon (%)"
          class="q-mb-md"
          v-model.number="payload.discount"
          type="number"
        />
      </q-card-section>
    </q-form>
    <q-separator/>
    <q-card-actions align="center">
      <q-btn
        label="simpan"
        color="primary"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  unref,
  toRef,
  reactive,
  computed,
  onMounted,
} from 'vue'
import RupiahInput from 'components/rupiah-input.vue'
import CustomerSearchInput from 'components/customer/customer-search-input.vue'
import { 
  useSingleEntityV2,
  useUpdateEntityV2
} from 'src/compose/entity'

export default defineComponent({
  props: {
    orderId: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    RupiahInput,
    CustomerSearchInput,
  },
  emits: ['sale-updated'],
  setup(props, { emit }) {
    const entityName = 'Penjualan'
    const url = computed(() => `/v1/api/sales/${props.orderId}`)
    const {
      result: $sale,
      getSingleEntity: getSale
    } = useSingleEntityV2({
      entityName,
      url
    })

    const payload = reactive({
      targetUser: {},
      tax: 0,
      discount: 0,
      shipping: '0'
    })

    function loadInitialData() {
      getSale()
        .then((data: any) => {
          alert('here')
          console.log(data)
          payload.targetUser = data.targetUser
          payload.tax = data.tax
          payload.discount = data.discount
          payload.shipping = data.shipping
        })
    }


    onMounted(loadInitialData)

    const $form = ref<any>(null)
    const {
      updateEntity: updateSale
    } = useUpdateEntityV2({
      entityName,
      transform: (data: any) => {
        const {
          targetUser,
          ...rest
        } = data
        return {
          ...rest,
          targetUserId: targetUser.id
        }
      }
    })

    async function onSubmit() {
      const form = unref($form)
      const isValid = await form.validate(true)
      if (!isValid) {
        return
      }
      updateSale(url.value, payload)
        .then(() => emit('sale-updated'))
    }

    return {
      sale: $sale,
      form: $form,
      onSubmit,
      payload,
    }
  }
})
</script>
