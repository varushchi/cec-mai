'use client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Profile() {
  const params = useParams<{userid: string}>()
  const router = useRouter()
  const currentUserid = 'vadimaty'

  useEffect(() => {
    if (currentUserid !== params.userid) {
      router.push('/')
    }
  }, [currentUserid, params.userid, router])
  
  if (currentUserid !== params.userid) {
    return null
  }
  
  return (
    <div>
      <h1>Profile page for {params.userid}</h1>
    </div>
  );
}