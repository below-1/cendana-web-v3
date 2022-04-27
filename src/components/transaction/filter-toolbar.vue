<script lang="ts">
  import { 
    defineComponent, 
    onMounted,
    PropType
  } from 'vue'
  import MonthSelect from 'components/month-select.vue'
  import { currentYearMonth } from 'src/serv/datetime'
  import { useModel } from 'src/compose/commons'

  export default defineComponent({
    emits: [
      'update:month',
      'update:year',
      'update:keyword'
    ],
    props: {
      month: {
        type: Number as PropType<number>,
        required: true
      },
      year: {
        type: Number as PropType<number>,
        required: true
      },
      keyword: {
        type: String as PropType<string>,
        required: true
      },
      totalData: {
        type: Number as PropType<number>,
        required: true
      }
    },
    components: {
      MonthSelect
    },
    setup(props) {
      const yearState = useModel<number>(props, 'year')
      const monthState = useModel<number>(props, 'month')
      const keywordState = useModel<string>(props, 'keyword')

      return {
        yearState,
        monthState,
        keywordState
      }
    }
  })
</script>

<template>
  <div class="q-px-lg flex items-center q-py-sm">
    <q-input 
      v-model="keywordState" 
      dense 
      filled 
      placeholder="keyword..." 
      class="q-mr-md" />
    <month-select 
      v-model:year="yearState"
      v-model:month="monthState"
    />
    <q-space/>
    <div class="text-subtitle1 text-weight-bold">Total Data: {{ totalData }}</div>
  </div>
</template>