<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold text-center">
        Tambah Data Penjualan
      </q-toolbar-title>
    </q-toolbar>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">

        <q-card flat bordered>
          <q-card-section>
            <q-form ref="form">
              <customer-search-input
                :rules="[
                  v => !!v || 'Pelanggan Harus Diisi'
                ]"
                v-model="payload.targetUser"
              />
              <q-input
                type="textarea"
                v-model="payload.description"
                label="Keterangan"
                outlined
                class="q-mb-md"
              />
              <datetime-input
                v-model="payload.createdAt"
              />
            </q-form>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn @click="onSubmit" label="simpan" dark color="blue" unelevated />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, inject } from 'vue'
import { defaultDateTime, toISO } from 'src/serv/datetime'
import DatetimeInput from 'components/datetime-input.vue'
import CustomerSearchInput from 'components/customer/customer-search-input.vue'
import { useCreateEntity } from 'src/compose/entity'
import { BASE_API_URL, BASE_APP_URL } from 'src/data/sale'
import { User } from 'src/models/user.model'
import { useRouter } from 'vue-router'

const bulanOptions = [
  {  }
]

type Payload = {
  targetUser: null | User;
  description: string;
  createdAt: string;
}

export default defineComponent({
  components: {
    CustomerSearchInput,
    DatetimeInput,
  },
  setup() {
    const form = ref(null)
    const payload: Payload = reactive({
      targetUser: null,
      description: '',
      createdAt: defaultDateTime()
    })

    const user = inject<Ref<User>>('user')

    const router = useRouter()
    const { result: createResult, createEntity: createSale } = useCreateEntity('Penjualan')
    const onSubmit = async () => {
      if (!user) {
        throw new Error('user is not defined')
      }

      const formElement: any = form.value
      if (!formElement) {
        throw new Error(`form is undefined`)
      }
      const isValid = await formElement.validate(true)
      if (!isValid) {
        return
      }
      const { targetUser } = payload
      if (!targetUser) {
        throw new Error('Target User is undefined')
      }

      const realPayload = {
        targetUserId: targetUser.id,
        description: payload.description,
        createdAt: toISO(payload.createdAt),
        authorId: user.value.id
      }
      const url = BASE_API_URL
      const result = await createSale(url, realPayload)
      router.push(`/app/sale/${result.id}/detail`)
    }

    return {
      form,
      payload,
      createResult,
      onSubmit
    }
  }
})
</script>
