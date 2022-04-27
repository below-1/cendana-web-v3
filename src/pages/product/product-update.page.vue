<template>
  <q-page>
    <q-toolbar class="text-grey-8 bg-grey-2 q-px-lg">
      <q-toolbar-title class="text-weight-bold">
        Update Data Produk
      </q-toolbar-title>
    </q-toolbar>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card class="rounded-borders" flat bordered>
          <q-card-section v-if="initialData.type != 'loading'">
            <q-form ref="form">
              <q-input 
                label="Nama Produk"
                v-model="payload.name"
                class="q-mb-md"
                outlined />
              <q-input
                label="Unit Produk"
                v-model="payload.unit"
                class="q-mb-md"
                outlined />
              <rupiah-input
                label="Harga Jual"
                v-model="payload.sellPrice"
              />
              <options-product-category 
                v-model="payload.categories"/>
            </q-form>
          </q-card-section>
          <q-separator />
          <div class="q-ma-md">
            <q-btn 
              @click="onSubmit"
              :loading="updateResult.type == 'loading'"
              color="blue"
              dark
              label="simpan" 
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
  toRefs,
  PropType,
  onMounted,
  computed,
  reactive,
  ref,
  unref,
  Ref,
  watch
} from 'vue';
import { 
  useSingleEntity, 
  useUpdateEntity 
} from 'src/compose/entity'
import { useFindProductCategories } from 'src/compose/pcat'
import OptionsProductCategory from 'components/pcat/options-product-category.vue'
import RupiahInput from 'components/rupiah-input.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    OptionsProductCategory,
    RupiahInput
  },
  setup(props) {
    const { id } = toRefs(props)
    const payload = reactive({
      name: '',
      unit: '',
      categories: [],
      sellPrice: '',
      defect: 0
    })

    const url = computed(() => {
      const idVal = id.value
      return idVal ? `/v1/api/products/${id.value}` : ''
    })
    const { 
      getSingleEntity, 
      result: initialData 
    } = useSingleEntity('Produk')

    // const maxDefect = computed(() => {
    //   const initialDataVal = unref(initialData)
    //   if (!initialDataVal) return 0
    //   if (initialDataVal.type != 'data') return 0
    //   const { data } = initialDataVal
    //   return data.available
    // })

    onMounted(async () => {
      const data: any = await getSingleEntity(url.value)
      payload.name = data.name
      payload.unit = data.unit
      payload.sellPrice = data.sellPrice
      payload.categories = data.categories
      payload.defect = data.defect
    })

    const {
      result: updateResult,
      updateEntity
    } = useUpdateEntity('Produk')

    const router = useRouter()
    const form: Ref<any> = ref(null)
    const onSubmit = async () => {
      const formEl = form.value
      if (!formEl) {
        throw new Error(`form is undefind`)
      }
      const isValid = await formEl.validate(true)
      if (!isValid) {
        return
      }
      const url = `/v1/api/products/${id.value}`
      await updateEntity(url, { ...payload })
      router.back()
    }

    return {
      payload,
      initialData,
      form,
      onSubmit,
      updateResult
    }
  }
})
</script>