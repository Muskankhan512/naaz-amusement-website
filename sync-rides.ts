import fetch from "node-fetch";

const SITE_URL = "https://naaz-amusement-website.vercel.app";

async function sync() {
  console.log("Logging in as admin...");
  const loginRes = await fetch(`${SITE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "naazamusement@gmail.com", password: "Angel@infinite1" })
  });

  if (!loginRes.ok) {
    console.error("Login failed:", await loginRes.text());
    return;
  }

  const cookies = loginRes.headers.get("set-cookie");
  console.log("Got cookies successfully");

  console.log("Resetting database rides to default...");
  const updateRes = await fetch(`${SITE_URL}/api/db-reset`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Cookie": cookies || ""
    }
  });

  if (updateRes.ok) {
    console.log("Successfully reset rides in live database!");
  } else {
    console.error("Failed to reset rides:", await updateRes.text());
  }
}

sync();
