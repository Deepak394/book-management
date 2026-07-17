import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldWrapperProps {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldWrapperProps {}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldWrapperProps {}

const fieldBase =
  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-100';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(fieldBase, error ? 'border-red-400' : 'border-gray-300', className)}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(fieldBase, 'min-h-[100px] resize-y', error ? 'border-red-400' : 'border-gray-300', className)}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className, id, children, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(fieldBase, 'bg-white', error ? 'border-red-400' : 'border-gray-300', className)}
          {...props}
        >
          {children}
        </select>
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
