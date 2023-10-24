import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react"
import cpsLogo from "../../assets/cps-logo.png"
const Rodape = () => {
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
        <img src={cpsLogo} alt="" className="w-full sm:max-w-xl" />
    </div>
  )
}

export default Rodape