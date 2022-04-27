<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-space/>
      <q-toolbar-title class="text-center">
        Update Data Pegawai
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
  PropType,
  computed,
  onMounted,
} from 'vue'
import { 
  useUpdateEntityV2,
  useSingleEntityV2
} from 'src/compose/entity'
import { 
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL
} from 'src/data/staf'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const url = computed(() => {
      return `${BASE_API_URL}/${props.id}`
    })

    const {
      getSingleEntity: getInitialData
    } = useSingleEntityV2({
      entityName: ENTITY_NAME,
      url
    })

    const payload = reactive({
      name: '',
      username: ''
    })

    const form: Ref<any> = ref(null)
    const {
      result: updateResult,
      updateEntity: updateStaf
    } = useUpdateEntityV2({
      entityName: 'Pegawai'
    })
    const loading = computed(() => updateResult.value.type == 'loading')

    const router = useRouter()
    const onSubmit = async () => {
      const valid = await form.value.validate(true)
      if (!valid) return;
      try {
        await updateStaf(url.value, payload)
        router.back()
      } catch (err) {
        console.log(err)
      }
    }

    onMounted(async () => {
      try {
        const result: any = await getInitialData()
        payload.name = result.name
        payload.username = result.username
      } catch (err) {
        console.log(err)
      }
    })

    return {
      payload,
      form,
      onSubmit,
      loading
    }
  }
})
</script>
