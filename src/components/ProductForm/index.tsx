"use client";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Upload } from "antd";
import { RcFile, UploadRequestOption } from "rc-upload/lib/interface";

type ProductFormProps = {
  categoryId: string;
  form: FormInstance
  setFile: (value: File | null) => void
};

export default function ProductForm({ categoryId, setFile, form }: ProductFormProps) {
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form form={form} style={{ marginTop: "1rem" }}>
      <Form.Item name="product_name" rules={[{ required: true, message: "Insira o nome do produto" }]}>
        <Input
          type="text"
          placeholder="Nome do produto"
          required
        />
      </Form.Item>
      <Form.Item name="product_price" rules={[{ required: true, message: "Insira o preço do produto" }]}>
        <Input
          type="number"
          placeholder="Preço"
          required
        />
      </Form.Item>
      <Form.Item name="product_description" rules={[{ required: true, message: "Insira a descrição do produto" }]}>
        <Input.TextArea
          placeholder="Descrição"
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
        >
          <Button icon={<UploadOutlined />}>Selecione a Imagem</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}
