import { computed, inject, unref, watch } from 'vue'
import { useSingleEntityV2 } from 'src/compose/entity'
import { Params } from './types'
import fieldsToRupiah from './fieldsToRupiah'

interface FinanceReportParams {
  name: string;
}

export default function useFinanceReport(reportParams: FinanceReportParams) {
  const params = inject<Params>('params')
  const axiosOptions = computed(() => ({
    params
  }))

  const {
    result,
    getSingleEntity
  } = useSingleEntityV2({
    entityName: reportParams.name,
    url: '/v1/api/finance/report',
    axiosOptions
  })

  const transformed = computed(() => {
    const resValue = unref(result)
    if (!resValue || resValue.type !== 'result') {
      return null
    }
    const transformed = fieldsToRupiah(resValue.data)
    return transformed
  })

  const error = computed(() => {
    const resValue = unref(result)
    if (resValue.type !== 'error') {
      return null
    }
    const axiosError = (result.value as any).error
    const errorData = axiosError.response.data
    return errorData
  })

  watch(params!, getSingleEntity)

  return {
    result,
    getSingleEntity,
    transformed,
    error
  }
}