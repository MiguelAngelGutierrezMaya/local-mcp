import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getWeather } from './weatherImp.js';

// 1. Create a server
// Is the principal interface with the MCP protocol
const server = new McpServer({
  name: 'mcp-server',
  version: '1.0.0',
});

// 2. Define the tools
server.tool(
  'fetch-weather', // Tool title
  'Fetch the weather for a given city', // Tool description
  {
    city: z.string().describe('The city to fetch the weather for'), // Tool parameters
  },
  async ({ city }): Promise<CallToolResult> => {
    try {
      const weatherData = await getWeather(city);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(weatherData, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching weather data: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// 3. Listen for connections
const transport = new StdioServerTransport();
await server.connect(transport);
