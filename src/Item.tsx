import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface ItemProps {
  name: string;
  price: number;
  imageUrl: string;
}

function Item({ name, price, imageUrl }: ItemProps) {
  return (
    <Card sx={{ maxWidth: 300, margin: "20px auto" }}>
      <CardMedia sx={{ height: 200 }} image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatPrice(price)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Item;

function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString();
  return `${formattedPrice} 원`;
}
