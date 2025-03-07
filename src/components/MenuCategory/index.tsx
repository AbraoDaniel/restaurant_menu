import { Col, Row } from "antd";
import { Forum, Inter } from "next/font/google";
import Image from "next/image";
import MenuItem from "./MenuItem";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
};

interface IMenuCategory {
  category: string,
  items: Product[]
}

export default function MenuCategory({ category, items }: IMenuCategory) {
  return (
    <Row style={{ width: '100%' }} justify="center" id={`${category?.toLowerCase()}`}>
      <div className="foods-categories">
        <div className="food">
          <div className={`category-name ${forum.className}`} >
            <div className="teste" />
            <p>{category}</p>
            <div className="teste" />
          </div>

          {items?.map((item, index) => {
            return (
              <MenuItem key={`${item?.name}_${index}`} item={item} />
            )
          })}

        </div>
      </div>
    </Row>
  )
}
