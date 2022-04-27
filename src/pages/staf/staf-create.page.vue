<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-space/>
      <q-toolbar-title class="text-center">
        Tambah Data Pegawai
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
                label="Username"
                v-model="payload.username"
                outlined
                class="q-mb-md"
              />

              <q-input
                label="Password"
                v-model="payload.password"
                type="password"
                outlined
                class="q-mb-md"
              />

              <q-input
                label="Ulangi Password"
                v-model="payload.passwordRepeat"
                type="password"
                outlined
                class="q-mb-md"
                :rules="[
                  checkPassword
                ]"
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
import { 
  defineComponent, 
  reactive, 
  ref, 
  Ref,
  computed
} from 'vue'
import { useCreateEntityV2 } from 'src/compose/entity'
import { 
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL
} from 'src/data/staf'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const payload = reactive({
      name: '',
      username: '',
      password: '',
      passwordRepeat: ''
    })

    function checkPassword(s: string) {
      const { password, passwordRepeat } = payload
      return password == passwordRepeat || 'Password tidak cocok'
    }

    const form: Ref<any> = ref(null)

    const {
      result: createResult,
      createEntity: createStaf
    } = useCreateEntityV2({
      entityName: 'Pegawai'
    })
    const loading = computed(() => createResult.value.type == 'loading')

    const router = useRouter()
    const onSubmit = async () => {
      const valid = await form.value.validate(true)
      if (!valid) return;
      const {
        passwordRepeat,
        ...rest
      } = payload
      try {
        await createStaf(BASE_API_URL, rest)
        router.back()
      } catch (err) {
        console.log(err)
      }
    }

    return {
      payload,
      form,
      onSubmit,
      loading,
      checkPassword
    }
  }
})
</script>
