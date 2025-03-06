import { Button, Card, Col, Image, List, Row, Typography } from "antd";
import { MdAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import NewProductModal from "../NewProductModal";
import { Forum, Inter } from "next/font/google";
const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

type Category = {
  id: string;
  name: string;
};

type Product = {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
};

interface ICategoriesList {
  categories: Category[]
  productsMap: {
    [key: string]: Product[];
  }
  fetchCategories: () => void
  fetchProducts: (id: string) => void
}

export default function CategoriesList({ categories, productsMap, fetchCategories, fetchProducts }: ICategoriesList) {
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category>({ id: '0', name: '' })
  async function handleDeleteCategory(id: string) {
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Falha ao deletar categoria");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteProduct(categoryId: string, productId: string) {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      if (!res.ok) throw new Error("Falha ao deletar produto");
      fetchProducts(categoryId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      {categories.map((cat) => (
        <Card key={cat?.id} className="list-cards">
          {showAddProductModal && <NewProductModal handleCancel={() => setShowAddProductModal(false)} category={currentCategory} fetchProducts={fetchProducts} />}
          <List
            itemLayout="horizontal"
            dataSource={productsMap[cat?.id]}
            header={<div className="category-list-title" style={{ fontSize: 18, fontWeight: 600 }}>
              {cat?.name}
              <MdAddCircleOutline onClick={() => {
                setCurrentCategory(cat)
                setShowAddProductModal(true)
              }} />
            </div>}
            renderItem={(item, index) => (
              <List.Item key={`${item?.id}_${index}`}>
                <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Col xs={3}>
                    <Image
                      src={item?.imageUrl || "/assets/about.jpg"}
                      alt={`foto do produto: ${item?.name}`}
                      width={120}
                      height={120}
                      style={{ borderRadius: 20 }}
                    />
                  </Col>
                  <Col xs={21}>
                    <Row>
                      <Col xs={12}>
                        <Typography.Text className={`item-name ${forum.className}`} ellipsis={{ tooltip: item?.name }} >
                          {item?.name}
                        </Typography.Text>
                      </Col>
                      <Col xs={6} className="item-price">
                        {`R$ ${item?.price}`}
                      </Col>
                      <Col xs={24} className="item-description">
                        {item?.description}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </div>
  )
}