import axios from "axios";
import FormData from "form-data";
import { endPointsUrl } from "../../../../services/endpoints";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")?.[1];
    if (!token) {
      return Response.json({ message: "No token provided" }, { status: 401 });
    }
    let response;
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("multipart/form-data")) {       
      const form = new FormData();
      const incoming = await request.formData();
      for (const [key, value] of incoming.entries()) {
        if (typeof value === "object" && "arrayBuffer" in value) {
          const buffer = Buffer.from(await value.arrayBuffer());
          form.append(key, buffer, value.name);
        } else {
          form.append(key, value);
        }
      }
      response = await axios.post(`https://low-code-backend-vyps.vercel.app/api/upload-image`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const data = await request.json();
      const payload = data?.payload;
      response = await axios.post(`https://low-code-backend-vyps.vercel.app/${endPointsUrl?.[data?.key]}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    const res = new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://low-code-frontend-delta.vercel.app",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    return res;
  } catch (error) {
    return Response.json({ message: "Something Went Wrong!90" });
  }
}
