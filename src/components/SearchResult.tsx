type SearchResultProps = {
    title: string;
    time: string;
    price: string | number;
};


export default function SearchResult({ title, time, price }: SearchResultProps) {
    return (
        <div className="flex w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
                src='canoeclub.jpg'
                alt={title}
                className="w-48"
            />
            <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 text-sm mt-1">{time}</p>
                </div>
                <div className="text-right">
                <p className="text-lg font-bold text-green-600">{price}</p>
                </div>
            </div>
            </div>
    )
}