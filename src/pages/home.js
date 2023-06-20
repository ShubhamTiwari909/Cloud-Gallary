import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import ImageGallary from '@/components/organisms/ImageGallary'
import { useRouter } from 'next/router'
import { AppContext } from '@/components/Context'

function Home() {
  const router = useRouter()
  const { setTokenId } = useContext(AppContext)
  useEffect(() => {
      let token = sessionStorage.getItem("Token")
      setTokenId(token)
      if (!token) {
          router.push("/")
      }
  }, [])
  return (
    <>
      <div className="bg-slate-900 px-6 py-20 md:px-24 lg:px-24 lg:py-24">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl sm:leading-none max-w-lg mb-6">
                Every image you {' '}
                <br className="hidden md:block" />
                need to store{' '}
                <span className="inline-block text-violet-300">can be here</span>
              </h2>
              <p className="text-gray-100 text-base md:text-lg">Save your important images and pdf files here with us and we will take care of it for you. You can access your files anytime, anywhere.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="folders/navigation" className='btn--green-glow'>Gallary</Link>
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-1/2">
            <div className="w-2/5">
              <img className="object-cover" src="https://kitwind.io/assets/kometa/one-girl-phone.png" alt="" />
            </div>
            <div className="w-5/12 -ml-16 lg:-ml-32">
              <img className="object-cover" src="https://kitwind.io/assets/kometa/two-girls-phone.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden md:block">
        <ImageGallary />
      </div>
    </>
  )
}

export default Home