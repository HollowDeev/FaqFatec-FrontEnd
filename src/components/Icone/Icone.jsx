import { Book, Cards, Code, GraduationCap, OfficeChair } from '@phosphor-icons/react';
import P from 'prop-types';
import { temas } from '../../data/temas';

Icone.propTypes = {
    tema: P.string,
    tamanho: P.number,
    cor: P.string,
    icone: P.string
}

export default function Icone({tema, tamanho, cor, icone = "nenhum"}) {

   let iconeRecebido

   if(icone != "nenhum"){
        iconeRecebido = icone
   } else {
        const temaObj =  temas.filter((item) => item.nome == tema)
        iconeRecebido = temaObj[0].icone
   }
    
  switch(iconeRecebido){
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
        
        case "Cards":
            return(
                <Cards size={tamanho} color={cor} weight="duotone" />
            )
    }
    
}
