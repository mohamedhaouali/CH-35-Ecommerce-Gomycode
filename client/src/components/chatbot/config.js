import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../../components/Options/Options";
import Quiz from "../../components/Quiz/Quiz";

const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage(`Hello. What do you want to know`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "javascriptQuiz",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "Adresse",
            answer:
              "Notre societe est situte a Ben Arous",
            id: 1,
          },
          {
            question: "Télephone",
            answer:
              "Vous pouvez nous contacter sur le numero 22476099",
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;
