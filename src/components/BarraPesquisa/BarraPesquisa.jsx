import { MagnifyingGlass, XCircle } from "@phosphor-icons/react"
import MediaQuery from "react-responsive"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useContext } from "react";
import temaContexto from "../../context/TemaContexto";

const BarraPesquisa = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    const {tema} = useContext(temaContexto)

  return (
    <>
        <MediaQuery maxWidth={640}>
            <div className="p-2" onClick={() => onOpen()}>
                <MagnifyingGlass size={24} color="#fdfcfc" weight="bold" cursor="pointer"/>
            </div>
        </MediaQuery>


        <MediaQuery minWidth={640}>
            <div className="w-full max-w-sm bg-content2 rounded-3xl h-8  flex items-center justify-between cursor-text" >

                <MagnifyingGlass size={24} color="#fdfcfc" weight="bold" className="ml-2" />
                
                <input  className=" p-2 px-4 w-full bg-content2 rounded-3xl h-8 outline-none" type="text" placeholder="Pesquisar" />
            </div>
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
                            <Input type="text" placeholder="Pesquise uma pergunta" className="text-foreground" />
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                variant="light" 
                                color="danger"
                                endContent={<XCircle size={20}  weight="fill" className="text-content5" />}
                                onClick={()=> onClose()}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="shadow" 
                                color="success"
                                endContent={ <MagnifyingGlass size={20} weight="bold"
                                />}
                                className="font-bold"
                            >
                                Pesquisar
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