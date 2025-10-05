import * as dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Products are available at  http://localhost:${PORT}/api/products`
  );
  console.log(`Checkout is available at http://localhost:${PORT}/api/checkout`);
});
