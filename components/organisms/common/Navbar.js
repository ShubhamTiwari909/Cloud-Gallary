import { useState, useContext } from 'react'
import Image from "next/image"
import { useRouter } from 'next/router'
import styles from '@/styles/Navbar.module.css'
import Logo from "../../../src/images/logo.png"
import { logout } from '../../../methods/Logout'
import PropTypes from "prop-types"
import Link from 'next/link'
import { AppContext } from '../../Context'
import {FaHamburger} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"

function Navbar({ tokenId }) {
  const [open, setOpen] = useState(false)

  const isOpen = () => setOpen(!open)

  //router
  const router = useRouter()
  const { setTokenId } = useContext(AppContext)
  return (
    <>
      {
        tokenId ?
          <div className={ `${open ? "h-screen z-105" : "h-18 overflow-hidden"} ${styles.navbar}`} >
            <div className='flex justify-between items-center w-full'>
              <Image src={Logo} className={`${styles.logo} rounded-full`} alt="logo" />
              <button onClick={isOpen} className="block lg:hidden border-none p-0 h-5">{open ? <AiOutlineClose color='#ffffff' size="1.2rem" /> : <FaHamburger color='#ffffff' size="1.4rem" />}</button>
            </div>
            <nav className={styles.nav}>
              <>
                <Link href="/home" className='btn--green-glow' onClick={isOpen}>Home</Link>
                <Link href="/folders/navigation" className='btn--green-glow' onClick={isOpen}>Gallary</Link>
                <Link href="/feedback" className='btn--green-glow' onClick={isOpen}>Feedback</Link>
                <Link href="/contacts" className='btn--green-glow' onClick={isOpen}>Contacts</Link>
                <button className="btn--dark"
                  onClick={() => logout(router, setTokenId)}>Logout</button>
              </>
            </nav>
          </div >
          : ""
      }
    </>
  )
}
Navbar.propTypes = {
  tokenId: PropTypes.string
}

export default Navbar