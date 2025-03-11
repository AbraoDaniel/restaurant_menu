import { forum, inter } from "@/util/fonts";
import { IMenuItem } from "@/util/types";
import { Col, Row } from "antd";
import Image from "next/image";

export default function MenuItem({ item }: IMenuItem) {
  return (
    <Row style={{ width: '100%' }} className="food-exibition">
      <Col xs={24} xl={7} className="category-image">
        <Image
          src={item?.imageUrl}
          alt="Categoria"
          fill
          style={{ objectFit: "cover" }}
        />
      </Col>
      <Col xs={24} xl={15} className="category-description">
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
