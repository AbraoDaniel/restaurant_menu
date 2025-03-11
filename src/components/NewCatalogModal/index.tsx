import { INewCatalogModal } from "@/util/types";
import { Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";

export default function NewCatalogModal({ handleCancel, fetchCategories, setShowCatalogMessage, category }: INewCatalogModal) {
  const [categoryForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category?.id) {
      categoryForm.setFieldsValue({ name: category.name });
    } else {
      categoryForm.resetFields();
    }
  }, [category?.id, categoryForm]);

  async function handleAddCategory() {
    setLoading(true);
    const validated = await categoryForm.validateFields();
    const newCategoryName = validated?.name;
    if (!newCategoryName.trim()) {
      setLoading(false);
      return;
    }
    try {
      let res;
      if (category?.id) {
        res = await fetch("/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: category?.id, name: newCategoryName }),
        });
      } else {
        res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategoryName }),
        });
      }
      if (!res.ok) throw new Error("Falha ao salvar categoria");
      setShowCatalogMessage(true);
      handleCancel();
      fetchCategories();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Modal
      title={category?.id ? "Editar categoria" : "Nova categoria"}
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