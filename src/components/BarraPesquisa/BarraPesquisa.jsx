import { MagnifyingGlass, XCircle } from "@phosphor-icons/react"
import MediaQuery from "react-responsive"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {  Autocomplete,  AutocompleteItem} from "@nextui-org/autocomplete";
import { useContext, useEffect, useState } from "react";
import temaContexto from "../../context/TemaContexto";
import dataContexto from "../../context/Data/dataContexto";
import PesquisaContexto from "../../context/Pesquisa/PesquisaContexto";
import { AuthContext } from "../../context/Auth/AuthProvider";
import BarraPesquisaSkeleton from "./BarraPesquisaSkeleton";

const BarraPesquisa = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const {definirIdParaPesquisa, idPesquisa} = useContext(PesquisaContexto)
    
    const {tema, foreground} = useContext(temaContexto)
    const {usuario} = useContext(AuthContext)

    const {dbPerguntasOnline, dbPerguntasOffline} = useContext(dataContexto)
    const [dbPerguntas, definirDbPerguntas] = useState(dbPerguntasOnline)


    const pesquisar = (id) => {
        definirIdParaPesquisa(id);
    }

    useEffect(() => {
        if(dbPerguntasOnline != null && dbPerguntasOffline != null && usuario && usuario.level > 0) {
            const pergunta = [
                ...dbPerguntasOnline,
                ...dbPerguntasOffline
            ]
    
            definirDbPerguntas(pergunta)
        } else {
            definirDbPerguntas(dbPerguntasOnline)
        }
    }, [dbPerguntasOnline, dbPerguntasOffline, usuario])

  return (
    <>
        <MediaQuery maxWidth={640}>
            <div className="p-2" onClick={() => onOpen()}>
                <MagnifyingGlass size={24} color={foreground} weight="bold" cursor="pointer"/>
            </div>
        </MediaQuery>


        <MediaQuery minWidth={640}>
            {dbPerguntas ?
                <Autocomplete className="w-[450px]" size="sm" defaultItems={dbPerguntas} onSelectionChange={pesquisar} startContent={
                    <MagnifyingGlass size={24} color={foreground} weight="bold" />
                }
                placeholder='Pesquise por uma pergunta e a encostre rapidamente'
                inputProps={{
                    classNames: {
                        inputWrapper: "rounded-full h-[40px]",
                    }
                }}
                selectedKey={idPesquisa}
                >
                    {
                        ({pergunta, id}) => <AutocompleteItem key={id} >{pergunta}</AutocompleteItem>
                    }
                </Autocomplete>
            :
            <BarraPesquisaSkeleton />
            }
        </MediaQuery>



        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="bottom"
        >

            <ModalContent className={tema}>
                {(onClose) => (
                    <>
                        <ModalHeader></ModalHeader>
                        <ModalBody>
                        {dbPerguntas && 
                            <Autocomplete  size="sm" defaultItems={dbPerguntas} onSelectionChange={pesquisar} startContent={
                                <MagnifyingGlass size={24} color={foreground} weight="bold" />
                            }
                            selectedKey={idPesquisa}
                            >
                                {
                                    ({pergunta, id}) => <AutocompleteItem key={id} >{pergunta}</AutocompleteItem>
                                }
                            </Autocomplete>
                        }                            
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                variant="ghost" 
                                color="danger"
                                endContent={<XCircle size={20}  weight="fill" className="text-content5" />}
                                onClick={()=> onClose()}
                            >
                                Fechar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    </>
  )
}

export default BarraPesquisa