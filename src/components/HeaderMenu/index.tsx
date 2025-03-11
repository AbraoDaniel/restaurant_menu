import { forum, inter } from "@/util/fonts";
import { Col, Row } from "antd"
import Link from "next/link";


const HeaderMenu: React.FC = () => {
  const pageItems = [
    { key: 'menu', label: 'CARDÁPIO' },
    { key: 'about', label: 'SOBRE' },
    { key: 'contacts', label: 'CONTATOS' },
  ]

  return (
    <div className="main-header">
      <Row className="header-content" justify="space-between">
        <Col xs={24} md={3} className={`restaurant-name`}>
          <p className={`name ${forum.className}`}>
            <Link href={'/'}>
              {'danti.'}
            </Link>
          </p>
        </Col>
        <Col xs={24} md={17} className="menu-options">
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