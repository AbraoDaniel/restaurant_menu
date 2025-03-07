import { Button, Popover, Row, Col } from "antd";
import { ReactNode, useState } from "react";

interface IDeleteConfirmationPopover {
  children: ReactNode
  handleConfirm: () => void
}

export default function DeleteConfirmationPopover({ children, handleConfirm }: IDeleteConfirmationPopover) {
  const [openedPopover, setOpenedPopover] = useState(false)

  function handleAccept() {
    setOpenedPopover(false)
    handleConfirm()
  }

  return (
    <Popover
      trigger="click"
      open={openedPopover}
      onOpenChange={(visible: boolean) => setOpenedPopover(visible)}
      content={
        <div style={{ width: 120 }}>
          <Row style={{ width: '100%' }}>
            <Col xs={24} style={{ fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
              {'Tem certeza que deseja remover?'}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <Button style={{ height: 30 }} onClick={() => setOpenedPopover(false)}>
                Não
              </Button>
            </Col>
            <Col xs={12}>
              <Button onClick={handleAccept} type="primary" style={{ height: 30, backgroundColor: 'black' }}>
                SIM
              </Button>
            </Col>
          </Row>
        </div>
      }
    >
      {children}
    </Popover>
  )
}