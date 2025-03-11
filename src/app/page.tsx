import CategoryCard from "@/components/CategoryCard"
import HeaderMenu from "@/components/HeaderMenu"
import MainVideo from "@/components/MainVideo"
import { forum } from "@/util/fonts"
import { pages } from "@/util/generalFields"
import { Col, Row } from "antd"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'danti.',
  description: 'danti gourmet',
  openGraph: {
    title: 'danti gourmet',
    description: 'Um layout de restaurante gourmet',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default function Home() {
  return (
    <Row className="homepage">
      <Col xs={24} xl={18} className="main-presentation">
        <HeaderMenu />
        <MainVideo />
        <div className="main-text">
          <Row>
            <p className={`main-title ${forum.className}`}>
              {'SAPORI'}
            </p>
          </Row>
          <Row>
            <p className={`main-title ${forum.className}`}>
              {'D’ORO'}
            </p>
          </Row>
        </div>
      </Col>
      <Col xs={24} xl={6} className="categories">
        <div className="main-categories">
          {pages?.map((page) => {
            return (
              <CategoryCard key={page?.key} path={page?.key} label={page?.label} image={page?.image} />
            )
          })}
        </div>
      </Col>
    </Row>
  )
}