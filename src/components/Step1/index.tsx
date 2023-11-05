import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../Input'

const createFormSchema = z.object({
  name: z.string().min(1, 'Digite o seu nome completo'),
  numberPhone: z
    .string()
    .min(1, 'O telefone precisa conter o DDD e o número completo')
    .max(12, 'Verifique o número'),

  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('O formato de e-mail é inválido.'),
})

type CreateUseFormData = z.infer<typeof createFormSchema>

interface StepProps {
  handleNextStep: () => void
}

export function Step1({ handleNextStep }: StepProps) {
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
      className="flex flex-col gap-6 w-96 "
      onSubmit={handleSubmit((data) => {
        createUser(data)
        handleNextStep()
      })}
    >
      <div className="flex flex-col gap-2">
        <Input
          id="nameUser"
          placeholder="Digite seu nome"
          register={register('name')}
          type="text"
          error={errors.name?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Digite o email"
          id="email"
          register={register('email')}
          error={errors.email?.message}
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          id="numberPhone"
          placeholder="Digite seu  número de WhatsApp"
          register={register('numberPhone')}
          type="text"
          error={errors.numberPhone?.message}
        />
      </div>

      <div className=" flex items-center justify-end mt-4">
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
