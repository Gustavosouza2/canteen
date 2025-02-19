import Image from 'next/image'
import Logo from '../../../../assets/images/logo.png'

export const HeaderLogin = () => {
  return (
    <header className="flex z-10 fixed w-full justify-between items-center p-2 bg-transparent">
      <div className="flex ml-28 mt-6">
        <Image src={Logo} alt="logo" height={70} width={70} quality={100} />
      </div>
    </header>
  )
}
