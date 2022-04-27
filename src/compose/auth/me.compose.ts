import { ref, Ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { User } from 'src/models/user.model';

export function useMe() {
  const error: Ref<string | null> = ref(null);
  const me: Ref<User | null> = ref(null);

  async function getMe(): Promise<void> {
    try {
      const response = await api.get<User>('/auth/me');
      const { data } = response;
      me.value = data;
      error.value = null;
    } catch (err) {
      console.log(err);
      error.value = 'Terjadi kesalahan saat mengambil data user';
    }
  }

  onMounted(getMe);

  return {
    error,
    me,
  };
}
