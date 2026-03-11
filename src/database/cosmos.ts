import { CosmosClient } from "@azure/cosmos"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const endpoint = "https://localhost:8081"
const key =
"C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
const client = new CosmosClient({
  endpoint,
  key,
  connectionPolicy: {
    enableEndpointDiscovery: false
  }
})

export const database = client.database("mazidb")

export const simulacionesContainer =
  database.container("simulaciones")