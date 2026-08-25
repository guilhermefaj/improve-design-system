import { Children, cloneElement, forwardRef, isValidElement, useId } from 'react';
import type {
  ChangeEvent,
  InputHTMLAttributes,
  OptionHTMLAttributes,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Checkbox as CheckboxPrimitive,
  RadioGroup as RadioGroupPrimitive,
  Select as SelectPrimitive,
  Switch as SwitchPrimitive,
} from 'radix-ui';
import { cx } from './utils';

export type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement<{ id?: string; required?: boolean; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>;
};

export function FormField({ label, hint, error, required, children }: FormFieldProps) {
  const generatedId = useId();
  const id = children.props.id ?? generatedId;
  const descriptionId = hint || error ? `${id}-description` : undefined;
  return (
    <div className="ibs-field">
      <label className="ibs-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, {
        id,
        required,
        'aria-describedby': descriptionId,
        'aria-invalid': Boolean(error),
      })}
      {(hint || error) && (
        <div id={descriptionId} className={error ? 'ibs-field__error' : 'ibs-field__hint'}>
          {error ?? hint}
        </div>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cx('ibs-input', className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cx('ibs-textarea', className)} {...props} />;
});

type SelectOption = { value: string; label: ReactNode; disabled?: boolean };

function collectOptions(nodes: ReactNode): SelectOption[] {
  return Children.toArray(nodes).flatMap((child) => {
    if (!isValidElement<OptionHTMLAttributes<HTMLOptionElement>>(child)) return [];
    if (child.type !== 'option') {
      if (child.type === 'optgroup' && child.props.children) return collectOptions(child.props.children);
      return [];
    }
    return [
      {
        value: String(child.props.value ?? ''),
        label: child.props.children,
        disabled: Boolean(child.props.disabled),
      },
    ];
  });
}

export const Select = forwardRef<HTMLButtonElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  {
    className,
    children,
    value,
    defaultValue,
    onChange,
    id,
    disabled,
    name,
    required,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
  },
  ref,
) {
  const options = collectOptions(children);
  const controlled = value !== undefined;
  return (
    <SelectPrimitive.Root
      value={controlled ? String(value) : undefined}
      defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
      disabled={disabled}
      name={name}
      required={required}
      onValueChange={(next) => {
        if (!onChange) return;
        const event = {
          target: { value: next, name },
          currentTarget: { value: next, name },
        } as unknown as ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        id={id}
        className={cx('ibs-select', className)}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="ibs-select__icon" aria-hidden="true">
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="ibs-select__list" position="popper" sideOffset={8}>
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                className="ibs-select__item"
                value={option.value}
                disabled={option.disabled}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="ibs-select__check">
                  <Check aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

export function Checkbox({
  label,
  id,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: string; id?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className="ibs-choice-row" htmlFor={inputId}>
      <CheckboxPrimitive.Root id={inputId} className="ibs-checkbox" {...props}>
        <CheckboxPrimitive.Indicator>
          <Check aria-hidden="true" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

export type RadioOption = { value: string; label: string };
export function RadioSet({
  label,
  options,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & { label: string; options: RadioOption[] }) {
  const groupId = useId();
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="ibs-field__label" style={{ marginBottom: 'var(--ibs-space-3)' }}>
        {label}
      </legend>
      <RadioGroupPrimitive.Root {...props} style={{ display: 'grid', gap: 'var(--ibs-space-3)' }}>
        {options.map((option) => {
          const id = `${groupId}-${option.value}`;
          return (
            <label className="ibs-choice-row" htmlFor={id} key={option.value}>
              <RadioGroupPrimitive.Item className="ibs-radio" id={id} value={option.value}>
                <RadioGroupPrimitive.Indicator className="ibs-radio__indicator" />
              </RadioGroupPrimitive.Item>
              <span>{option.label}</span>
            </label>
          );
        })}
      </RadioGroupPrimitive.Root>
    </fieldset>
  );
}

export function Switch({
  label,
  id,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { label: string; id?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className="ibs-choice-row" htmlFor={inputId}>
      <SwitchPrimitive.Root id={inputId} className="ibs-switch" {...props}>
        <SwitchPrimitive.Thumb className="ibs-switch__thumb" />
      </SwitchPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

export type InputProps = React.ComponentPropsWithoutRef<typeof Input>;
export type TextareaProps = React.ComponentPropsWithoutRef<typeof Textarea>;
export type SelectProps = React.ComponentPropsWithoutRef<typeof Select>;
export type CheckboxProps = Parameters<typeof Checkbox>[0];
export type RadioSetProps = Parameters<typeof RadioSet>[0];
export type SwitchProps = Parameters<typeof Switch>[0];

export const Field = FormField;
export type FieldProps = FormFieldProps;
export const RadioGroup = RadioSet;
export type RadioGroupProps = RadioSetProps;
