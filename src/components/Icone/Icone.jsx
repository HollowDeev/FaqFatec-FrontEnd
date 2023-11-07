import { Book, Cards, Code, GraduationCap, OfficeChair } from '@phosphor-icons/react';
import P from 'prop-types';

Icone.propTypes = {
    tamanho: P.number,
    cor: P.string,
    icone: P.string
}

export default function Icone({tamanho, cor, icone}) {

  
    
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
        
        case "Cards":
            return(
                <Cards size={tamanho} color={cor} weight="duotone" />
            )
    }
    
}
