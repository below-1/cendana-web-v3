<script lang="ts">
import { 
  ref, 
  computed, 
  defineComponent,
  toRefs,
  Ref,
  PropType,
} from 'vue';
import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'
import { today } from 'src/serv/datetime'
import { Menu } from 'src/data/commons/menu.data';

function useMenus(role: Ref<string>, baseMenus: Ref<Menu[]>, adminMenus: Ref<Menu[]>) {
  const menus = computed(() => {
    let menus = [...baseMenus.value];
    if (role.value == 'ADMIN') {
      menus = [...menus, ...adminMenus.value];
    }
    return menus;
  })
  return { menus };
}

export default defineComponent({
  props: {
    mini: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    baseMenus: {
      type: Array as PropType<Menu[]>,
      required: true,
    },
    adminMenus: {
      type: Array as PropType<Menu[]>,
      required: true,
    },
  },
  setup(props) {
    const {
      role,
      baseMenus,
      adminMenus,
    } = toRefs(props);
    const formattedToday = computed(() => {
      const now = today()
      return format(now, 'eeee, d MMMM yyyy', { locale: localeID })
    })
    return {
      ...useMenus(role, baseMenus, adminMenus),
      formattedToday
    };
  },
});
</script>


<template>
  <!-- <div class="q-py-xl text-center">
    <h6 class="q-my-none">Admin Zero</h6>
    <div class="text-overline" style="line-height: unset;">{{formattedToday}}</div>
  </div>
  <q-separator/> -->
  <q-drawer
    :mini="mini"
    show-if-above
    dark
  >
    <q-list class="text-weight-bold">
      <template v-for="menu, i in menus" :key="`app_menu_${i}`">
        <q-expansion-item
          v-if="menu.children"
          expand-separator
          :icon="menu.icon"
          :label="menu.label"
          style="text-transform: capitalize;"
        >
          <q-list class="bg-black">
            <q-item v-for="child in menu.children" 
              :key="child.path"
              :to="child.path"
            >
              <q-item-section avatar>
                <q-icon :name="child.icon" size="sm" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-capitalize">{{ child.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item
          v-else
          :to="menu.path"
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">{{ menu.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>
