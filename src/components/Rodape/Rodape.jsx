import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react"
import cpsLogo from "../../assets/cps-logo.png"
import cpsLogoLight from "../../assets/cps-logo-light.png"
import { useContext } from "react"
import temaContexto from "../../context/TemaContexto"
import { useState } from "react"
import { useEffect } from "react"
const Rodape = () => {
  
  const {tema} = useContext(temaContexto)
  const [logoURL, setLogoURL] = useState(cpsLogo)
  useEffect(() => {
    setLogoURL(tema == 'light' ? cpsLogoLight : cpsLogo)
  }, [tema])

  return (
    <div className="bg-background p-6 flex flex-col items-center md:flex-row md:justify-around">
        <div className="flex gap-10">
            <a href="#">
                <InstagramLogo size={72} color="#771212" />
            </a>
            <a href="#">
                <FacebookLogo  size={72} color="#771212" />
            </a>
        </div>
        <img src={logoURL} alt="" className="w-full sm:max-w-xl" />
    </div>
  )
}

export default Rodape