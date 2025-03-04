'use client'

import { pictures } from "@/util/generalFields";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

export default function PicturesCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>()

  function handlePictureClick(path: string) {
    window.open(path, '_blank')
  }

  function handleHoverPicture(index: number | undefined) {
    setHoveredIndex(index)
  }


  return (
    <Card className="contact-card" style={{ border: 'none' }}>
      <div className="pictures-wrapper">
        <Row style={{ height: '100%', width: '100%', marginLeft: 0, marginBottom: 0 }} justify="space-between">
          {pictures?.map((pic, index) => {
            return (
              <Col key={`picture_${index}`} onMouseEnter={() => handleHoverPicture(index)} onMouseLeave={() => handleHoverPicture(undefined)} xs={11} style={{ height: '48%', width: '50%', marginBottom: index === 0 ? 13 : 0 }}>
                <div className={`redirect-icon ${hoveredIndex === index ? '' : 'hidden'}`}>
                  <MdArrowOutward />
                </div>
                <Image
                  id={`pic_${index}`}
                  src={pic?.src}
                  alt="imagem"
                  fill
                  onClick={() => handlePictureClick(pic?.link)}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    </Card>
  )
}