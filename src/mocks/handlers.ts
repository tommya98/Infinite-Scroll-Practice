import { http, delay, HttpResponse } from "msw";

const handlers = [
  http.get("/products", async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));
    const start = (page - 1) * size;
    const end = start + size;

    const paginatedItems = products.slice(start, end);

    const responseContent = {
      page,
      size,
      total: products.length,
      totalPages: Math.ceil(products.length / size),
      products: paginatedItems,
    };

    return HttpResponse.json({ responseContent }, { status: 200 });
  }),
];

export default handlers;

const products = Array.from(Array(1000).keys()).map((id) => {
  return {
    name: `상품${id}`,
    price: 10000 + id * 100,
    imageUrl: `https://picsum.photos/id/${id}/200/300`,
  };
});
