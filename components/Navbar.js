import { useContext } from 'react'
import Image from "next/image"
import { useRouter } from 'next/router'
import styles from '@/styles/Navbar.module.css'
import Logo from "../src/images/logo.png"
import { logout } from '../methods/Logout'
import PropTypes from "prop-types"
import Link from 'next/link'
import { AppContext } from './Context'

function Navbar({ tokenId }) {
  //router
  const router = useRouter()
  const { setTokenId } = useContext(AppContext)


  return (
    <>
      {
        tokenId ?
          <div className={styles.navbar
          } >
            <Image src={Logo} className={`${styles.logo} rounded-full`} alt="logo" />
            <nav className={styles.nav}>
              <>
                <button className={styles.buttonRed}
                  onClick={() => logout(router, setTokenId)}>Logout</button>
                <Link href="/folders/navigation">Gallary</Link>
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