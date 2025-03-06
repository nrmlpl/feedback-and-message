"use client"

import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { apiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const { data: session } = useSession()
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const { register, watch, setValue } = form

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)

    try {
      const response = await axios.get<apiResponse>('/api/accept-messages')
      if (typeof response.data.isAcceptingMessage !== 'undefined') {
        setValue('acceptMessages', response.data.isAcceptingMessage);
      } else {
        console.error("API response missing isAcceptingMessage:", response.data);
        toast.error("Unexpected response format");
      }
      console.error("API response missing isAcceptingMessage");
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch message message settings")
    } finally {
      setIsSwitchLoading(false)
    }


  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)

    try {
      const response = await axios.get<apiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])

      if (refresh) {
        toast.error(
      }
    } catch (error) {
      
    }
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default page