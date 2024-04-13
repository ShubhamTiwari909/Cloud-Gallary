import { useContext, useEffect } from "react"
import Contacts from "../../components/Contacts"
import { AppContext } from "@/components/Context"
import { useRouter } from "next/router"

function Contact() {
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
    <div className="px-4 py-12 bg-slate-300 min-h-screen flex justify-center flex-col">
        <Contacts />
    </div>
  )
}

export default Contact