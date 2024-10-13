type customProps = {
  title: string
  subtitle?: string
}

const Header = ({ title, subtitle }: customProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold md:text-4xl text-dark-800">{title}</h2>
      {subtitle && (
        <p className="font-normal text-base text-dark-600 mt-4">{subtitle}</p>
      )}
    </div>
  )
}

export default Header
