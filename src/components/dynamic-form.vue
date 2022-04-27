<template>
  <template v-for="item in items" :key="item.name">
    <div class="q-mb-md">
      <q-input
        v-if="item.control == 'string'"
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="item.rules"
        filled
      />

      <q-input
        v-if="item.control == 'datetime'"
        filled
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                :model-value="modelValue[item.field]"
                @update:model-value="(v) => onFieldChange(item.field, v)"
                mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                :model-value="modelValue[item.field]"
                @update:model-value="(v) => onFieldChange(item.field, v)"
                mask="YYYY-MM-DD HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-if="item.control == 'date'"
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="['date']"
        mask="date"
        filled
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date 
                :model-value="modelValue[item.field]"
                @update:model-value="(v) => onFieldChange(item.field, v)"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input 
        v-if="item.control == 'time'"
        filled 
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="['time']"
        mask="time" 
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time 
                :model-value="modelValue[item.field]"
                @update:model-value="(v) => onFieldChange(item.field, v)"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>


      <q-input
        v-else-if="item.control == 'textarea'"
        type="textarea"
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="item.rules"
        filled
      />

      <q-select
        v-else-if="item.control == 'select'"
        :options="options[item.field]"
        :model-value="modelValue[item.field]"
        :multiple="item.multiple"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        filled
      />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, Ref, PropType, toRefs } from 'vue';
import { FormDescriptor } from 'src/models/form.model';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<FormDescriptor[]>,
      required: true
    },
    options: {
      type: Object as PropType<any>,
      default: {}
    },
    modelValue: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    function onFieldChange(key: string, value: any) {
      const result = { ...(modelValue.value as Object), [key]: value };
      emit('update:modelValue', result);
    }
    return {
      onFieldChange
    }
  },
})
</script>
