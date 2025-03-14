import Image from "next/image";
import { Col, Row } from "antd"
import HeaderMenu from "@/components/HeaderMenu";
import HoursCard from "@/components/HoursCard";
import MapsCard from "@/components/MapsCard";
import AddressCard from "@/components/AddressCard";
import PicturesCard from "@/components/PicturesCard";
import { forum } from "@/util/fonts";


export default function Contacts() {
  return (
    <Row className="contacts-wrapper">
      <Col xs={24} xl={12} className="main-menu">
        <div className="content">
          <HeaderMenu />
          <Image
            src="/assets/image_2.jpg"
            alt="imagem"
            width={1400}
            height={1200}
          />
          <div className="menu-name">
            <p className={`name ${forum.className}`}>
              {'CONTATOS'}
            </p>
          </div>
        </div>
      </Col>
      <Col xs={24} xl={12} className="contacts-info">
        <Row gutter={[16, 16]} style={{ height: '100%', width: '100%' }}>
          <Col key="hours" xs={24} lg={12} style={{ height: '49.7%', width: '50%' }}>
            <HoursCard />
          </Col>
          <Col key="pictures" xs={24} lg={12} style={{ height: '49.7%', width: '50%' }}>
            <PicturesCard />
          </Col>
          <Col key="maps" xs={24} lg={12} style={{ height: '49.7%', width: '50%' }}>
            <MapsCard />
          </Col>
          <Col key="address" xs={24} lg={12} style={{ height: '49.7%', width: '50%' }}>
            <AddressCard />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}