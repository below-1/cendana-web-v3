<template>
  <q-list separator>
    <q-item>
      <q-item-section>
        <q-item-label>Tanggal Jatuh Tempo</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ formatDateTime(delay.dueDate) }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Total</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>IDR {{ rupiah(delay.total) }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Status</q-item-label>
      </q-item-section>
      <q-item-section>
        <div>
          <delay-status-chip
            :complete="delay.complete"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-btn
          label="detail"
          :to="`/app/delay-payable/${delay.id}/detail`"
          outline
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue'
import { formatDateTime } from 'src/serv/datetime'
import { rupiah } from 'src/serv/currency'
import DelayStatusChip from 'components/delay/delay-status-chip.vue'

export default defineComponent({
  props: {
    delay: {
      type: Object as PropType<any>,
      required: true
    }
  },
  components: {
    DelayStatusChip,
  },
  setup(props) {
    return {
      formatDateTime,
      rupiah
    }
  }
})
</script>