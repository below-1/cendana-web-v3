<script lang="ts">
import { 
  defineComponent, 
  ref, 
  provide,
  inject,
  computed
} from 'vue';
import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'
import { User } from 'src/models/user.model';
import { useRouter } from 'vue-router'
import { baseMenus, adminMenus } from 'src/data/commons/menu.data';
import { today } from 'src/serv/datetime'
import * as appData from 'src/data/commons/app.data';
import AppMenu from 'components/app-menu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppMenu,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const leftDrawerMini = ref(false);
    const user = inject<User>('user');
    const router = useRouter()

    const formattedToday = computed(() => {
      const now = today()
      return format(now, 'eeee, d MMMM yyyy', { locale: localeID })
    })

    function logout() {
      localStorage.removeItem('token')
      router.replace('/')
    }

    return {
      leftDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawer() {
        leftDrawerMini.value = !leftDrawerMini.value;
      },
      adminMenus,
      baseMenus,
      data: appData,
      user,
      logout
    };
  },
});
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-dark shadow-2 q-py-none">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="toggleLeftDrawer"
        >
          <q-icon name="img:logo.svg"></q-icon>
        </q-btn>
        <q-toolbar-title class="text-weight-bolder">
          UD. Cendana
        </q-toolbar-title>
        <q-space/>

        <q-btn-dropdown flat icon="person" :label="user.first_name">
          <q-list separator>
            <q-item to="/app/change-password">
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Ganti Password
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item @click="logout" clickable>
              <q-item-section avatar>
                <q-icon name="power_settings_new" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Log Out
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <AppMenu
      :mini="leftDrawerMini"
      :baseMenus="baseMenus"
      :adminMenus="adminMenus"
      :role="user.role"/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>