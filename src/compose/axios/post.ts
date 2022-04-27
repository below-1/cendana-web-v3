import {
  Ref,
  ref,
  unref
} from 'vue'
import { api } from 'boot/axios'

type AfterHandler = (result: any) => any

interface PostOptions<T> {
  payload: T;
  url: string | Ref<string>;
  onSuccess?: AfterHandler;
  onFail?: AfterHandler;
}

interface Fail {
  type: 'fail'
  error: any
}

interface Success {
  type: 'success'
  data: any
}

interface Loading {
  type: 'loading'
}

type Result = Fail | Success | Loading

export function usePOST<T>(options: PostOptions<T>) {
  const result: Ref<Result> = ref({
    type: 'loading'
  } as Result)

  async function post() {
    const url = unref(options.url)
    result.value = {
      type: 'loading'
    }
    try {
      const response = await api.post(url, options.payload)
      const { data } = response
      result.value = {
        type: 'success',
        data: data
      }
      if (options.onSuccess) {
        options.onSuccess(data)
      }
      return data
    } catch (err) {
      result.value = {
        type: 'fail',
        error: err
      }
      if (options.onFail) {
        options.onFail(err)
      }
    }
  }

  return {
    result,
    post
  }
}