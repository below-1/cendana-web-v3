<template>
  <q-card flat square class="bg-indigo-9 text-white">
    <q-toolbar>
      <q-toolbar-title class="text-center">Login</q-toolbar-title>
    </q-toolbar>
    <q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-input
          flat
          dark
          standout
          square
          v-model="payload.username"
          label="Username"
          :rules="[
            v => !!v || 'username harus diisi'
          ]"
          class="q-mb-sm"
        />

        <q-input
          flat
          square
          dark
          standout
          type="password"
          v-model="payload.password"
          label="Password"
          :rules="[
            v => !!v || 'password harus diisi'
          ]"
          class="q-mb-sm"
        />

        <div 
          v-if="loginError"
          class="full-width bg-red-8 text-white q-pa-lg q-my-md text-center">
          <div class="text-subtitle2">{{ loginError }}</div>
        </div>

        <q-btn
          :loading="loading"
          :disabled="formInvalid"
          unelevated
          dark
          color="blue-9"
          type="submit"
          label="submit"
          class="full-width"/>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, watch, } from 'vue'
import { useRouter } from 'vue-router'
import * as data from 'src/data/commons/app.data'
import { useLogin } from 'src/compose/auth'

export default defineComponent({
  setup() {
    const payload = reactive({
      username: '',
      password: '',
    });
    const form: Ref<any> = ref(null);
    const formInvalid = ref(false);

    async function validateForm () {
      const formRef = form.value;
      if (!formRef) {
        return false;
      }
      const invalid: boolean = (await formRef.validate(true)) as unknown as boolean;
      return invalid;
    }

    const {
      loading,
      doLogin,
      error: loginError,
    } = useLogin();
    const router = useRouter();

    async function onSubmit() {
      const isFormInvalid = await validateForm();
      // Quasar input rules return true when there is error
      if (!isFormInvalid) {
        return;
      }
      const formData = { ...payload };
      doLogin(formData)
        .then(() => {
          router.push('/app/dashboard');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      data,
      payload,
      form,
      formInvalid,
      onSubmit,
      loading,
      loginError,
      doLogin,
    };
  },
});
</script>
