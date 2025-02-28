import { Col, Row } from "antd";
import { Forum, Inter } from "next/font/google";
import Image from "next/image";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: "200",
  subsets: ["latin"],
  display: "swap",
});

interface IMenuItem {
  item: {
    image: string,
    name: string,
    price: string,
    description: string
  }
}

export default function MenuItem({ item }: IMenuItem) {
  return (
    <Row style={{ width: '100%' }} className="food-exibition">
      <Col xs={5} xl={7} className="category-image">
        <Image
          src={item?.image}
          alt="Categoria"
          fill
          style={{ objectFit: "cover" }}
        />
      </Col>
      <Col xs={18} xl={15} className="category-description">
        <div className="description-wrapper">
          <Row justify="space-between" className="product-header">
            <p className={`product-name ${forum.className}`}>
              {item?.name}
            </p>
            <p className="dots"></p>
            <p className={`product-price ${forum.className}`}>
              {`R$ ${item?.price}`}
            </p>
          </Row>
          <Row>
            <p className={`product-description ${inter.className}`}>
              {item?.description}
            </p>
          </Row>
        </div>
      </Col>
    </Row>
  )
}
