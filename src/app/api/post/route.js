import axios from "axios";
import { endPointsUrl } from "../../../../services/endpoints";

export async function POST(request) {
  try {
    const data = await request.json();
    const payload = data?.payload;
    const response = await axios.post(`http://localhost:8000/${endPointsUrl?.[data?.key]}`, payload);
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
}