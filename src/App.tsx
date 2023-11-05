import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './components/Input'
import { Button } from './components/Button'
import { quest } from './utils/quest'

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
  nameCompany: z.string().min(1, 'Digite o nome da sua empresa.'),
  numEmployees: z.coerce.number().min(1, 'Digite a quantidade de funcionários'),
  products: z
    .string()
    .min(10, 'Digite no mínimo 10 caracteres')
    .max(360, 'Limite de até 360 caracteres'),
  experience: z
    .string()
    .min(10, 'Digite no mínimo 10 caracteres')
    .max(360, 'Limite de até 360 caracteres'),
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
  const [step, setStep] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  const handleCheckboxChange = (id: number) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== id))
    } else {
      setSelectedOptions([...selectedOptions, id])
    }
  }

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
      {step === 4 ? (
        <div className="font-bold text-white w-[680px]">
          <h1 className="text-5xl text-[#633BBC]">Terminou! 🎉</h1>
          <p className="mt-4 text-2xl">
            Obrigado por compartilhar sua opinião! Seu feedback é inestimável
            para nós. Agradecemos por dedicar seu tempo para nos ajudar a
            melhorar. Valorizamos sua contribuição!
          </p>
          <span className="italic absolute bottom-6 left-4 text-sm">
            **Esse é só um formulário de estudo, nenhum dados seu ficou salvou!
          </span>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold text-white w-[480px]">
            Sua opinião é muito{' '}
            <span className="text-[#633BBC]">importante</span> para nós!
          </h1>
        </div>
      )}
      <div>
        <ol className="flex items-center justify-between w-full p-6 text-sm font-medium text-center text-gray-500 sm:text-base sm:p-4 sm:space-x-4 mt-4 mb-6">
          <li
            className={`flex items-center ${
              step === 1 ? 'text-white font-bold' : 'text-gray-500'
            }`}
          >
            <span
              className={`${
                step === 1 ? 'bg-[#633BBC] text-white' : 'bg-gray-300'
              } flex items-center justify-center w-5 h-5 mr-2 text-xs  rounded-full shrink-0"`}
            >
              1
            </span>
            <span className="hidden sm:inline-flex sm:ml-2">Contato</span>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
          <li
            className={`flex items-center ${
              step === 2 ? 'text-white font-bold' : 'text-gray-500'
            }`}
          >
            <span
              className={`${
                step === 2 ? 'bg-[#633BBC] text-white' : 'bg-gray-300'
              } flex items-center justify-center w-5 h-5 mr-2 text-xs  rounded-full shrink-0"`}
            >
              2
            </span>
            <span className="hidden sm:inline-flex sm:ml-2">Empresa</span>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
          <li
            className={`flex items-center ${
              step === 3 ? 'text-white font-bold' : 'text-gray-500'
            }`}
          >
            <span
              className={`${
                step === 3 ? 'bg-[#633BBC] text-white' : 'bg-gray-300'
              } flex items-center justify-center w-5 h-5 mr-2 text-xs  rounded-full shrink-0"`}
            >
              3
            </span>
            Feedback
          </li>
        </ol>

        {step === 1 && (
          <form
            className="flex flex-col gap-6 w-96 "
            onSubmit={handleSubmit(createUser)}
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
                className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48"
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
                className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48"
                onClick={handleNextStep}
              >
                Continuar
              </button>
            </div>
            <pre>{output}</pre>
          </form>
        )}
        {step === 3 && (
          <form
            className="flex flex-col gap-4 w-96"
            onSubmit={handleSubmit(createUser)}
          >
            <div>
              <p className="font-semibold text-[#633BBC]">
                O que mais lhe agradou?
              </p>

              <div className="flex flex-col space-y-2 mt-4">
                {quest.map((quest) => (
                  <label
                    className={`flex items-center justify-between py-3 px-4 border-[3px] border-[#2E0249]/30 rounded ${
                      selectedOptions.includes(quest.id)
                        ? 'bg-[#633BBC] text-white'
                        : 'bg-zinc-850'
                    }`}
                    key={quest.id}
                    onClick={() => handleCheckboxChange(quest.id)}
                  >
                    <span className="mr-2">{quest.quest}</span>
                    {selectedOptions.includes(quest.id) && (
                      <span>
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9116 24.6945C19.539 24.6945 24.9116 19.3219 24.9116 12.6945C24.9116 6.06704 19.539 0.694458 12.9116 0.694458C6.2842 0.694458 0.911621 6.06704 0.911621 12.6945C0.911621 19.3219 6.2842 24.6945 12.9116 24.6945Z"
                            fill="#6979F8"
                          />
                          <path
                            d="M17.4829 9.46985L11.1972 15.7556L8.34009 12.8984"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </label>
                ))}

                <div className="flex flex-col gap-2">
                  <textarea
                    placeholder="Descreva um pouco da sua experiência aqui!"
                    className="w-full h-[200px] border-[3px] border-[#2E0249]/30 rounded-lg bg-transparent focus:border-[#633BBC] focus:placeholder:text-[#8257E5] focus:outline-none p-2 mt-6 resize-none"
                    {...register('products')}
                  />
                  {errors.products?.message && (
                    <span className="text-red-500">
                      {errors.products.message}
                    </span>
                  )}
                </div>
              </div>
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
                className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48"
                onClick={handleNextStep}
              >
                Finalizar
              </button>
            </div>
            <pre>{output}</pre>
          </form>
        )}
      </div>
    </main>
  )
}

export default App
