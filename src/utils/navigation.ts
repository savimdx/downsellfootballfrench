export function redirectWithParams(destination: string): void {
  const currentParams = window.location.search;

  if (!currentParams) {
    window.location.href = destination;
    return;
  }

  if (destination.includes("?")) {
    window.location.href = destination + "&" + currentParams.substring(1);
  } else {
    window.location.href = destination + currentParams;
  }
}

if (typeof window !== 'undefined') {
  (window as any).redirectWithParams = redirectWithParams;
}
