export default function StatCard({ label, value, delay }: { label: string, value: string, delay: string }) {
    return (
        <div
            className="group p-4 transition-transform duration-300 hover:-translate-y-2 cursor-default overflow-y-hidden  rounded-md"
        >
            <p
                className="text-4xl md:text-5xl font-bold text-[var(--site-pink)] mb-2 group-hover:text-[var(--site-pink)] transition-colors duration-300 overflow-y-hidden"
            >
                {value}
            </p>
            <p className="text-xl md:text-sm uppercase tracking-widest text-white group-hover:text-gray-300 transition-colors duration-300 truncate">
                {label}
            </p>
        </div>
    );
}