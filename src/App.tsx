// Library
import { useSelector } from "react-redux";

// Store
import { selectContainers } from "./store/slice/productSlice";

function App() {
  const onClickChangeImage = (newImageUrl: any) => {
    // Gửi thông điệp đến phần container bên ngoài
    window.parent.postMessage(
      {
        type: "CHANGE_IMAGE",
        payload: newImageUrl,
      },
      "http://localhost:3000" // Đây là origin của container
    );
  };

  const relatedProduct = useSelector(selectContainers);

  return (
    <div
      style={{ width: 200 }}
      className="relative border-dashed border-2 border-green-300 p-2 rounded"
    >
      <div className="absolute -top-8 left-0 text-green-300 font-bold">
        Team Product (
        <a
          target="_blank"
          href="https://github.com/dotuan9x/micro-frontends/tree/master/react-example/products"
          rel="noreferrer"
        >
          products
        </a>
        )
      </div>
      <h1 className="text-base font-medium">Related products</h1>
      <ul className="flex flex-col">
        {relatedProduct.map((product) => (
          <li
            className="cursor-pointer"
            onClick={() => onClickChangeImage(product)}
          >
            <img style={{ width: 180 }} alt="" src={product.image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
