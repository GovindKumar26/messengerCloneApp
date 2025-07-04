import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions"; // ✅ correct way

export default async function getSession() {
  return await getServerSession(authOptions);
}
