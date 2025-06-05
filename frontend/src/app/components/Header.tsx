export default function Header({ title }: { title: string }) {
    return (
    <div className="flex flex-col items-center gap-12 bg-[#16161a]  p-8">
        <h1 className="text-3xl font-bold text-[#eebbc3] mb-4">{title}</h1>
    </div>
    );}