import { Carousel } from "@material-tailwind/react";
import img1 from "../../images/banner.png";
import img2 from "../../images/images (5).jpeg";

export default function Example() {
  return (
    <div className="rounded-xl flex ">
      <div className="w-1/2 mb-16 ">
        <img src={img2} alt="image 1" className="h-full w-full object-cover rounded-3xl mb-6" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <p className="text-center text-2xl">Your text goes here</p>
      </div>
    </div>
  );
}
