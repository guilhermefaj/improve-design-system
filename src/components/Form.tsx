import { cloneElement, forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactElement, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { Checkbox as CheckboxPrimitive, RadioGroup, Switch as SwitchPrimitive } from 'radix-ui';
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
      <label className="ibs-field__label" htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {cloneElement(children, {
        id,
        required,
        'aria-describedby': descriptionId,
        'aria-invalid': Boolean(error),
      })}
      {(hint || error) && <div id={descriptionId} className={error ? 'ibs-field__error' : 'ibs-field__hint'}>{error ?? hint}</div>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cx('ibs-input', className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cx('ibs-textarea', className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, children, ...props }, ref) {
  return <select ref={ref} className={cx('ibs-select', className)} {...props}>{children}</select>;
});

export function Checkbox({ label, id, ...props }: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: string; id?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className="ibs-choice-row" htmlFor={inputId}>
      <CheckboxPrimitive.Root id={inputId} className="ibs-checkbox" {...props}>
        <CheckboxPrimitive.Indicator><Check aria-hidden="true" strokeWidth={3} /></CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

export type RadioOption = { value: string; label: string };
export function RadioSet({ label, options, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroup.Root> & { label: string; options: RadioOption[] }) {
  const groupId = useId();
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="ibs-field__label" style={{ marginBottom: 'var(--ibs-space-3)' }}>{label}</legend>
      <RadioGroup.Root {...props} style={{ display: 'grid', gap: 'var(--ibs-space-3)' }}>
        {options.map((option) => {
          const id = `${groupId}-${option.value}`;
          return <label className="ibs-choice-row" htmlFor={id} key={option.value}><RadioGroup.Item className="ibs-radio" id={id} value={option.value}><RadioGroup.Indicator className="ibs-radio__indicator" /></RadioGroup.Item><span>{option.label}</span></label>;
        })}
      </RadioGroup.Root>
    </fieldset>
  );
}

export function Switch({ label, id, ...props }: React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { label: string; id?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return <label className="ibs-choice-row" htmlFor={inputId}><SwitchPrimitive.Root id={inputId} className="ibs-switch" {...props}><SwitchPrimitive.Thumb className="ibs-switch__thumb" /></SwitchPrimitive.Root><span>{label}</span></label>;
}
