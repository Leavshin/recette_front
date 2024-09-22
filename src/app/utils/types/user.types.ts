import {Inventory} from "./inventory.types";

export type User = {
    id: number;
    name: string,
    email: string,
    password?: string
    admin?: boolean
    inventories?: Inventory[]
  }