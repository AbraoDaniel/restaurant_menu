import { addressAndContacts } from "@/util/generalFields";
import { Card, Col, Row } from "antd";
import { Forum, Inter } from "next/font/google";
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

export default function AddressCard() {
  return (
    <Card className="contact-card" >
      <div className="hours-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Row style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} justify="center">
          <div className={`hour-title ${forum.className}`} >
            <div className="teste" />
            <p>{'HORÁRIOS'}</p>
            <div className="teste" />
          </div>
        </Row>
        <Row style={{ width: '100%' }}>
          {addressAndContacts?.map((contact, index) => {
            return (
              <Col key={`${contact?.contact}_${index}`} xs={24} className="hours-description">
                <div className="description-wrapper">
                  <Row justify="space-between" className="product-header">
                    <p className={`product-name ${forum.className}`}>
                      {contact?.contact}
                    </p>
                    <p className={`product-price ${forum.className}`}>
                      {contact?.value}
                    </p>
                  </Row>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </Card>
  )
}