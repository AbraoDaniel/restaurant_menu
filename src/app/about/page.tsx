import Image from "next/image";
import { Col, Rate, Row, Typography } from "antd"
import HeaderMenu from "@/components/HeaderMenu";
import { forum, inter } from "@/util/fonts";

export default function About() {
  return (
    <Row className="contacts-wrapper">
      <Col xs={24} xl={12} className="main-menu">
        <div className="content">
          <HeaderMenu />
          <Image
            src="/assets/about.jpg"
            alt="imagem"
            width={1400}
            height={1200}
          />
          <div className="menu-about-name">
            <p className={`name ${forum.className}`}>
              {'SOBRE'}
            </p>
          </div>
        </div>
      </Col>
      <Col xs={24} xl={12} className="contacts-info">
        <Row gutter={[8, 8]} style={{ height: '100%', width: '100%' }}>
          <Col key="6" xs={12} style={{ height: '29%', width: '50%' }}>
            <div className="reduced-card">
              <Row>
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`title ${forum.className}`}>
                    {"DANTI SAPORI D’ORO"}
                  </p>
                </Row >
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`description ${inter.className}`} style={{ padding: '0px 20px', textAlign: 'center', marginTop: 12, whiteSpace: 'break-spaces' }}>
                    {"Onde a simplicidade se transforma em sofisticação, e cada refeição se torna uma celebração da vera cucina italiana."}
                  </p>
                </Row >
              </Row>
            </div>
          </Col>
          <Col key="7" xs={12} style={{ height: '29%', width: '50%' }}>
            <div className="reduced-card" style={{ overflow: 'hidden' }}>
              <Image
                src="/assets/foods/pasta/spaghetti.jpg"
                alt="Categoria"
                width={490}
                height={420}
                style={{ objectFit: "cover", marginTop: 30 }}
              />
            </div>
          </Col>
          <Col key="1" xs={8} style={{ height: '25%', width: '50%' }}>
            <div className="reduced-card">
              <Row>
                <Row style={{ width: '100%' }} justify="center">
                  <Rate allowHalf defaultValue={5} disabled />
                </Row>
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`title ${forum.className}`}>
                    {'TRIP ADVISOR'}
                  </p>
                </Row >
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`description ${inter.className}`}>
                    {'BEST PASTA'}
                  </p>
                </Row>
              </Row>
            </div>
          </Col>
          <Col key="2" xs={8} style={{ height: '25%', width: '50%' }}>
            <div className="reduced-card">
              <Row>
                <Row style={{ width: '100%' }} justify="center">
                  <Rate allowHalf defaultValue={5} disabled />
                </Row>
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`title ${forum.className}`}>
                    {'PRÊMIO MICHELIN'}
                  </p>
                </Row >
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`description ${inter.className}`}>
                    {'EXCELENT FOOD'}
                  </p>
                </Row>
              </Row>
            </div>
          </Col>
          <Col key="3" xs={8} style={{ height: '25%', width: '50%' }}>
            <div className="reduced-card">
              <Row>
                <Row style={{ width: '100%' }} justify="center">
                  <Rate allowHalf defaultValue={5} disabled />
                </Row>
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`title ${forum.className}`}>
                    {"THE WORLD'S 50 BEST"}
                  </p>
                </Row >
              </Row>
            </div>
          </Col>
          <Col key="4" xs={12} style={{ height: '45%', width: '50%' }}>
            <div className="reduced-card" style={{ overflow: 'hidden' }}>
              <Image
                src="/assets/default-menu-2.jpg"
                alt="Categoria"
                width={500}
                height={650}
                style={{ objectFit: "cover", marginBottom: 40 }}
              />
            </div>
          </Col>
          <Col key="5" xs={12} style={{ height: '45%', width: '50%' }}>
            <div className="reduced-card">
              <Row>
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`title ${forum.className}`}>
                    {"NOSSA HISTÓRIA"}
                  </p>
                </Row >
                <Row style={{ width: '100%' }} justify="center" >
                  <p className={`description ${inter.className}`} style={{ padding: '0px 20px', textAlign: 'center', marginTop: 12, whiteSpace: 'break-spaces', maxWidth: '100%', overflowY: 'auto' }}>
                    {"Fundado com a paixão pela autêntica culinária italiana, o Danti nasceu do desejo de trazer os verdadeiros sabores da Itália para a mesa.\n\nInspirado nas tradições das trattorias familiares e na riqueza gastronômica das regiões italianas, o restaurante combina técnicas clássicas com um toque contemporâneo.\n\nDesde o primeiro dia, nosso compromisso tem sido proporcionar uma experiência única, onde cada prato conta uma história de tradição, qualidade e amor pela comida"}
                  </p>
                </Row >
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}