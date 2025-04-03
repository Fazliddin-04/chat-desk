export interface IUser {
  name: string
  isBot?: boolean
  isAgent?: boolean
}

export interface IMessage {
  text: string
  actions?: { text: string }[]
  user: IUser
  hasAgentConnected?: boolean
}

export interface IChat {
  title: string
  description: string
  agent: IUser | null
  customer: IUser | null
  messages: IMessage[]
  status: 'new' | 'open' | 'pending' | 'closed'
}
