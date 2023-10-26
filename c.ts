import { expect, request } from "@playwright/test";

async function getCatInfo() {
  const req = await request.newContext();
  const response = await req.get(`https://catfact.ninja/fact`);
  console.log(response.status());
}

getCatInfo();
