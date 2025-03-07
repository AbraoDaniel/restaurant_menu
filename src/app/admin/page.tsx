"use client"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/util/firebase"
import { useEffect, useState } from "react"
import { Row, Layout, Menu, Spin } from "antd"
import { Forum, Inter } from "next/font/google"
import { MdAddCircleOutline, MdAdminPanelSettings, MdFormatListBulleted } from "react-icons/md"
import Sider from "antd/es/layout/Sider"
import type { MenuProps } from 'antd'
import { Content } from "antd/es/layout/layout"
import NewCatalogModal from "@/components/NewCatalogModal"
import CategoriesList from "@/components/CategoriesList"
import Link from "next/link"
import { useMessageFunctions } from "@/components/Message"
const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})
const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
})

type Category = {
  id: string
  name: string
}

type Product = {
  id?: string
  name: string
  price: number
  description: string
  imageUrl: string
  category_id: string
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Gestão de produtos', 'product_manage', <MdFormatListBulleted />),
]

export default function AdminPage() {
  const { messageSuccess, contextHolder } = useMessageFunctions()
  const [loading, setLoading] = useState(true)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [collapsedMenu, setCollapsedMenu] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [productsMap, setProductsMap] = useState<{ [key: string]: Product[] }>({})
  const [currentCategory, setCurrentCategory] = useState<Category>({ id: '0', name: '' })
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    if (successMessage) {
      messageSuccess("Categoria criada com sucesso!")
      setSuccessMessage(false)
    }
  }, [successMessage])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login"
      } else {
        setLoading(true)
        fetchCategories()
      }
    })
    return () => unsubscribe()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Falha ao buscar categorias")
      const data = await res.json()
      setCategories(data)
      data.forEach((cat: Category) => {
        fetchProducts(cat.id)
      })

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchProducts(categoryId: string) {
    try {
      const res = await fetch(`/api/products?category_id=${categoryId}`)
      if (!res.ok) throw new Error("Falha ao buscar produtos")
      const data = await res.json()
      setProductsMap((prev) => ({ ...prev, [categoryId]: data }))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Layout className="admin-control">
      {contextHolder}
      {showAddCategoryModal && <NewCatalogModal setShowCatalogMessage={setSuccessMessage} fetchCategories={fetchCategories} handleCancel={() => setShowAddCategoryModal(false)} />}
      <Sider collapsible collapsed={collapsedMenu} onCollapse={(value) => setCollapsedMenu(value)} className="admin-sider">
        <div className="panel-title">
          <Link href="/" style={{ cursor: 'pointer' }}>
            <p className={`admin-panel ${forum.className}`} >{
              collapsedMenu ? <MdAdminPanelSettings style={{ fontSize: 50 }} /> : (<><MdAdminPanelSettings style={{ fontSize: 40 }} />{'danti.'}</>)}</p>
          </Link>
        </div>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['product_manage']} mode="inline" items={items} className={`menu-items ${inter.className}`} />
      </Sider>
      <div style={{ width: '100%', height: '100dvh' }}>
        <div className="main-page">
          <Layout className="main-categories">
            <Spin spinning={loading} className="spin-loading">
              <Content style={{ margin: '0 16px' }} className="main-content" >
                <Row className="category-title">
                  <p className={`category-main-title ${forum.className}`}>Categorias</p>
                  <MdAddCircleOutline onClick={() => setShowAddCategoryModal(true)} />
                </Row>
                <CategoriesList setShowAddCategoryModal={setShowAddCategoryModal} categories={categories} productsMap={productsMap} fetchCategories={fetchCategories} fetchProducts={fetchProducts} />
              </Content>
            </Spin>
          </Layout>
        </div>
      </div>
    </Layout >
  )
}
