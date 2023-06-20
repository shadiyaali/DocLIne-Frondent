import { Carousel } from "@material-tailwind/react";
import img1 from "../../images/banner.png";
import img2 from "../../images/banner3.jpg";

 
export default function Example() {
  return (
    <Carousel className="rounded-xl">
      <img
        src={img1}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={img1}
        alt="image 2"
        className="h-full w-full object-cover h-20px"
      />
      {/* <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      /> */}
    </Carousel>
  );
}
