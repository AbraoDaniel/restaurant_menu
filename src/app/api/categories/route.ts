// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Campo 'name' é obrigatório", { status: 400 });
    }

    const docData: any = { name };
    await addDoc(collection(db, "categories"), docData);

    return new NextResponse("Categoria criada com sucesso", { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);
    return new NextResponse("Erro ao criar categoria: " + error.message, { status: 500 });
  }
}

// GET para listar as categorias
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error);
    return new NextResponse("Erro ao buscar categorias: " + error.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new NextResponse("Campo 'id' é obrigatório", { status: 400 });
    }

    // Busque todos os produtos vinculados à categoria
    const productsQuery = query(collection(db, "products"), where("category_id", "==", id));
    const snapshot = await getDocs(productsQuery);

    // Delete todos os produtos encontrados
    const deletePromises = snapshot.docs.map((productDoc) => deleteDoc(productDoc.ref));
    await Promise.all(deletePromises);

    // Exclua a categoria
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);

    return new NextResponse("Categoria e produtos removidos com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao deletar categoria:", error);
    return new NextResponse("Erro ao deletar categoria: " + error.message, { status: 500 });
  }
}