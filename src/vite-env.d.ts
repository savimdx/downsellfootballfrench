/// <reference types="vite/client" />

declare function redirectWithParams(destination: string): void;

interface Window {
  redirectWithParams: (destination: string) => void;
}

