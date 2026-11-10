import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    console.log(name, email, password, passwordConfirmed);
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
