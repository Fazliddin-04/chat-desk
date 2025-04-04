export interface IUser {
  name: string
  phone_number: string
  identifier: string
  email?: string
  avatar_url?: string
  custom_attributes?: {
    [key: string]: string
  }
}

export interface IMessage {
  hasAgentConnected?: boolean
  content: string
  content_attributes?: { [key: string]: string }
  content_type?: 'text'
  conversation_id?: number | string
  created_at?: number
  id: number
  message_type?: 0 | 1
  sender_id?: string | null
  sender?: {
    availability_status: null
    available_name: string
    avatar_url: string
    id: 119273
    name: string
    thumbnail: ''
    type: 'user' | 'contact' | 'bot'
  }
}

export interface IChat {
  title: string
  description: string
  agent: IUser | null
  customer: IUser | null
  messages: IMessage[]
  status: 'new' | 'open' | 'pending' | 'closed'
}
