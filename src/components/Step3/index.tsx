import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { quest } from '../../utils/quest'

const createFormSchema = z.object({
  experience: z
    .string()
    .min(10, 'Digite no mínimo 10 caracteres')
    .max(360, 'Limite de até 360 caracteres'),
})

type CreateUseFormData = z.infer<typeof createFormSchema>

interface StepProps {
  handleNextStep: () => void
  handlePrevStep: () => void
}

export function Step3({ handleNextStep, handlePrevStep }: StepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUseFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const [output, setOutput] = useState('')
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
      <div>
        <p className="font-semibold text-[#633BBC]">O que mais lhe agradou?</p>

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
              {...register('experience')}
            />
            {errors.experience?.message && (
              <span className="text-red-500">{errors.experience.message}</span>
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
          className="bg-[#633BBC] font-semibold text-white rounded p-2 w-48 disabled:bg-[#633BBC]/50 disabled:text-white/50 disabled:hover:cursor-not-allowed"
          disabled={!isValid}
        >
          Finalizar
        </button>
      </div>

      <pre>{output}</pre>
    </form>
  )
}
