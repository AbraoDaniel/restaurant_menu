import { Col, Row } from "antd"
import { Forum, Inter } from "next/font/google";
import Link from "next/link";

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});


const HeaderMenu: React.FC = () => {
  const pageItems = [
    {key: 'menu', label: 'MENU'},
    {key: 'about', label: 'SOBRE'},
    {key: 'contacts', label: 'CONTATOS'},
  ]

  return (
    <div className="main-header">
      <Row className="header-content" justify="space-between">
        <Col xs={3} className={`restaurant-name`}>
          <p className={`name ${forum.className}`}>
            <Link href={'/'}>
              {'danti.'}
            </Link>
          </p>
        </Col>
        <Col xs={17} className="menu-options">
          {pageItems?.map((item) => {
            return (
              <p className={`menu-item ${inter.className}`} key={item.key}>
                <Link href={`/${item.key}`}>
                 {item.label}
                </Link>
              </p>
            )
          })}
        </Col>
      </Row>
    </div>
  )
}

export default HeaderMenu