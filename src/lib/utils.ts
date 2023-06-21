import { ClassValue, clsx } from "clsx";
import { twMerge } from 'tailwind-merge';

// py-2 px-2 --> p-2 optimizes the classes for better readbility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}