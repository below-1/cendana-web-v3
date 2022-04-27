<template>
  <q-dialog :model-value="true" persistent>
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Edit Penjualan</h6>
      </div>
      <q-separator/>
      <q-card-section v-if="sale.type == 'loading'">
      </q-card-section>
      <q-card-section v-else>
        <q-form ref="form">
          <customer-search-input v-model="payload.targetUser" class="q-mb-md" />
          <q-input
            label="Pajak"
            class="q-mb-md"
            v-model.number="payload.tax"
            type="number"
          />
          <rupiah-input
            label="Biaya Pengiriman"
            v-model="payload.shipping"
          />
          <q-input
            label="Diskon"
            class="q-mb-md"
            v-model.number="payload.discount"
            type="number"
          />
        </q-form>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="center">
        <q-btn 
          @click="onSubmit"
          :loading="loading"
          label="Simpan" 
          square 
          unelevated 
          dark 
          color="primary">
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent, 
  onMounted, 
  PropType, 
  computed, 
  Ref,
  toRef, 
  ref, 
  unref, 
  reactive
} from 'vue'
import { useDetailSale } from 'src/compose/sale'
import { useUpdateEntityV2 } from 'src/compose/entity'
import RupiahInput from 'components/rupiah-input.vue'
import CustomerSearchInput from 'components/customer/customer-search-input.vue'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    RupiahInput,
    CustomerSearchInput
  },
  setup(props) {
    const id = toRef(props, 'id')

    const {
      sale,
      getSale
    } = useDetailSale(id)

    const payload = reactive({
      targetUser: {},
      tax: 0,
      discount: 0,
      shipping: '0'
    })

    const { 
      result: updateResult,
      updateEntity: updateSale
    }  = useUpdateEntityV2({
      entityName: 'Penjualan',
      transform: (v: any) => {
        const { targetUser, ...rest } = v
        return {
          ...rest,
          targetUserId: targetUser.id
        }
      }
    })
    const loading = computed(() => sale.value.type == 'loading' || updateResult.value.type == 'loading')

    onMounted(() => {
      getSale()
        .then((val: any) => {
          payload.targetUser = val.targetUser
          payload.tax = val.tax
          payload.discount = val.discount
          payload.shipping = val.shipping
        })
    })

    const form = ref<any>(null)
    const onSubmit = async () => {
      const formElement = form.value
      if (!formElement) {
        return
      }
      const isValid = await formElement.validate(true)
      if (!isValid) {
        return
      }
      updateSale(`/v1/api/sales/${props.id}`, payload)
    }


    return {
      payload,
      sale,
      onSubmit,
      loading,
      form
    }
  }
})
</script>
