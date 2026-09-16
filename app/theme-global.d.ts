export {};

declare global {
  interface Window {
    ChecktrailTheme?: {
      key: string;
      read: () => unknown;
      apply: (theme: unknown) => void;
    };
  }
}
