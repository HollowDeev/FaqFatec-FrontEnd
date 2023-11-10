
import PropTypes from 'prop-types'
import { useContext, useEffect, useState} from 'react'
import { AuthContext } from './AuthProvider'
import { useNavigate } from 'react-router'
import CardPerguntaSkeleton from '../../components/CardPergunta/CardPerguntaSkeleton'


const RequireAuth = ({children, level=0}) => {

    const { checarAutorizacao } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
   
    const navigate = useNavigate()

    useEffect(() => {
        const verificar = async () => {
            const userdataResponse = await checarAutorizacao()

            if(!userdataResponse) {
                navigate('/login')
                return
            }

            if(userdataResponse && userdataResponse.level < level){
                navigate('/')
                return
            }

            setLoading(false)
        }

        verificar()
    }, [])


    if(loading === false){
        return children
    }else {
        return (
            <div className='w-full lg:w-[900px] xl:w-[1250px] m-auto'>
                <CardPerguntaSkeleton />
            </div>
        )
    }
}

RequireAuth.propTypes = {
    children: PropTypes.node,
    level: PropTypes.number
}

export default RequireAuth

