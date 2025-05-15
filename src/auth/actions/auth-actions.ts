import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export const signInCredentials = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });
  //si no encotro user, creelo en createUser
  if (!user) {
    const user = await createUser(email, password);
    return user;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma?.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
      roles: ["user"],
    },
  });
  return user;
};

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
