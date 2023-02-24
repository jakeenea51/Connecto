import 'express'
import 'express-session'
import type { User } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      SESSION_SECRET: string
      JWT_SECRET: string
    }
  }

  namespace Express {
    interface Request {
      user: User | null
      logIn: (user: User) => Promise<void>
      logOut: () => Promise<void>
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

export {}
