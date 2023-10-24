import { Book, Code, GraduationCap, OfficeChair } from '@phosphor-icons/react';
import P from 'prop-types';
import { temas } from '../../data/temas';

Icone.propTypes = {
    tema: P.string,
    tamanho: P.number,
    cor: P.string
}

export default function Icone({tema, tamanho, cor}) {

   const temaObj =  temas.filter((item) => item.nome == tema)
   const icone = temaObj[0].icone
    
  switch(icone){
        case 'Code':
            return(
                <Code size={tamanho} color={cor} weight="duotone" />
            )

        case 'Book' :
            return(
                <Book size={tamanho} color={cor} weight="duotone" />
            )
            
        case 'GraduationCap':
            return(
                <GraduationCap size={tamanho} color={cor} weight="duotone" />
            )
        
        case "OfficeChair":
            return(
                <OfficeChair size={tamanho} color={cor} weight="duotone"/>
            )
    }
    
}
