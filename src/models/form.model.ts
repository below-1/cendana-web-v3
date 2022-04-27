export type Rule = () => (true | string);

export interface BaseFormDescriptor {
  name: string;
  label: string;
  field: string;
  rules?: Rule[];
  // control: 'simple-string' | 'textarea' | 'number' | 'select' | 'radio';
  // max?: number;
  // min?: number;
  // step?: number;
}

export interface StringDescriptor extends BaseFormDescriptor {
  control: 'string';
}

export interface DateDescriptor extends BaseFormDescriptor {
  control: 'date';
}

export interface TimeDescriptor extends BaseFormDescriptor {
  control: 'date';
}

export interface DateTimeDescriptor extends BaseFormDescriptor {
  control: 'datetime';
}

export interface TextAreaDescriptor extends BaseFormDescriptor {
  control: 'textarea';
}

export interface NumberDescriptor extends BaseFormDescriptor {
  control: 'number';
  max?: number;
  min?: number;
  step?: number;
}

export interface SelectItem {
  value: any;
  label: string;
}

export interface StaticSelectDescriptor extends BaseFormDescriptor {
  control: 'select',
}

export interface DynamicSelectDescriptor extends BaseFormDescriptor {
  control: 'dynamic-select';
}

export type FormDescriptor = StringDescriptor | TextAreaDescriptor |
  NumberDescriptor | StaticSelectDescriptor | DynamicSelectDescriptor | 
  DateDescriptor | TimeDescriptor | DateTimeDescriptor;
