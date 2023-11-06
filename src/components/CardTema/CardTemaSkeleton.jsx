import { Skeleton } from "@nextui-org/react"

const CardTemaSkeleton = () => {
  return (
    <>
        <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center hover:translate-y-[-20px] cursor-pointer transition-transform" >
            <Skeleton className="h-20 w-20 rounded-2xl"></Skeleton>

            <Skeleton className="w-28 h-5 rounded-xl"></Skeleton>
        </div>
        <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center hover:translate-y-[-20px] cursor-pointer transition-transform" >
            <Skeleton className="h-20 w-20 rounded-2xl"></Skeleton>

            <Skeleton className="w-28 h-5 rounded-xl"></Skeleton>
        </div>
        <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center hover:translate-y-[-20px] cursor-pointer transition-transform" >
            <Skeleton className="h-20 w-20 rounded-2xl"></Skeleton>

            <Skeleton className="w-28 h-5 rounded-xl"></Skeleton>
        </div>
        <div className="w-36 h-36 sm:w-52 sm:h-52 bg-content2 rounded-2xl bg-opacity-60 p-5 text-center flex flex-col justify-between items-center hover:translate-y-[-20px] cursor-pointer transition-transform" >
            <Skeleton className="h-20 w-20 rounded-2xl"></Skeleton>

            <Skeleton className="w-28 h-5 rounded-xl"></Skeleton>
        </div>
    </>
  )
}

export default CardTemaSkeleton