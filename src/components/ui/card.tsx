import { cn } from "@/lib/utils";



export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4 bg-white rounded-lg shadow", className)}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-800">{children}</div>;
}