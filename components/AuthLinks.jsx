import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function AuthLinks({ activeUser }) {
  if (activeUser) {
    return (
      <LogoutLink>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-auto whitespace-nowrap">
          Sign out
        </button>
      </LogoutLink>
    ); // Show sign out if the user is authenticated
  }

  return (
    <>
      <LoginLink>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-auto whitespace-nowrap">
          Sign in
        </button>
      </LoginLink>
      {/* <RegisterLink>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Sign up
        </button>
      </RegisterLink> */}
    </>
  );
}
