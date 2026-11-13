import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import z from "zod";
import { ZodError } from "zod";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import { api } from "../services/api";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid E-mail" }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 digits" }),
    passwordConfirmed: z.string({ message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.passwordConfirmed, {
    message: "Password does not match",
    path: ["passwordConfirmed"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirmed,
      });

      await api.post("/users", data);

      if (confirm("Sign up successfully. Do you want to Login?")) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
      alert("Could not Sign Up");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Name"
        placeholder="Type your name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seuemail@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        legend="Password"
        type="password"
        placeholder="123456"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        required
        legend="Confirm Password"
        type="password"
        placeholder="123456"
        onChange={(e) => setPasswordConfirmed(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Create account
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-0 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Already Signed Up
      </a>
    </form>
  );
}
