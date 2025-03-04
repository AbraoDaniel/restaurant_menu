import Image from "next/image";
import { Card, Col, Row } from "antd"
import { Forum, Inter } from "next/font/google";
import HeaderMenu from "@/components/HeaderMenu";
import HoursCard from "@/components/HoursCard";
import MapsCard from "@/components/MapsCard";
import AddressCard from "@/components/AddressCard";
import PicturesCard from "@/components/PicturesCard";

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
export default function Contacts() {
  return (
    <Row className="contacts-wrapper">
      <Col xs={12} className="main-menu">
        <div className="content">
          <HeaderMenu />
          <Image
            src="/assets/image_2.jpg"
            alt="imagem"
            width={1400}
            height={1000}
          />
          <div className="menu-name">
            <p className={`name ${forum.className}`}>
              {'CONTATOS'}
            </p>
          </div>
        </div>
      </Col>
      <Col xs={12} className="contacts-info">
        <Row gutter={[16, 16]} style={{ height: '100%', width: '100%' }}>
          <Col key="hours" xs={12} style={{ height: '49.7%', width: '50%' }}>
            <HoursCard />
          </Col>
          <Col key="pictures" xs={12} style={{ height: '49.7%', width: '50%' }}>
            <PicturesCard />
          </Col>
          <Col key="maps" xs={12} style={{ height: '49.7%', width: '50%' }}>
            <MapsCard />
          </Col>
          <Col key="address" xs={12} style={{ height: '49.7%', width: '50%' }}>
            <AddressCard />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}