interface ButtonProps {
  handleActionUser?: () => void
  value: string | number
  buttonType?: 'button' | 'submit' | 'reset' | undefined
}

export function Button({
  handleActionUser,
  value,
  buttonType,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        onClick={handleActionUser}
        type={buttonType}
        className="bg-emerald-500 p-2 text-white font-semibold rounded"
        {...rest}
      >
        {value}
      </button>
    </>
  )
}
