import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { User } from 'src/models/user.model';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export function useLogin() {
  const loading = ref(false);
  const error: Ref<string | null> = ref(null);

  async function doLogin(payload: LoginPayload): Promise<void> {
    loading.value = true;
    try {
      const response = await api.post<LoginResponse>('/auth/login', payload);
      error.value = null;
      const { data } = response;
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        switch (err.response.data.message) {
          case 'USER_NOT_FOUND':
            error.value = 'user tidak ditemukan';
            break;
          case 'PASSWORD_NOT_MATCH':
            error.value = 'password tidak cocok';
            break;
          default:
            error.value = 'terjadi kesalahan';
            break;
        }
      } else {
        error.value = 'Terjadi kesalahan';
      }
      throw err;
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    error,
    doLogin,
  };
}