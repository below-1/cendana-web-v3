import { watch, ref, Ref } from 'vue';

export default function formValidation(form: Ref<unknown>, payload: any) {
  const formValid = ref(false);

  async function validate() {
    const formVal = form.value;
    if (!formVal) {
      return false;
    }
    formValid.value = await (formVal as any).validate(false);
    return true;
  }

  watch(payload, validate);

  return {
    formValid,
  };
}
