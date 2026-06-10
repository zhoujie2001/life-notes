export function TagChip({ label }: { label: string }) {
  return <span className="rounded-full border border-leaf-200 bg-white px-3 py-1 text-xs text-leaf-700">#{label}</span>;
}
