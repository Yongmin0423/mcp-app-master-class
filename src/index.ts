import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { createMcpHandler } from "agents/mcp";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		//mcp 서버 생성
		const server = new McpServer({
			name: "Stock server",
			version: "1.0.0",
		});

		// 명세 정의
		server.registerTool("get-stock-price", {
			description: "Get the price of a stock given a ticker symbol.",
			inputSchema: {
				symbol: z.string().optional(),
			},
		}, async ({ symbol }) => {
			const actualSymbol = symbol ?? "AAPL";
			return {
				content: [
					{ type: "text", text: `The price of ${actualSymbol} is $123.45` }
				]
			}
		})

		const handler = createMcpHandler(server);
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
