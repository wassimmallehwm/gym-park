import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/auth/AuthContext';

import { io, Socket } from 'socket.io-client';
import { Config } from '../../../../config/Config';
import { Input } from '../../../../shared/components/form';
import { Button } from '../../../../shared/components';
import { MessagesService } from '../services';
import { showToast } from '../../../../utils';
import MessageItem from './message-item/MessageItem';


const ChannelMessages = () => {

  let { id } = useParams();
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [socket, setSocket] = useState<Socket | null>()
  const messagesService = new MessagesService();

  const scrollRef = useRef<any>();

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const getMessagesList = () => {
    messagesService.findByChannel(id!).then(
      res => {
        setMessages((prev: any[]) => ([...res.data, ...prev]))
        scrollToBottom()
      },
      error => {
        showToast('error', "An error has occured")
      }
    )
  }


  useEffect(() => {
    setSocket(io(
      Config.getConfig().socketUrl, {
      transports: ['websocket'],
      secure: true,
      autoConnect: true,
      reconnection: false,
      upgrade: false,
      rejectUnauthorized: false,
      reconnectionDelay: 0,
      reconnectionAttempts: 10,
    }))
    getMessagesList()

    return () => {
      socket?.disconnect()
      setSocket(null)
    }
  }, [])

  const appendMessage = (data: any) => {
    setMessages((prev: any[]) => ([...prev, data]))
    scrollToBottom()
  }

  useEffect(() => {
    socket?.emit("join_channel", id);

    socket?.on('message_recieved', data => {
      appendMessage(data)
    })
  }, [socket])


  const onSendMessage = async (event: any) => {
    event.preventDefault()
    try {
      const { data } = await messagesService.createMessage({
        sender: user._id,
        channel: id,
        message
      })
      appendMessage(data)
      setMessage('')
      socket?.emit("message", data);
    } catch (e: any) {
      console.log(e)
      showToast('error', "Error sending message")
    }
  }

  return (
    <div className="messenger">
      <div className="flex-col justify-end chatBox block overflow-y-auto">
        {
          messages.length > 0 && messages.map(
            (message: any) =>
              <MessageItem key={message._id} messageData={message} />
          )
        }
        <div ref={scrollRef}></div>
      </div>

      <div className="fixed bottom-8 left-0 w-full">
        <form>
          <div className="flex items-center justify-between gap-4 px-8">
            <Input value={message} onChange={(e: any) => setMessage(e.target.value)}
              name="message" textarea="true" />
            <Button onClick={onSendMessage} type="submit" color='primary' outline>
              Send
            </Button>
            <input type="submit" className='hidden' />                      </div>
        </form>
      </div>
    </div>
  )
}

export default ChannelMessages