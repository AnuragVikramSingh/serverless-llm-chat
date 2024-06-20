import React, { useState, useEffect, KeyboardEvent } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { Conversation } from "../common/types";
import ChatMessages from "../components/ChatMessages";
import LoadingGrid from "../../public/loading-grid.svg";

let converstationHistory: any = []

const Document: React.FC = () => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = React.useState<string>("idle");
  const [messageStatus, setMessageStatus] = useState<string>("idle");
  const [prompt, setPrompt] = useState("");

  const fetchData = async () => {
    setLoading("loading");

    let conversation = {
      messages: converstationHistory
    }
    
    setConversation(conversation);

    setLoading("idle");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const addConversation = (message: any) => {
    converstationHistory.push(message)
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      submitMessage();
    }
  };

  const submitMessage = async () => {
    setMessageStatus("loading");

    if (conversation !== null) {
      addConversation({
        type: "text",
        data: {
          content: prompt,
          example: false,
          additional_kwargs: {},
        }
      })
      fetchData()
    }

    let response = await API.post(
      "serverless-pdf-chat",
      `/message`,
      {
        body: {prompt: prompt},
      }
    );

    setPrompt("");

    addConversation({
      type: "ai",
      data: {
        content: response,
        example: false,
        additional_kwargs: {},
      }
    })

    fetchData()
    setMessageStatus("idle");
  };

  return (
    <div className="">
      {loading === "loading" && !conversation && (
        <div className="flex flex-col items-center mt-6">
          <img src={LoadingGrid} width={40} />
        </div>
      )}
      {true && (
        <div className="grid grid-cols-12 border border-gray-200 rounded-lg">
          <ChatMessages
            prompt={prompt}
            conversation={conversation}
            messageStatus={messageStatus}
            submitMessage={submitMessage}
            handleKeyPress={handleKeyPress}
            handlePromptChange={handlePromptChange}
          />
        </div>
      )}
    </div>
  );
};

export default Document;
