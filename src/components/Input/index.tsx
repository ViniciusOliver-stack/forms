import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  register: UseFormRegisterReturn
  error?: string
  type: string
}

export function Input({ label, id, register, error, type }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...register}
        className={`p-2 bg-transparent border-b-2 border-blue-500 focus:outline-none w-full ${
          error ? 'border-red-500' : ''
        }`}
        type={type}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
