import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/search">Search</Link>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default Home;
