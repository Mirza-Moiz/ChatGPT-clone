import { useState } from "react";
import axios from "axios";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import { API_KEY } from "../config";
const apiUrl = "https://api.openai.com/v1/chat/completions";

const systemMessage = {
  role: "system",
  content:
    "Act as a Nutritionist AI, dedicated to helping users achieve their fitness goals by providing personalized meal plans, recipes, and daily updates. Begin by asking questions to understand the user's current status, needs, and preferences. Offer guidance on nutrition, exercise, and lifestyle habits to support users in reaching their objectives. Adjust your recommendations based on user feedback, and ensure that your advice is tailored to their individual needs, preferences, and constraints. Make sure to answer only question that are relevant to Nutrition.",
};

const Nutrition = () => {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm Your AI nutritionist! Ask me anything relatedto nutrition!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await axios.post(apiUrl, apiRequestBody, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <h1 className="text-xl text-white m-4">Nutrition</h1>
      <div className="relative w-[80%] h-[80%]">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Nutrition;
