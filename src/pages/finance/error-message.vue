<script lang="ts">
  import { 
    defineComponent,
    onMounted,
    PropType
  } from 'vue'
  import SnapshotBtn from './snapshot-btn.vue'

  export default defineComponent({
    components: {
      SnapshotBtn
    },
    props: {
      message: {
        type: String as PropType<string>
      },
      reportNotCreated: {
        type: Boolean as PropType<boolean>,
        default: false
      }
    }
  })
</script>

<template>
  <div class="bg-grey-2 column items-center justify-center" style="height: 300px;">
    <h5>{{ message }}</h5>
    <snapshot-btn
      v-if="reportNotCreated"
    />
    <!-- <q-btn v-if="reportNotCreated" color="primary" label="Buat Laporan">
    </q-btn> -->
  </div>
</template>
