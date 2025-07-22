type SearchResultProps = {
    title: string;
    time: string;
    price: string | number;
};


export default function SearchResult({ title, time, price }: SearchResultProps) {
    return (
        <div className="flex w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 max-h-16">
            <div className="flex justify-between flex-1 p-4">
                <div>{title}</div>
                <div className="text-right">{time}</div>
            </div>
        </div>
    )
}