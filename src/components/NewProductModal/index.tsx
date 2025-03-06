import { Form, Modal } from "antd";
import ProductForm from "../ProductForm";
import { useState } from "react";
import { supabase } from "@/util/supabase";

type Category = {
  id: string;
  name: string;
};


interface INewProductModal {
  handleCancel: () => void
  category: Category
  fetchProducts: (id: string) => void
}

export default function NewProductModal({ handleCancel, category, fetchProducts }: INewProductModal) {
  const [productForm] = Form.useForm()
  const [file, setFile] = useState<File | null>(null);
  const BUCKETNAME = "danti_restaurant_pics"

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return null;
    const filePath = `products/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase
      .storage
      .from(BUCKETNAME)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Erro ao enviar imagem:", uploadError);
      console.log(uploadError.message, 'ESSE É O ERRO')
      return null;
    }

    const { data } = supabase
      .storage
      .from(BUCKETNAME)
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      console.error("Erro ao obter URL pública");
      return null;
    }

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const validated = await productForm.validateFields()
      if (validated) {
        const uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl) {
          alert("Erro ao enviar a imagem. Tente novamente.");
          return;
        }

        const payload = {
          name: validated?.product_name,
          price: Number(validated?.product_price),
          description: validated?.product_description || "",
          imageUrl: uploadedImageUrl,
          category_id: category?.id,
        };

        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Produto criado com sucesso!");
          setFile(null);
          fetchProducts(category?.id);
        } else {
          const errorText = await response.text();
          alert("Erro ao criar produto: " + errorText);
        }
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Modal
      title={`Adicionar produto na categoria ${category?.name}`}
      open
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={"Salvar"}
      okButtonProps={{ style: { backgroundColor: 'rgb(10, 11, 10)' } }}
    >
      <ProductForm form={productForm} categoryId={category?.id} setFile={setFile} />
    </Modal>
  )
}