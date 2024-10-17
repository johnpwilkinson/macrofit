import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { addNewUser } from "@/app/lib/actions";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});
console.log("JWKS client initialized", client);
export async function POST(req) {
  try {
    console.log("Webhook received");
    const token = await req.text();
    console.log("Token extracted:", token);

    const { header } = jwt.decode(token, { complete: true });
    const { kid } = header;
    console.log("Decoded JWT header:", header);

    const key = await client.getSigningKey(kid);
    console.log("Signing key retrieved");

    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey);
    console.log("Token verified, event type:", event.type);

    switch (event?.type) {
      case "user.updated":
        console.log("User updated event:", event.data);
        break;
      case "user.created":
        await addNewUser(event.data);
        console.log("User created event processed:", event);
        break;
      default:
        console.log("Unhandled event type:", event.type);
        break;
    }
  } catch (err) {
    console.error(
      "Error during webhook processing:",
      err.message,
      err.stack,
      err
    );
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
