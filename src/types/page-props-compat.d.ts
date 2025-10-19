// Make PageProps accept BOTH promised and non-promised params to satisfy differing defs.
declare global {
  type PageProps<TParams extends Record<string, string> = {}> = {
    params: TParams | Promise<TParams>;
    searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
  };
}
export {};
