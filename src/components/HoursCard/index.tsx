import { forum } from "@/util/fonts";
import { serviceHours } from "@/util/generalFields";
import { Card, Col, Row } from "antd";

export default function HoursCard() {
  return (
    <Card className="contact-card">
      <div className="hours-wrapper">
        <Row style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} justify="center">
          <div className={`hour-title ${forum.className}`} >
            <div className="teste" />
            <p>{'HORÁRIOS'}</p>
            <div className="teste" />
          </div>
        </Row>
        <Row style={{ width: '100%' }}>
          {serviceHours?.map((hour, index) => {
            return (
              <Col key={`${hour?.day}_${index}`} xs={24} className="hours-description">
                <div className="description-wrapper">
                  <Row justify="space-between" className="product-header">
                    <p className={`product-name ${forum.className}`}>
                      {hour?.day}
                    </p>
                    <p className="dots"></p>
                    <p className={`product-price ${forum.className}`}>
                      {hour?.hour}
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