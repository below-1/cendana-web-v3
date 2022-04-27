import { ref, Ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

export function useRegister() {
  const router = useRouter()
  const quasar = useQuasar()
  const loading = ref(false)
  const register = async (payload: any) => {
    loading.value = true
    try {
      const response = await api.post('/auth/signup', payload)
      loading.value = true
      router.push('/login')
    } catch (err) {
      console.log(err)
      loading.value = true
      quasar.notify({
        type: 'negative',
        message: 'gagal mendaftarkan user'
      })
    }
  }
  return {
    register,
    loading
  }
}