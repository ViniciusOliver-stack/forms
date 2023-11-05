import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  placeholder: string
  id: string
  register: UseFormRegisterReturn
  error?: string
  type: string
}

export function Input({ placeholder, id, register, error, type }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        placeholder={placeholder}
        id={id}
        {...register}
        className={`border-b-[3px] border-b-[#2E0249]/30 bg-transparent focus:border-b-[#633BBC] focus:outline-none p-2 focus:placeholder:text-[#633BBC] ${
          error ? 'border-red-500' : ''
        }`}
        type={type}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
