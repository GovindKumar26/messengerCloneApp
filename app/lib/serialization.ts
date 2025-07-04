import SuperJSON from "superjson";

export const serialize = <T>(data: T): string => SuperJSON.stringify(data);
export const deserialize = <T>(data: string): T => SuperJSON.parse(data);
