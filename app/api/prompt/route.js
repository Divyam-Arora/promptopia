import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const search = req.nextUrl.searchParams.get("search");

    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: new RegExp(search, "i") } },
        { tag: { $regex: new RegExp(search, "i") } },
        // {creator: {$regex: new RegExp(search, "i")}}
      ],
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
