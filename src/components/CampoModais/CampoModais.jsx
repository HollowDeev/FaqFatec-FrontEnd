
import { useState } from "react"
import ModalPerguntas from "../Modais/ModalPerguntas"
import ModalTemas from "../Modais/ModalTemas"
import { useEffect } from "react"
import useGerenciadorContexto from "../../hooks/useGerenciadorContexto"

const CampoModais = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [tipoModal, definirTipoModal] = useState('')
    const [acaoModal, definirAcaoModal] = useState('')

    const { gerenciamento } = useGerenciadorContexto()

    useEffect(() => {
      if (gerenciamento[0].editarPergunta) {
        definirTipoModal('pergunta')
        definirAcaoModal('edicao')
        setIsOpen(true)
      }else if(gerenciamento[0].adicionarPergunta){
        definirTipoModal('pergunta')
        definirAcaoModal('adicao')
        setIsOpen(true)
      }else if(gerenciamento[1].editarTema){
        console.log("teste")
        definirTipoModal('tema')
        definirAcaoModal('edicao')
        setIsOpen(true)
      }else if(gerenciamento[1].adicionarTema){
        definirTipoModal('tema')
        definirAcaoModal('adicao')
        setIsOpen(true)
      }else {
        setIsOpen(false)
      }
  }, [gerenciamento])

    return (
        <>
          {tipoModal === 'pergunta' ?
            <ModalPerguntas isOpen={isOpen} acao={acaoModal}/>
            :
            <ModalTemas isOpen={isOpen} acao={acaoModal} />
          }
        </>
    )
}

export default CampoModais