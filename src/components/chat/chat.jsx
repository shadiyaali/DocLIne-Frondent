import React, { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios';
import ChatSidebar from './chatSidebar';
import { Avatar } from "@material-tailwind/react";
import { BASE_URL } from '../../utils/config';

const ChatComponent = () => {
  const [author, setAuthor] = useState('');
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState({});

  const scroll = useRef();
  const socketRef = useRef(null);

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const decodedToken = jwtDecode(localResponse);
    setAuthor(decodedToken.user_id);

    axios
      .get(`${BASE_URL}/chat/rooms/`)
      .then((response) => {
        setRooms(response.data);
        setActiveRoomId(response.data[0]?.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (activeRoomId) {
      socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${activeRoomId}/`);

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(event,"hloooo")
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      axios
        .get(`${BASE_URL}/chat/rooms/${activeRoomId}/messages/`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [activeRoomId]);

  const sendMessage = () => {
    const messageData = {
      content: newMessage,
      author: author,
      room_id: activeRoomId,
    };

    axios
      .post(`${BASE_URL}/chat/rooms/${activeRoomId}/messages/`, messageData)
      .then((response) => {
        const newMessageData = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessageData]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(messageData));
    }

    setNewMessage('');
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });

    async function getUser() {
      try {
        const response = await axios.get(`${BASE_URL}/api/getSingleUser/${author}`);
        setUser(response?.data?.userDetails);
      } catch (e) {
        console.log(e);
      }
    }
    
    getUser();
  }, [messages]);

  return (
    <div className="flex h-screen rounded-md bg-gray-200 mt-20 mb-20">
      <ChatSidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        setActiveRoomId={setActiveRoomId}
      />
      <div className="flex-grow">
        <div className="flex flex-col h-screen">
          <div className="py-4 px-6 bg-teal-100 text-white">
            <h2 className="text-xl font-bold">Share your views</h2>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
          {messages.length > 0 ? (
  messages.map((message, index) => (
    <div
      key={index}
      ref={scroll}
      className={`flex ${
        message.author === author ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
        <div className="flex items-center">
          {message.author?.id === author ? (
            <>
              <div className="mr-3 text-red-600">{message.content}</div>
            </>
          ) : (
            <>
              <Avatar
                src={BASE_URL+message?.author?.image}
                alt="avatar"
                size="xs"
                className="mr-3 rounded-full h-6 w-6"
              />
              <div className=' text-red-500'>{message.content}</div>
            </>
          )}
        </div>
      </div>
  ))
) : (
  <div className="text-center text-gray-500">No messages yet</div>
)}

          </div>
          <div className="py-4 px-6 bg-gray-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-teal-300 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
