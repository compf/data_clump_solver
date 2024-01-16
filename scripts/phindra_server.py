import json,os
import requests
import time
import socket
import struct
from transformers import AutoTokenizer, LlamaForCausalLM


model_path = "Phind/Phind-CodeLlama-34B-v2"
global_temperature=0.1
model = LlamaForCausalLM.from_pretrained(model_path, device_map="auto",offload_folder = "offload_folder")
tokenizer = AutoTokenizer.from_pretrained(model_path,offload_folder = "offload_folder")
tokenizer.pad_token = tokenizer.eos_token

def generate_one_completion(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=4096)

    # Generate
    generate_ids = model.generate(inputs.input_ids.to("cpu"), max_new_tokens=384, do_sample=True, top_p=0.75, top_k=40, temperature=global_temperature)
    completion = tokenizer.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]
    return completion

start_time=time.time()
print(generate_one_completion("What is 1+1?"))
end_time=time.time()
elapsed=end_time-start_time
#print("elapsed",elapsed)
PORT=1997
HOST="127.0.0.1"
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        while True:
            l=conn.recv(4)
            l=struct.unpack("i",l)[0]
            request=conn.recv(l).decode("utf-8")
            if request=="exit":
                break
            elif request.startswith("set_temperature"):
                global_temperature=float(request.split()[1])
                print("temperature set to",global_temperature)

            else:
                reps=generate_one_completion(request)
                print(reps)
                conn.sendall(struct.pack("i",len(reps)))
                conn.sendall(reps.encode("utf-8"))
