// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/firebase";
import { collection, addDoc, getDocs, query, where, DocumentData, Query, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
      imageUrl, // A URL gerada pelo Supabase é salva aqui
      category_id
    });

    return new NextResponse("Produto criado com sucesso", { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar produto:", error);
    return new NextResponse("Erro ao criar produto: " + error.message, { status: 500 });
  }
}

// GET para listar produtos (ou filtrar por categoria)
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

export async function PUT(req: NextRequest) {
  try {
    const { id, name, price, description, imageUrl, category_id } = await req.json();

    if (!id || !name || !category_id) {
      return new NextResponse("Campos 'id', 'name' e 'category_id' são obrigatórios", { status: 400 });
    }

    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      name,
      price,
      description,
      imageUrl,
      category_id,
    });

    return new NextResponse("Produto atualizado com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao atualizar produto:", error);
    return new NextResponse("Erro ao atualizar produto: " + error.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new NextResponse("Campo 'id' é obrigatório", { status: 400 });
    }

    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);

    return new NextResponse("Produto deletado com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao deletar produto:", error);
    return new NextResponse("Erro ao deletar produto: " + error.message, { status: 500 });
  }
}