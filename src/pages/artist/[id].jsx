import React from 'react'
import { useRouter } from "next/router";

export default function ArtistPage() {
  const router = useRouter()
  const { id } = router.params;
  return (
  <div>{id}</div>
  )
}
