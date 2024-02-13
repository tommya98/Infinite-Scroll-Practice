import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "./Item";

interface ItemProps {
  name: string;
  price: number;
  imageUrl: string;
}

interface IResponseContent {
  responseContent: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    products: ItemProps[];
  };
}

const PAGE_SIZE = 40;

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setFetching] = useState(false);

  const fetchItems = useCallback(async () => {
    const response = await Axios.get<IResponseContent>(
      `/products?page=${pageNumber}&size=${PAGE_SIZE}`
    );
    const { products, page, totalPages } = response.data.responseContent;

    setItems((prevItems) => [...prevItems, ...products]);
    setPageNumber(page + 1);
    setHasNextPage(page < totalPages);
    setFetching(false);
  }, [pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      // console.log(scrollTop, offsetHeight, window.innerHeight);
      if (
        window.innerHeight + scrollTop >=
        offsetHeight - window.innerHeight * 2
      ) {
        setFetching(true);
      }
    };
    setFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchItems();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        {items.map((item, idx) => {
          return (
            <Grid xs={3} key={idx}>
              <Item
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default App;
