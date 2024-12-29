'use client'

import { useCookies } from 'react-cookie'
import {
  createClientComponentClient,
  Session,
  User,
} from '@supabase/auth-helpers-nextjs'
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'

type UserType = {
  session: Session | null
  token: string | null
  user: User | null
}

const UserContext = createContext<UserType | undefined>({
  session: null,
  token: null,
  user: null,
})

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [cookies, setCookie] = useCookies(['token'])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const session = await supabase.auth.getSession()

      setSession(session.data.session)
      setUser(user)
    }

    getUser()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        setCookie('token', session?.access_token, { path: '/' })
        setSession(session)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setSession(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, setUser, setCookie])

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        token: cookies?.token,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider')
  }
  return {
    id: context?.user?.id ?? null,
    token: context?.token ?? null,
    email: context.user?.email ?? null,
  }
}
