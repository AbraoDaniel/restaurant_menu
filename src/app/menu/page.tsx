import Image from "next/image";
import { Col, Row } from "antd"
import { Forum } from "next/font/google";
import HeaderMenu from "@/components/HeaderMenu";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export default async function Menu() {
  return (
    <Row className="menu-wrapper">
      <Col xs={24} className="main-menu">
        <div className="content">
          <HeaderMenu />
          <Image 
            src="/assets/image.png"
            alt="imagem"
            width={1400}
            height={1400}
          />
          <div className="menu-name">
            <p className={`name ${forum.className}`}>
              {'MENU'}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  )
}