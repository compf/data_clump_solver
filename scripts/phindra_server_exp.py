import json,os
import requests
import time
import socket
import struct
import torch
from transformers import AutoTokenizer, LlamaForCausalLM
device = "cuda" if torch.cuda.is_available() else "cpu"
print("DEVICE:",device)
def measure_time(key:str,func):
    start_time=time.time()
    result=func()
    end_time=time.time()

    elapsed=end_time-start_time
    print("elapsed at",key,elapsed)
    return result
model_path = "Phind/Phind-CodeLlama-34B-v2"
global_temperature=0.1
model = LlamaForCausalLM.from_pretrained(model_path).to(device)
tokenizer = AutoTokenizer.from_pretrained(model_path)
tokenizer.pad_token = tokenizer.eos_token

def generate_one_completion(prompt: str):
    inputs = measure_time("tokenizer", lambda:tokenizer(prompt, return_tensors="pt", truncation=True, max_length=4096))
    inputs=inputs.to(device)
    generate_ids = measure_time("generate", lambda:model.generate(inputs.input_ids.to("cpu"), max_new_tokens=384, do_sample=True, top_p=0.75, top_k=40, temperature=global_temperature))
    completion = measure_time("decode", lambda:tokenizer.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0])
    return completion

print(generate_one_completion("What is 1+1?"))
while True:
    print(generate_one_completion(input("prompt: ")))
