import { getSession } from "next-auth/react";

async function getAuthToken() {
  const session = await getSession();

  return session?.accessToken;
}

export default getAuthToken;
