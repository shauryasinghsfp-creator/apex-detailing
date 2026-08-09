import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely with conditional support.
 * @param  {...any} inputs - class names / conditional objects
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
