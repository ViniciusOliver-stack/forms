import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../Input'

const createFormSchema = z.object({
  nameCompany: z.string().min(1, 'Digite o nome da sua empresa.'),
  numEmployees: z.coerce.number().min(1, 'Digite a quantidade de funcionários'),
  products: z
    .string()
    .min(10, 'Digite no mínimo 10 caracteres')
    .max(360, 'Limite de até 360 caracteres'),
})

type CreateUseFormData = z.infer<typeof createFormSchema>

interface StepProps {
  handleNextStep: () => void
  handlePrevStep: () => void
}

export function Step2({ handleNextStep, handlePrevStep }: StepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUseFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const [output, setOutput] = useState('')

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
    console.log(data, output)
  }

  return (
    <form
      className="flex flex-col gap-4 w-96"
      onSubmit={handleSubmit((data) => {
        createUser(data)
        handleNextStep()
      })}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Nome da empresa"
          id="company"
          register={register('nameCompany')}
          error={errors.nameCompany?.message}
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          id="employees"
          placeholder="Número de funcionários"
          register={register('numEmployees')}
          type="number"
          error={errors.numEmployees?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Fale um pouco sobre seus produtos ou serviços"
          className="w-full h-[200px] border-[3px] border-[#2E0249]/30 rounded-lg bg-transparent focus:border-[#633BBC] focus:placeholder:text-[#8257E5] focus:outline-none p-2 mt-6 resize-none"
          {...register('products')}
        />
        {errors.products?.message && (
          <span className="text-red-500">{errors.products.message}</span>
        )}
      </div>

      <div className=" flex items-center justify-between gap-12 mt-4 ">
        <button
          type="submit"
          className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48"
          onClick={handlePrevStep}
        >
          Voltar
        </button>
        <button
          type="submit"
          className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48 disabled:bg-[#633BBC]/50 disabled:text-white/50 disabled:hover:cursor-not-allowed"
          disabled={!isValid}
        >
          Continuar
        </button>
      </div>
      <pre>{output}</pre>
    </form>
  )
}
