import axios from "axios";
import { endPointsUrl } from "../../../../services/endpoints";

export async function POST(request) {
  try {
    const data = await request.json();
    const payload = data?.payload;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")?.[1];
    if (!token) {
      return Response.json({ message: "No token provided" }, { status: 401 });
    }
    const response = await axios.post(`http://localhost:8000/${endPointsUrl?.[data?.key]}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
}
