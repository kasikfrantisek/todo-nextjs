import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";

export default function SignIn({ providers }: { providers: Provider[] }) {
  const session = useSession();
  console.log(session);
  const router = useRouter();
  const homeUrl: string = "/";
  return (
    <>
      <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
        <h2 className='font-bold text-lg mb-2'>Sign in and organize your tasks</h2>
        {Object.values(providers).map((provider: Provider) => (
          <div key={provider.name}>
            <button
              className='border-solid border-2 border-black p-2 hover:bg-black hover:text-white'
              onClick={async () => {
                return await signIn(provider.id, {
                  callbackUrl: "/",
                });
              }}
            >
              Sign in with {provider.name}
            </button>
            <p className="text-center mt-4 text-xs">Powered by: FocusFlow</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
