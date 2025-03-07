import { Form, Modal } from "antd";
import ProductForm from "../ProductForm";
import { useEffect, useState } from "react";
import { supabase } from "@/util/supabase";
import { useMessageFunctions } from "../Message";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
};


interface INewProductModal {
  handleCancel: () => void
  category: Category
  fetchProducts: (id: string) => void
  product?: Product;
  loadingOperation: boolean
  setLoadingOperation: (value: boolean) => void
  showSuccessMessage: (value: string) => void
}

interface ProductPayload {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
}

export default function NewProductModal({ handleCancel, category, fetchProducts, product, loadingOperation, setLoadingOperation, showSuccessMessage }: INewProductModal) {
  const [productForm] = Form.useForm()
  const [file, setFile] = useState<File | null>(null);
  const BUCKETNAME = "danti_restaurant_pics"
  const { messageError, contextHolder } = useMessageFunctions()

  useEffect(() => {
    if (product) {
      const splittedUrl = product.imageUrl.split('.')
      const imageExtension = splittedUrl[splittedUrl.length - 1]
      productForm.setFieldsValue({
        product_name: product.name,
        product_price: product.price,
        product_description: product.description,
        product_image: [
          {
            uid: '-1',
            name: `${product.name}.${imageExtension}`,
            status: 'done',
            url: product.imageUrl,
          },
        ],
      });
    }
  }, [product, productForm]);

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return product ? product.imageUrl : null;
    const filePath = `products/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase
      .storage
      .from(BUCKETNAME)
      .upload(filePath, file);

    if (uploadError) {
      messageError("Erro ao enviar imagem");
      console.log(uploadError)
      return null;
    }

    const { data } = supabase.storage.from(BUCKETNAME).getPublicUrl(filePath);
    if (!data.publicUrl) {
      messageError("Erro ao obter URL pública");
      return null;
    }
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    setLoadingOperation(true)
    try {
      const validated = await productForm.validateFields();
      if (validated) {
        const uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl) {
          messageError("Erro ao enviar a imagem. Tente novamente.")
          return;
        }

        let payload: ProductPayload = {
          name: validated.product_name,
          price: Number(validated.product_price),
          description: validated.product_description || "",
          imageUrl: uploadedImageUrl,
          category_id: product ? product?.category_id : category.id,
        };

        let response;
        if (product && product.id) {
          payload = { ...payload, id: product.id };;
          response = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          showSuccessMessage("Produto atualizado com sucesso!")
        } else {
          response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          showSuccessMessage("Produto criado com sucesso!")
        }

        if (response.ok) {
          setFile(null);
          setLoadingOperation(false)
          fetchProducts(product ? product?.category_id : category.id);
          handleCancel();
        } else {
          setLoadingOperation(false)
          const errorText = await response.text();
          messageError("Erro ao salvar produto")
          console.log(errorText)
        }
      }
    } catch (error) {
      setLoadingOperation(false)
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={`Adicionar produto na categoria ${category?.name}`}
        open
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Salvar"}
        okButtonProps={{ style: { backgroundColor: 'rgb(10, 11, 10)' }, loading: loadingOperation }}
        cancelButtonProps={{ disabled: loadingOperation }}
      >
        <ProductForm loading={loadingOperation} form={productForm} categoryId={category?.id} setFile={setFile} />
      </Modal>
    </>
  )
}