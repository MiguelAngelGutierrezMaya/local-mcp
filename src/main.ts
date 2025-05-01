import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { GeocodingResult, WeatherData } from './interfaces.js';

// External urls
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

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
      // Obtener las coordenadas geográficas de la ciudad
      const geocodingUrl = `${GEOCODING_URL}?name=${encodeURIComponent(
        city
      )}&count=10&language=en&format=json`;

      const response = await fetch(geocodingUrl);
      const data = (await response.json()) as GeocodingResult;

      if (!data.results || data.results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Data for ${city} not found`,
            },
          ],
        };
      }

      const { latitude, longitude } = data.results[0];

      // Obtener los datos del clima usando las coordenadas
      const weatherUrl = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&timezone=auto&forecast_days=1`;

      const weatherResponse = await fetch(weatherUrl);
      const weatherData = (await weatherResponse.json()) as WeatherData;

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
