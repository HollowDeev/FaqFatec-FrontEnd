import { MagnifyingGlass, XCircle } from "@phosphor-icons/react"
import MediaQuery from "react-responsive"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {  Autocomplete,  AutocompleteItem} from "@nextui-org/autocomplete";
import { useContext, useState } from "react";
import temaContexto from "../../context/TemaContexto";
import dataContexto from "../../context/Data/dataContexto";
import PesquisaContexto from "../../context/Pesquisa/PesquisaContexto";

const BarraPesquisa = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const {definirIdParaPesquisa, idPesquisa} = useContext(PesquisaContexto)
    
    const {tema} = useContext(temaContexto)

    const {dbPerguntas} = useContext(dataContexto)

    const pesquisar = (id) => {
        definirIdParaPesquisa(id);
    }


  return (
    <>
        <MediaQuery maxWidth={640}>
            <div className="p-2" onClick={() => onOpen()}>
                <MagnifyingGlass size={24} color="#fdfcfc" weight="bold" cursor="pointer"/>
            </div>
        </MediaQuery>


        <MediaQuery minWidth={640}>
            {dbPerguntas && 
                <Autocomplete className="w-[450px]" size="sm" defaultItems={dbPerguntas} onSelectionChange={pesquisar} startContent={
                    <MagnifyingGlass size={24} color="#fdfcfc" weight="bold" />
                }
                inputProps={{
                    classNames: {
                        inputWrapper: "rounded-full h-[40px]",
                    }
                }}
                selectedKey={idPesquisa}
                >
                    {
                        ({pergunta, id, icone}) => <AutocompleteItem key={id} >{pergunta}</AutocompleteItem>
                    }
                </Autocomplete>
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
                                <MagnifyingGlass size={24} color="#fdfcfc" weight="bold" />
                            }
                            selectedKey={idPesquisa}
                            >
                                {
                                    ({pergunta, id, icone}) => <AutocompleteItem key={id} >{pergunta}</AutocompleteItem>
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