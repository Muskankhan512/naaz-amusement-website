import { defaultHomeContent } from "./src/lib/content";

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

  console.log("Syncing default content...");
  const updateRes = await fetch(`${SITE_URL}/api/content`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Cookie": cookies || ""
    },
    body: JSON.stringify({ data: defaultHomeContent })
  });

  if (updateRes.ok) {
    console.log("Successfully synced default content to live database!");
  } else {
    console.error("Failed to sync content:", await updateRes.text());
  }
}

sync();
