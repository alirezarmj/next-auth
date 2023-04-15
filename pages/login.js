import LoginSignup from '@/components/login-signup-form/login-signup-form'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) {
    return <p className="text-xl text-center p-6">Loading...</p>
  }
  return (
    <LoginSignup />
  )
}

export default LoginPage