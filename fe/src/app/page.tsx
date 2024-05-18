import Each from "@/components/ui/each";
import Header from "@/components/ui/header";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cardImages } from "@/data";
import { currencyFormate } from "@/utility/common/common";
export default function Home() {
  return (
    <>
      <Header />
      <div className=" grid grid-cols-2 gap-2 p-3 bg-gray-100 mb-4" >
        <Each of={cardImages} render={({ title, description, price, image }: CardImages) => (
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-start items-center w-full">
                <Image className="w-[300px] h-[200px] object-cover rounded" width={200} height={200} src={image} alt="card images" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-[#f37b1d] text-[13px] font-[400]">{currencyFormate('inr', price)}</p>
            </CardFooter>
          </Card>
        )} />
      </div>
    </>
  );
}
