import OpenAI from "openai";
import Config from "../config";
import { Interface } from "readline";
import { ChatCompletionMessageParam } from "openai/resources";

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: Config.OPENAI_SECRET_KEY,
    });
  }

  public async prompt(data: Array<ChatCompletionMessageParam>) {
    return await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: data,
    });
  }
}

export default OpenAIService;
