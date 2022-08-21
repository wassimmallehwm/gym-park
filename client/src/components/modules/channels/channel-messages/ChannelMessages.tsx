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
import { SocketContext } from 'src/contexts/socket/SocketContext';


const ChannelMessages = () => {

  let { id } = useParams();
  const { user } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
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
        let list: any[] = [];
        for (let index = 0; index < res.data.length; index++) {
          if(messages.find((elem: any) => elem._id === res.data[index]._id) == undefined){
            list.push(res.data[index])
          }
        }
        setMessages((prev: any[]) => ([...list, ...prev]))
        scrollToBottom()
      },
      error => {
        showToast('error', "An error has occured")
      }
    )
  }


  useEffect(() => {
    getMessagesList()
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