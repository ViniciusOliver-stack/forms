import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './components/Input'
import { Button } from './components/Button'

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

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUseFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const [output, setOutput] = useState('')
  const [step, setStep] = useState(2)

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  function handleNextStep() {
    setStep(step + 1)
  }
  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center gap-12">
      <div>
        <h1 className="text-5xl font-bold text-white w-[480px]">
          Sua opinião é muito <span className="text-[#633BBC]">importante</span>{' '}
          para nós!
        </h1>
      </div>
      {step === 1 && (
        <form
          className="flex flex-col gap-14 w-96 "
          onSubmit={handleSubmit(createUser)}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Input
                id="nameUser"
                placeholder="Digite seu nome"
                register={register('name')}
                type="text"
                error={errors.name?.message}
              />
            </div>
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
              className="bg-emerald-500 font-semibold text-white rounded p-2 w-48"
              onClick={handleNextStep}
            >
              Continuar
            </button>
          </div>
          <pre>{output}</pre>
        </form>
      )}
      {step === 2 && (
        <form
          className="flex flex-col gap-4 w-96"
          onSubmit={handleSubmit(createUser)}
        >
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
              id="password"
              placeholder="Digite a senha"
              register={register('password')}
              type="password"
              error={errors.password?.message}
            />
          </div>

          <div className=" flex items-center justify-between gap-12 mt-4 ">
            <button
              type="submit"
              className="bg-emerald-500 font-semibold text-white rounded p-2 w-48"
              onClick={handlePrevStep}
            >
              Voltar
            </button>
            <button
              type="submit"
              className="bg-emerald-500 font-semibold text-white rounded p-2 w-48"
              onClick={handleNextStep}
            >
              Enviar
            </button>
          </div>
          <pre>{output}</pre>
        </form>
      )}
    </main>
  )
}

export default App
