import { Skeleton } from "@nextui-org/react"

const CardColaboradoresSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-5">
        <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static">
            <div className="flex items-center h-auto gap-3 relative">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
                </div>
                <div>
                    <Skeleton className="h-5 w-64 rounded-2xl"></Skeleton>
                </div>
            </div>
        </div>
        <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static">
            <div className="flex items-center h-auto gap-3 relative">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
                </div>
                <div>
                    <Skeleton className="h-5 w-64 rounded-2xl"></Skeleton>
                </div>
            </div>
        </div>
        <div className="w-full h-auto bg-content2 bg-opacity-60 rounded-2xl flex flex-col justify-between gap-5 p-3 static">
            <div className="flex items-center h-auto gap-3 relative">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
                </div>
                <div>
                    <Skeleton className="h-5 w-64 rounded-2xl"></Skeleton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardColaboradoresSkeleton