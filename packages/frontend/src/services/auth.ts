import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
  });

  return res.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return res.data;
};
