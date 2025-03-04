"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/util/firebase";
import { useEffect, useState } from "react";
import { Button, Input, Row } from "antd";

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

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [productsMap, setProductsMap] = useState<{ [key: string]: Product[] }>({});
  const [newProductInputs, setNewProductInputs] = useState<{
    [key: string]: Partial<Product>;
  }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
      } else {
        setLoading(false);
        fetchCategories();
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Carregando...</div>;

  // Busca todas as categorias
  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Falha ao buscar categorias");
      const data = await res.json();
      setCategories(data);
      // Para cada categoria, busque seus produtos
      data.forEach((cat: Category) => {
        fetchProducts(cat.id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Busca produtos de uma categoria específica
  async function fetchProducts(categoryId: string) {
    try {
      const res = await fetch(`/api/products?category_id=${categoryId}`);
      if (!res.ok) throw new Error("Falha ao buscar produtos");
      const data = await res.json();
      setProductsMap((prev) => ({ ...prev, [categoryId]: data }));
    } catch (error) {
      console.error(error);
    }
  }

  // Cria uma nova categoria
  async function handleAddCategory() {
    if (!newCategory.trim()) return;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!res.ok) throw new Error("Falha ao criar categoria");
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }
  // Remove uma categoria
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

  // Cria um novo produto para uma categoria
  async function handleAddProduct(categoryId: string) {
    const productInput = newProductInputs[categoryId];
    if (!productInput || !productInput.name || !productInput.price) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productInput.name,
          price: Number(productInput.price),
          description: productInput.description || "",
          imageUrl: productInput.imageUrl || "",
          category_id: categoryId,
        }),
      });
      if (!res.ok) throw new Error("Falha ao criar produto");
      // Limpa os inputs para a categoria
      setNewProductInputs((prev) => ({ ...prev, [categoryId]: {} }));
      fetchProducts(categoryId);
    } catch (error) {
      console.error(error);
    }
  }

  // Remove um produto
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
    <div className="admin-control">
      <div className="main-page">
        <p className="panel-title">Painel Administrativo</p>

        <section className="main-categories">
          <Row justify="space-between">
            <p className="category-main-title">Categorias</p>
            <div className="add-category">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nome da categoria"
              />
              <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
            </div>
          </Row>

          <ul style={{ marginTop: 20 }}>
            {categories.map((cat) => (
              <li key={cat.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                <div>
                  <strong>{cat.name}</strong>{" "}
                  <Button onClick={() => handleDeleteCategory(cat.id)}>Remover Categoria</Button>
                </div>

                {/* Seção de produtos para a categoria */}
                <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                  <h3>Produtos</h3>
                  {productsMap[cat.id] ? (
                    <ul>
                      {productsMap[cat.id].map((prod) => (
                        <li key={prod.id}>
                          {prod.name} - R$ {prod.price}{" "}
                          <Button onClick={() => handleDeleteProduct(cat.id, prod.id!)}>Remover Produto</Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Carregando produtos...</div>
                  )}

                  {/* Formulário para adicionar um novo produto na categoria */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <Input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProductInputs[cat.id]?.name || ""}
                      onChange={(e) =>
                        setNewProductInputs((prev) => ({
                          ...prev,
                          [cat.id]: { ...prev[cat.id], name: e.target.value },
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Preço"
                      value={newProductInputs[cat.id]?.price || ""}
                      onChange={(e) =>
                        setNewProductInputs((prev) => ({
                          ...prev,
                          [cat.id]: { ...prev[cat.id], price: Number(e.target.value) },
                        }))
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Descrição"
                      value={newProductInputs[cat.id]?.description || ""}
                      onChange={(e) =>
                        setNewProductInputs((prev) => ({
                          ...prev,
                          [cat.id]: { ...prev[cat.id], description: e.target.value },
                        }))
                      }
                    />
                    <Input
                      type="text"
                      placeholder="URL da imagem"
                      value={newProductInputs[cat.id]?.imageUrl || ""}
                      onChange={(e) =>
                        setNewProductInputs((prev) => ({
                          ...prev,
                          [cat.id]: { ...prev[cat.id], imageUrl: e.target.value },
                        }))
                      }
                    />
                    <Button onClick={() => handleAddProduct(cat.id)}>Adicionar Produto</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
