'use client'

import { useSession, signIn, signOut } from "next-auth/react";

export default function component() {
  const { data: session } = useSession();
  if(session) {
    return (
      <>
      Signed in as {session.user.email} <br />
      <button type="submit" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    Not signed in <br />
    <button type="submit" className="bg-blue-500 rounded-md px-3 py-1 text-white m-4 border-2 border-blue-500" onClick={() => signIn()}>Sign In</button>
    </>
  )
}