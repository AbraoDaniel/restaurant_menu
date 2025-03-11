import { Button, Card, Col, Image, List, Popover, Row, Spin, Typography } from "antd";
import { MdAddCircleOutline, MdCreate, MdDelete, MdDragIndicator } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import NewProductModal from "../NewProductModal";
import { useMessageFunctions } from "../Message";
import DeleteConfirmationPopover from "../DeleteConfirmationPopover";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableCard } from "../DraggableCard";
import { forum } from "@/util/fonts";
import { ICategoriesList, ICategory } from "@/util/types";


export default function CategoriesList({ categories, productsMap, fetchCategories, fetchProducts, setShowAddCategoryModal, onEditCategory }: ICategoriesList) {
  const [loadingOperation, setLoadingOperation] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<ICategory>({ id: '0', name: '' })
  const [currentProduct, setCurrentProduct] = useState<any>()
  const [showSaveOrder, setShowSaveOrder] = useState(false)
  const { messageSuccess, messageError, contextHolder } = useMessageFunctions()


  const [orderedCategories, setOrderedCategories] = useState<ICategory[]>(categories);

  useEffect(() => {
    setOrderedCategories(categories);
  }, [categories]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const updated = Array.from(orderedCategories);
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setOrderedCategories(updated);
  }, [orderedCategories]);

  async function handleSaveOrder() {
    setLoadingOperation(true)
    const body = orderedCategories.map((cat, index) => ({
      id: cat.id,
      order: index,
    }));

    try {
      const res = await fetch("/api/categories/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: body }),
      });
      if (!res.ok) throw new Error("Falha ao salvar ordem");
      setShowSaveOrder(false)
      setLoadingOperation(false)
      messageSuccess("Ordem atualizada com sucesso!");
    } catch (error) {
      setLoadingOperation(false)
      console.error(error)
      messageError("Erro ao salvar ordem");
    }
  }

  async function handleCancelReorder() {
    setLoadingOperation(true)
    setShowSaveOrder(false)
    fetchCategories()
    setLoadingOperation(false)
  }

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
      {showSaveOrder && (
        <Row justify="end">
          <Button className="button-cancel-order" onClick={handleCancelReorder}>{'Cancelar'}</Button>
          <Button className="button-save-order" onClick={handleSaveOrder}>{'Salvar ordenação'}</Button>
        </Row>
      )}
      <DndProvider backend={HTML5Backend}>
        {orderedCategories.map((cat, index) => (
          <DraggableCard key={cat.id} card={cat} index={index} moveCard={moveCard} onDrop={() => setShowSaveOrder(true)}>
            <Card className="list-cards">
              <Spin spinning={loadingOperation}>
                {showAddProductModal && <NewProductModal showSuccessMessage={showSuccessMessage} loadingOperation={loadingOperation} handleCancel={() => setShowAddProductModal(false)} setLoadingOperation={setLoadingOperation} category={currentCategory} product={currentProduct} fetchProducts={fetchProducts} />}
                <List
                  itemLayout="horizontal"
                  dataSource={productsMap[cat?.id]}
                  header={<div className="category-list-title" style={{ fontSize: 18, fontWeight: 600 }}>
                    <MdDragIndicator style={{ marginLeft: 0, cursor: 'grab' }} />
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