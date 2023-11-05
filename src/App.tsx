import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Step1 } from './components/Step1'
import { Step2 } from './components/Step2'
import { Step3 } from './components/Step3'

function App() {
  const {
    formState: { isValid },
  } = useForm()

  const [step, setStep] = useState(1)

  function handleNextStep() {
    if (isValid) {
      setStep(step + 1)
    }
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
      {step === 1 && <Step1 handleNextStep={handleNextStep} />}
      {step === 2 && (
        <Step2
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {step === 3 && (
        <Step3
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
    </main>
  )
}

export default App
