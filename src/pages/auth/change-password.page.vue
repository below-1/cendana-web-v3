<template>
  <q-page>
    <div class="row justify-center q-my-xl">
      <div class="col-md-4">
        <q-card flat bordered>
          <q-toolbar>
            <q-toolbar-title class="text-center">Ganti Password</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <q-form 
              ref="form" 
              @submit="onSubmit"
            >
              <q-input
                flat
                square
                v-model="newPassword"
                label="Password Baru"
                class="q-mb-sm"
              />

              <q-input
                flat
                square
                v-model="newPasswordRepeat"
                label="Ulangi Password Baru"
                class="q-mb-sm"
                :rules="[
                  checkPasswordMatch
                ]"
              />

              <q-btn
                :loading="loading"
                unelevated
                color="primary"
                type="submit"
                label="submit"
                class="full-width"/>

            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  unref,
  Ref,
  inject
} from 'vue'
import { useQuasar } from 'quasar'
import { User } from 'src/models/user.model'
import { api } from 'boot/axios'

export default defineComponent({
  setup() {
    const $user = inject<Ref<User>>('user')

    const newPassword = ref('')
    const newPasswordRepeat = ref('')

    function checkPasswordMatch(v: string) {
      const newPass = unref(newPassword)
      const newPassRep = unref(newPasswordRepeat)
      return newPass == newPassRep || 'Password tidak cocok'
    }

    const $form = ref<any>(null)
    const $quasar = useQuasar()

    async function onSubmit() {
      const form = unref($form)
      const user = unref($user)
      if (!user) {
        throw new Error('user is undefined')
      }
      const password = unref(newPassword)

      const isValid = await form.validate(true)
      if (!isValid) {
        return
      }

      const { username } = user
      const payload = {
        username,
        password
      }
      const url = '/auth/change-password'
      try {
        const response = await api.put(url, payload)
        $quasar.notify({
          type: 'positive',
          message: 'sukses mengubah password'
        })
      } catch (err) {
        console.log(err)
        $quasar.notify({
          type: 'negative',
          message: 'gagal mengubah password'
        })
      }
    }

    return {
      form: $form,
      newPassword,
      newPasswordRepeat,
      checkPasswordMatch,
      onSubmit
    }
  }
})
</script>
