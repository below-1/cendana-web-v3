<template>
  <q-circular-progress
    v-if="loading"
    indeterminate
    size="120px"
    :thickness="0.6"
    color="white"
    center-color="grey-5"
    class="q-ma-md"
  />
  <q-form
    v-else
    ref="form">
    <DynamicForm
      :items="fields"
      :options="options"
      v-model="payload"
    />
    <q-btn 
      @click="innerOnSubmit"
      :disabled="!formValid" 
      unelevated 
      dark color="indigo" 
      label="simpan" />
  </q-form>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  toRefs,
  Ref,
  onMounted,
  PropType
} from 'vue';
import { FormDescriptor } from 'src/models/form.model';
import useFormValidation from 'src/compose/form/form-validation.compose';
import DynamicForm from './dynamic-form.vue';

type OnSubmit = (payload: any) => Promise<any>;

const INITIAL_ERROR_MESSAGE = 'gagal mengambil data awal';

export default defineComponent({
  components: {
    DynamicForm,
  },
  props: {
    initial: {
      type: Object as PropType<Object>,
      required: true
    },
    fields: {
      type: Array as PropType<FormDescriptor[]>,
      required: true,
    },
    options: {
      type: Object as PropType<any>,
      default: {}
    },
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { initial, loading } = toRefs(props);
    const form: Ref<any> = ref(null);
    const payload = ref({});
    const { formValid } = useFormValidation(form, payload);

    const innerOnSubmit = () => {
      emit('submit', { ...payload.value });
    };

    onMounted(() => {
      payload.value = { ...(initial.value) };
    });

    return {
      payload,
      form,
      formValid,
      innerOnSubmit,
      loading,
    };
  },
});
</script>
