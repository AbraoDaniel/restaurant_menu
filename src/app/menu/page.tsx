import Image from "next/image";
import { Col, Row } from "antd"
import { Forum, Inter } from "next/font/google";
import HeaderMenu from "@/components/HeaderMenu";
import MenuCategory from "@/components/MenuCategory";
import { menuItems } from "@/util/generalFields";
import Link from "next/link";

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
export default async function Menu() {
  return (
    <Row className="menu-wrapper">
      <Col xs={24} xl={12} className="main-menu">
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
      <Col xs={24} xl={12} className="main-menu">
        <div className="menu-foods">
          <div className="items-wrapper">
            <div className="items">
              <Row style={{ width: '100%' }} justify="center">
                {menuItems?.map((item, index) => {
                  return (
                    <Link key={`#${item?.category}_${index}`} href={`#${item?.category?.toLowerCase()}`}>
                      <div key={`${item?.category}_${index}`} className="food-category-redirect-button">
                        {item?.category}
                      </div>
                    </Link>
                  )
                })}

              </Row>
              {menuItems?.map((item, index) => {
                return (
                  <MenuCategory key={`${item?.category}_${index}`} category={item?.category} items={item?.items} />
                )
              })}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}