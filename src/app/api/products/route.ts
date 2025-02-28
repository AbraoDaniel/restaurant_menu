// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/firebase";
import { collection, addDoc, getDocs, query, where, DocumentData, Query } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name, price, description, imageUrl, category_id } = await req.json();

    if (!name || !category_id) {
      return new NextResponse("Campos 'name' e 'category_id' são obrigatórios", { status: 400 });
    }

    await addDoc(collection(db, "products"), {
      name,
      price,
      description,
      imageUrl,
      category_id
    });

    return new NextResponse("Produto criado com sucesso", { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar produto:", error);
    return new NextResponse("Erro ao criar produto: " + error.message, { status: 500 });
  }
}

// GET para listar todos os produtos ou filtrar por categoria
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category_id");

    let productsQuery: Query<DocumentData>;

    if (categoryId) {
      productsQuery = query(collection(db, 'products'), where("category_id", "==", categoryId));
    } else {
      productsQuery = collection(db, "products");
    }

    const snapshot = await getDocs(productsQuery);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);
    return new NextResponse("Erro ao buscar produtos: " + error.message, { status: 500 });
  }
}
