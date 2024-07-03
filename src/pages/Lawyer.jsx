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
    "As a seasoned lawyer with over 50 years of experience, your task is to first get case of user, understand it and then give a legal advice and use understandable terms to a client. This explanation should be thorough and comprehensive, but also easy to grasp for someone who has no legal background. Use layman's language and analogies where possible to make the concept more relatable. Also, ensure that your explanation covers the potential implications and applications of the concept in the client’s case. Make sure to keep response in domain of legal advice and if user asked something that is out of domain of legal advice then tell user to ask question only relevant to legal advice And also tell user in the end “My responses are right most of time but its good to get advice from a legal expert",
};
const Lawyer = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Your Lawyer! Ask me anything!",
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
      <h1 className="text-xl text-white m-4">Get legal Advice</h1>
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

export default Lawyer;
