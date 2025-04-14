import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface IProduct {
    id: string;
    Name: string;
    Images: { url: string | StaticImport }[];
    Description: string | undefined;
    Price: number;
    Status: string;
    Category: string[];
  }