import NextAuth from "next-auth";
// import { authOptions } from "@lib/options";
import { authOptions } from "../../../lib/options";

export default NextAuth(authOptions);
