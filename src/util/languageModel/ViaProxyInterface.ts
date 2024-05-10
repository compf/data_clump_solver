import http from "http";
import axios, { AxiosResponse } from 'axios';

// Define a type for the proxy configuration
interface ProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
}

// Configure the HTTP proxy
const proxySettings: ProxyConfig = {
  host: 'www-proxy.rz.uni-osnabrueck.de', // Replace with your proxy's hostname or IP
  port: 80,              // Replace with your proxy's port
 
};

// Create an Axios instance with proxy configuration

export class ViaProxyInterface{
    send(test:string){
        const axiosInstance = axios.create({
            proxy: proxySettings
          });
        axiosInstance.get('http://37.221.197.246:8000/')
        .then((response: AxiosResponse) => {
          console.log('Data received:', response.data);
        })
        .catch((error: any) => {
          console.error('Error making request:', error);
        });
       
    }
}

/*
let req=http.request({
    host:"www-proxy.rz.uni-osnabrueck.de",
    port:80,
    method:"GET",
    pathname:"http://37.221.197.246:8000/ HTTP/1.1"
    

   },(resp)=>{
    resp.on("data",(d:Buffer)=>{
        console.log(d.toString())
    });
   })
   req.write("HELLO")
   req.end()*/