<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-space/>
      <q-toolbar-title class="text-center">
        Ubah Data Pelanggan
      </q-toolbar-title>
      <q-space/>
    </q-toolbar>
    <q-separator/>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form v-if="customer.type == 'result'" ref="form">
              <q-input
                label="Nama"
                v-model="payload.name"
                :rules="[
                  v => !!v || 'Nama harus diisi'
                ]"
                outlined
                class="q-mb-md"
              />

              <q-input
                label="Alamat"
                v-model="payload.address"
                :rules="[
                  v => !!v || 'Alamat harus diisi'
                ]"
                outlined
                class="q-mb-md"
              />

              <q-input
                label="No Telepon"
                v-model="payload.mobile"
                outlined
                class="q-mb-md"
              />
            </q-form>
            <template v-else v-for="i in 5">
              <q-skeleton type="rect" class="q-my-sm" />
            </template>
          </q-card-section>
          <q-separator/>
          <div class="q-pa-md">
            <q-btn 
              :loading="updateResult.type == 'loading' || customer.type == 'loading'"
              @click="onSubmit"
              label="simpan" 
              dark color="blue" 
              unelevated />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, Ref, PropType, onMounted } from 'vue'
import { useUpdateEntity, useSingleEntity } from 'src/compose/entity'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const { id } = toRefs(props)
    const payload = reactive({
      name: '',
      address: '',
      mobile: '',
      email: ''
    })
    
    const {
      result: customer,
      getSingleEntity: getCustomer
    } = useSingleEntity('Pelanggan')

    onMounted(() => {
      const url = `/v1/api/users/customers/${id.value}`
      getCustomer(url)
        .then((data: any) => {
          payload.name = data.name
          payload.address = data.address
          payload.mobile = data.mobile
          console.log(payload)
        })
    })

    const {
      result: updateResult,
      updateEntity: updateCustomer
    } = useUpdateEntity('Pelanggan')

    const form = ref(null)
    const onSubmit = () => {
      const formElement = form.value
      if (!formElement) {
        throw new Error('Form is undefined')
      }
      const url = `/v1/api/users/customers/${id.value}`
      updateCustomer(url, { ...payload })
    }

    return {
      payload,
      customer,
      updateResult,
      onSubmit,
      form
    }
  }
})
</script>