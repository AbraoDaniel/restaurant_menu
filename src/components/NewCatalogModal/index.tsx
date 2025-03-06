import { Col, Form, Input, Modal, Row } from "antd";

interface INewCatalogModal {
  handleCancel: () => void
  fetchCategories: () => void
}
export default function NewCatalogModal({ handleCancel, fetchCategories }: INewCatalogModal) {
  const [categoryForm] = Form.useForm()

  async function handleAddCategory() {
    const validated = await categoryForm.validateFields()
    const newCategory = validated?.name

    if (!newCategory.trim()) return;
    console.log(validated?.name)

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!res.ok) throw new Error("Falha ao criar categoria");
      handleCancel()
      fetchCategories()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      title="Nova Categoria"
      open
      onOk={handleAddCategory}
      onCancel={handleCancel}
      okText={"Salvar"}
      okButtonProps={{ style: { backgroundColor: 'rgb(10, 11, 10)' } }}
    >
      <Form form={categoryForm}>
        <Row>
          <Col xs={24}>
            <Form.Item label="" name="name" rules={[{ required: true, message: 'Por favor, informe o nome da categoria' }]}>
              <Input placeholder="Nome da categoria" className="input-form" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}