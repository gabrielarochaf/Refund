import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds) 
})