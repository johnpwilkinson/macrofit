export default function ChartCard({ title, desc, chart, chart2 }) {
  return (
    <div className="w-full h-auto flex flex-col border-none">
      <div className="p-0">
        <div className="text-xl font-black  leading-none tracking-tight">
          {title}
        </div>
        <div className="sr-only">{desc}</div>
      </div>
      <div className="flex-1 p-0">
        {/* Use flexbox to display the charts side by side if chart2 exists */}
        <div className={`flex ${chart2 ? "" : "flex-col"}`}>
          <div className="">{chart}</div>
          {chart2 && <div className="flex-1">{chart2}</div>}
        </div>
      </div>
    </div>
  );
}
