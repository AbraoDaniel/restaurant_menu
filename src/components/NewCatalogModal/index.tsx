import { Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";

interface INewCatalogModal {
  handleCancel: () => void
  fetchCategories: () => void
  setShowCatalogMessage: (value: boolean) => void
}
export default function NewCatalogModal({ handleCancel, fetchCategories, setShowCatalogMessage }: INewCatalogModal) {
  const [categoryForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  async function handleAddCategory() {
    setLoading(true)
    const validated = await categoryForm.validateFields()
    const newCategory = validated?.name
    if (!newCategory.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!res.ok) throw new Error("Falha ao criar categoria");
      setShowCatalogMessage(true)
      handleCancel()
      fetchCategories()
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Nova Categoria"
      open
      onOk={handleAddCategory}
      onCancel={() => {
        if (!loading) {
          handleCancel()
        }
      }}
      okText={"Salvar"}
      okButtonProps={{ style: { backgroundColor: 'rgb(10, 11, 10)' }, loading: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <Form form={categoryForm}>
        <Row>
          <Col xs={24}>
            <Form.Item label="" name="name" rules={[{ required: true, message: 'Por favor, informe o nome da categoria' }]}>
              <Input placeholder="Nome da categoria" className="input-form" disabled={loading} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}