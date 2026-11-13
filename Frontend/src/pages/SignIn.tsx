import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useActionState } from "react";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";

const signInScheme = z.object({
  email: z.string().email({ message: "Invalid E-mail" }),
  password: z.string().trim().min(1, { message: "Type password" }),
});

export function SignIn() {
  const [state, formaAction, isLoading] = useActionState(signIn, null);

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInScheme.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/sessions", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return alert("Could not login");
    }

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("ok");
    //   }, 700);
    // });
  }
  return (
    <form action={formaAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        // required
        formNoValidate
        legend="E-mail"
        // type="email"
        placeholder="seuemail@email.com"
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        name="password"
        // required
        formNoValidate
        legend="Senha"
        type="password"
        placeholder="123456"
        // onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-0 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
