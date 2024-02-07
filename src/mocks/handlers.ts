import { http, delay, HttpResponse } from "msw";

const handlers = [
  http.get("/products", async () => {
    await delay(500);
    return HttpResponse.json({ products }, { status: 200 });
  }),
];

export default handlers;

const products = [
  {
    name: "Product 1",
    price: 100,
  },
  {
    name: "Product 2",
    price: 200,
  },
  {
    name: "Product 3",
    price: 150,
  },
];
