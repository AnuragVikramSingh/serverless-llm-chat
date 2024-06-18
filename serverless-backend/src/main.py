import os, json
import boto3
from aws_lambda_powertools import Logger
from langchain_core.messages import HumanMessage
from langchain_aws import ChatBedrock

logger = Logger()

def get_llm():
        
    model_kwargs = { #anthropic
        "max_tokens": 512,
        "temperature": 0, 
        "top_k": 250, 
        "top_p": 1, 
        "stop_sequences": ["\n\nHuman:"] 
    }
    
    llm = ChatBedrock(
        model_id="anthropic.claude-3-sonnet-20240229-v1:0", #set the foundation model
        model_kwargs=model_kwargs) #configure the inference parameters
    
    return llm


@logger.inject_lambda_context(log_event=True)
def lambda_handler(event, context):
    event_body = json.loads(event["body"])
    human_input = event_body["prompt"]

    llm = get_llm()

    # use llm to make request
    messages = [
        HumanMessage(
            content=human_input
        )
    ]

    response_text = llm.invoke(messages).content

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        "body": json.dumps(response_text),
    }
