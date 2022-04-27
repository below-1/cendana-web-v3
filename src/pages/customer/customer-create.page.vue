<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-space/>
      <q-toolbar-title class="text-center">
        Tambah Data Pelanggan
      </q-toolbar-title>
      <q-space/>
    </q-toolbar>
    <q-separator/>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="form">
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

              <q-input
                label="Email"
                type="email"
                v-model="payload.email"
                outlined
                class="q-mb-md"
              />
            </q-form>
          </q-card-section>
          <q-separator/>
          <div class="q-pa-md">
            <q-btn 
              :loading="loading"
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
import { defineComponent, reactive, ref, Ref } from 'vue'
import { useCreate } from 'src/compose/customer'

export default defineComponent({
  setup() {
    const payload = reactive({
      name: '',
      address: '',
      mobile: '',
      email: ''
    })

    const form: Ref<any> = ref(null)

    const {
      loading,
      create
    } = useCreate()

    const onSubmit = async () => {
      const valid = await form.value.validate(true)
      if (!valid) return
      create(payload)
    }

    return {
      payload,
      form,
      onSubmit,
      loading
    }
  }
})
</script>
