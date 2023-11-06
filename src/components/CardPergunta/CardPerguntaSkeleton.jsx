import { Skeleton } from "@nextui-org/react"


const CardPerguntaSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-5">
        <div className="w-full h-20 rounded-2xl p-6 bg-content2 bg-opacity-70 flex items-center gap-6">
            <Skeleton className="rounded-full w-14 h-14"></Skeleton>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-80 h-4 rounded-xl"></Skeleton>
                <Skeleton className="w-32 h-2 rounded-xl"></Skeleton>
            </div>
        </div>
        <div className="w-full h-20 rounded-2xl p-6 bg-content2 bg-opacity-70 flex items-center gap-6">
            <Skeleton className="rounded-full w-14 h-14"></Skeleton>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-80 h-4 rounded-xl"></Skeleton>
                <Skeleton className="w-32 h-2 rounded-xl"></Skeleton>
            </div>
        </div>
        <div className="w-full h-20 rounded-2xl p-6 bg-content2 bg-opacity-70 flex items-center gap-6">
            <Skeleton className="rounded-full w-14 h-14"></Skeleton>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-80 h-4 rounded-xl"></Skeleton>
                <Skeleton className="w-32 h-2 rounded-xl"></Skeleton>
            </div>
        </div>
        <div className="w-full h-20 rounded-2xl p-6 bg-content2 bg-opacity-70 flex items-center gap-6">
            <Skeleton className="rounded-full w-14 h-14"></Skeleton>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-80 h-4 rounded-xl"></Skeleton>
                <Skeleton className="w-32 h-2 rounded-xl"></Skeleton>
            </div>
        </div>
        <div className="w-full h-20 rounded-2xl p-6 bg-content2 bg-opacity-70 flex items-center gap-6">
            <Skeleton className="rounded-full w-14 h-14"></Skeleton>
            <div className="flex flex-col gap-3">
                <Skeleton className="w-80 h-4 rounded-xl"></Skeleton>
                <Skeleton className="w-32 h-2 rounded-xl"></Skeleton>
            </div>
        </div>
    </div>
  )
}

export default CardPerguntaSkeleton