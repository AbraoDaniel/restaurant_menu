"use client";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Upload, message } from "antd";
import { RcFile, UploadRequestOption } from "rc-upload/lib/interface";
import { useMessageFunctions } from "../Message";

type ProductFormProps = {
  categoryId: string;
  form: FormInstance
  setFile: (value: File | null) => void
  loading: boolean
};

export default function ProductForm({ categoryId, setFile, form, loading }: ProductFormProps) {
  const { messageError, contextHolder } = useMessageFunctions()
  const handleCustomRequest = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    try {
      const rcFile = file as RcFile;
      setFile(rcFile);

      if (onSuccess) {
        onSuccess("ok");
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpg = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpg) {
      messageError("Você só pode enviar imagens no formato JPG ou PNG!");
      return Upload.LIST_IGNORE;
    }
    const isLt25M = file.size / 1024 / 1024 < 25;
    if (!isLt25M) {
      messageError("A imagem deve ter menos de 25MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      {contextHolder}
      <Form form={form} style={{ marginTop: "1rem" }}>
        <Form.Item name="product_name" rules={[{ required: true, message: "Insira o nome do produto" }]}>
          <Input
            type="text"
            placeholder="Nome do produto"
            required
            disabled={loading}
          />
        </Form.Item>
        <Form.Item name="product_price" rules={[{ required: true, message: "Insira o preço do produto" }]}>
          <Input
            type="number"
            placeholder="Preço"
            required
            disabled={loading}
          />
        </Form.Item>
        <Form.Item name="product_description" rules={[{ required: true, message: "Insira a descrição do produto" }]}>
          <Input.TextArea
            placeholder="Descrição"
            disabled={loading}
            style={{ minHeight: 100 }}
          />
        </Form.Item>
        <Form.Item
          name="product_image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Insira a imagem do produto" }]}
        >
          <Upload
            action=""
            customRequest={handleCustomRequest}
            listType="picture"
            maxCount={1}
            disabled={loading}
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Selecione a Imagem</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
}
