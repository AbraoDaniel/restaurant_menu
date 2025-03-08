import { Button, Card, Col, Image, List, Popover, Row, Spin, Typography } from "antd";
import { MdAddCircleOutline, MdCreate, MdDelete } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import NewProductModal from "../NewProductModal";
import { Forum, Inter, Truculenta } from "next/font/google";
import { useMessageFunctions } from "../Message";
import DeleteConfirmationPopover from "../DeleteConfirmationPopover";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableCard } from "../DraggableCard";

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
  setShowAddCategoryModal: (value: boolean) => void
  onEditCategory: (category: Category) => void
}

export default function CategoriesList({ categories, productsMap, fetchCategories, fetchProducts, setShowAddCategoryModal, onEditCategory }: ICategoriesList) {
  const [loadingOperation, setLoadingOperation] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category>({ id: '0', name: '' })
  const [currentProduct, setCurrentProduct] = useState<any>()
  const { messageSuccess, contextHolder } = useMessageFunctions()


  const [orderedCategories, setOrderedCategories] = useState<Category[]>(categories);

  useEffect(() => {
    setOrderedCategories(categories);
  }, [categories]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const updated = Array.from(orderedCategories);
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setOrderedCategories(updated);
  }, [orderedCategories]);

  useEffect(() => {
    if (!showAddProductModal) {
      setCurrentProduct(undefined)
    }
  }, [showAddProductModal])

  async function handleDeleteCategory(id: string) {
    setLoadingOperation(true)
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Falha ao deletar categoria");
      messageSuccess("Categoria removida com sucesso!")
      fetchCategories();
      setLoadingOperation(false)
    } catch (error) {
      setLoadingOperation(false)
      console.error(error);
    }
  }

  async function handleDeleteProduct(categoryId: string, productId: string) {
    setLoadingOperation(true)
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      if (!res.ok) throw new Error("Falha ao deletar produto");
      messageSuccess("Produto removido com sucesso!")
      setLoadingOperation(false)
      fetchProducts(categoryId);
    } catch (error) {
      setLoadingOperation(false)
      console.error(error);
    }
  }

  function showSuccessMessage(value: string) {
    messageSuccess(value)
  }

  return (
    <div style={{ marginTop: 20 }}>
      {contextHolder}
      <DndProvider backend={HTML5Backend}>
        {orderedCategories.map((cat, index) => (
          <DraggableCard key={cat.id} card={cat} index={index} moveCard={moveCard}>
            <Card className="list-cards">
              <Spin spinning={loadingOperation}>
                {showAddProductModal && <NewProductModal showSuccessMessage={showSuccessMessage} loadingOperation={loadingOperation} handleCancel={() => setShowAddProductModal(false)} setLoadingOperation={setLoadingOperation} category={currentCategory} product={currentProduct} fetchProducts={fetchProducts} />}
                <List
                  itemLayout="horizontal"
                  dataSource={productsMap[cat?.id]}
                  header={<div className="category-list-title" style={{ fontSize: 18, fontWeight: 600 }}>
                    {cat?.name}
                    <MdAddCircleOutline onClick={() => {
                      setCurrentCategory(cat)
                      setShowAddProductModal(true)
                    }} />

                    <MdCreate
                      style={{ fontSize: 20, cursor: 'pointer', marginLeft: 10 }}
                      onClick={() => onEditCategory(cat)}
                    />
                    <DeleteConfirmationPopover
                      children={
                        <MdDelete style={{ fontSize: 20, cursor: 'pointer' }} className="delete-popover" />
                      }
                      handleConfirm={() => handleDeleteCategory(cat?.id)}
                    />
                  </div>}
                  renderItem={(item, index) => (
                    <List.Item key={`${item?.id}_${index}`}>
                      <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Col xs={24} xl={4}>
                          <Image
                            src={item?.imageUrl || "/assets/about.jpg"}
                            alt={`foto do produto: ${item?.name}`}
                            width={180}
                            height={120}
                            style={{ borderRadius: 20, objectFit: "cover" }}
                          />
                        </Col>
                        <Col xs={24} xl={20}>
                          <Row className="product-header" align="middle" style={{ width: '100%' }}>
                            <Col style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} className="header-col">
                              <Typography.Text ellipsis={{ tooltip: item?.name }} className={`item-name ${forum.className}`} style={{ margin: 0 }}>
                                {item?.name}
                              </Typography.Text>
                              <p className="dots" style={{ margin: '0 5px' }}></p>
                              <p className={`item-price ${forum.className}`} style={{ margin: 0 }}>
                                {`R$ ${item?.price}`}
                              </p>
                            </Col>
                            <Col style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="action-icons">
                              <MdCreate
                                style={{ fontSize: 20, cursor: 'pointer', marginLeft: 100 }}
                                onClick={() => {
                                  setCurrentCategory(cat)
                                  setCurrentProduct(item);
                                  setShowAddProductModal(true);
                                }}
                                className="edit-icon"
                              />
                              <DeleteConfirmationPopover
                                children={
                                  <MdDelete style={{ fontSize: 20, cursor: 'pointer' }} className="delete-popover" />
                                }
                                handleConfirm={() => handleDeleteProduct(cat.id, item.id!)}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <p className="item-description" style={{ margin: 0, marginTop: 5 }}>
                              {item?.description}
                            </p>
                          </Row>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Spin>
            </Card>
          </DraggableCard>
        ))}
      </DndProvider>
    </div>
  )
}