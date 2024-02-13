import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "./Item";

function App() {
  const [items, setItems] = useState([
    {
      name: "상품1",
      price: 10000,
      imageUrl: "https://picsum.photos/id/1/200/300",
    },
    {
      name: "상품2",
      price: 20000,
      imageUrl: "https://picsum.photos/id/2/200/300",
    },
    {
      name: "상품3",
      price: 30000,
      imageUrl: "https://picsum.photos/id/3/200/300",
    },
    {
      name: "상품4",
      price: 40000,
      imageUrl: "https://picsum.photos/id/4/200/300",
    },
  ]);

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
