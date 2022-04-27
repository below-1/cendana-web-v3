<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-space/>
      <q-toolbar-title class="text-center">
        Update Data Supplier #{{ id }}
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
import { defineComponent, PropType, onMounted, reactive, ref, Ref } from 'vue'
import { useSingleEntity } from 'src/compose/entity'
import { useUpdate } from 'src/compose/supplier'
import { BASE_API_URL } from 'src/data/supplier'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const { getSingleEntity } = useSingleEntity('Supplier')
    const payload = reactive({
      name: '',
      address: '',
      mobile: '',
      email: ''
    })

    onMounted(async () => {
      const url = `${BASE_API_URL}/${props.id}`
      const data: any = await getSingleEntity(url)
      payload.name = data.name
      payload.address = data.address
      payload.mobile = data.mobile
      payload.email = data.email
    })

    const form: Ref<any> = ref(null)
    const { loading, update } = useUpdate()
    const router = useRouter()
    const onSubmit = async () => {
      const valid = await form.value.validate(true)
      if (!valid) return
      await update(props.id, payload)
      router.back()
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

<style>

</style>