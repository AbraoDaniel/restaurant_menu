import CategoryCard from "@/components/CategoryCard"
import HeaderMenu from "@/components/HeaderMenu"
import MainVideo from "@/components/MainVideo"
import { pages } from "@/util/generalFields"
import { Col, Row } from "antd"
import { Metadata } from "next"
import { Forum } from "next/font/google";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'danti.',
  description: 'danti gourmet',
  openGraph: {
    title: 'danti gourmet',
    description: 'Um layout de restaurante gourmet',
    // images: ['https://danielabrao.com.br/danti-laptop.png']
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
      <Col xs={18} className="main-presentation">
        <HeaderMenu />
        <MainVideo />
        <div className="main-text">
          <Row>
            <p className={`main-title ${forum.className}`}>
              {'SUSHI'}
            </p>
          </Row>
          <Row>
            <p className={`main-title ${forum.className}`}>
              {'SENSATION'}
            </p>
          </Row>
        </div>
      </Col>
      <Col xs={6} className="categories">
        <div className="main-categories">
          {pages?.map((page) => {
            return (
                <CategoryCard key={page?.key} path={page?.key} label={page?.label} />
            )
          })}
        </div>
      </Col>
    </Row>
  )
}