import Image from 'next/image'
import FullLogo from '@/../../public/assets/logos/Logo_full.png'
import ShortLogo from '@/../../public/assets/logos/Logo_short.png'
import TextLogo from '@/../../public/assets/logos/Logo_text.png'

const Logo = ({
  variant = 'full',
  className,
}: {
  variant?: 'full' | 'short' | 'text'
  className?: string
}) => {
  const logoType =
    variant === 'full' ? FullLogo : variant === 'short' ? ShortLogo : TextLogo

  return (
    <Image
      src={logoType}
      alt="logo"
      height={30}
      width={180}
      className={className}
      priority
    />
  )
}

export default Logo
