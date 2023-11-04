import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './components/Input'
import { Button } from './components/Button'

const createFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('O formato de e-mail é inválido.'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  techs: z.array(
    z.object({
      title: z.string().min(1, 'O título é obrigatório'),
      knowledge: z.coerce
        .number()
        .min(1, 'Deve haver apenas um valor')
        .max(180),
    }),
  ),
})

type CreateUseFormData = z.infer<typeof createFormSchema>

function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUseFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const [output, setOutput] = useState('')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  function addNewTech() {
    append({ title: '', knowledge: 0 })
  }

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        className="flex flex-col gap-4 w-96"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            register={register('email')}
            label="E-mail"
            error={errors.email?.message}
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            register={register('password')}
            label="Password"
            type="password"
            error={errors.password?.message}
          />
        </div>

        <div className="mt-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-purple-500 text-lg">Tecnologias</p>
            <Button
              handleActionUser={addNewTech}
              value="Adicionar"
              buttonType="button"
            />
            {/* <button
              type="button"
              onClick={addNewTech}
              className="bg-emerald-500 p-2 text-white font-semibold rounded"
            >
              Adicionar
            </button> */}
          </div>

          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-6">
                <div>
                  <input
                    type="text"
                    className="p-2 bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                    placeholder="Digite a sua tecnologia"
                    {...register(`techs.${index}.title`)}
                  />
                  {errors.techs?.[index]?.title ? (
                    <span>{errors.techs?.[index].title?.message}</span>
                  ) : null}
                </div>

                <div>
                  <input
                    type="number"
                    className={`${
                      errors.techs?.[index]?.knowledge ? 'border-red-500' : ''
                    } p-2 bg-transparent border-b-2 border-blue-500 focus:outline-none w-10 text-center`}
                    {...register(`techs.${index}.knowledge`)}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 font-semibold text-white rounded w-full p-2"
        >
          Enviar
        </button>
        <pre>{output}</pre>
      </form>
    </main>
  )
}

export default App
