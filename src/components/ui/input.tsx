import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full p-2 border rounded-lg" {...props} />;
}
