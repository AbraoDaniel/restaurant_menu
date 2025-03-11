import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Campo 'name' é obrigatório", { status: 400 });
    }

    const snapshot = await getDocs(collection(db, "categories"));
    const count = snapshot.size

    const docData: any = { name, order: count, createdAt: serverTimestamp() };
    await addDoc(collection(db, "categories"), docData);

    return new NextResponse("Categoria criada com sucesso", { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);
    return new NextResponse("Erro ao criar categoria: " + error.message, { status: 500 });
  }
}

export async function GET() {
  try {
    const q = query(collection(db, "categories"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
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

    const productsQuery = query(collection(db, "products"), where("category_id", "==", id));
    const snapshot = await getDocs(productsQuery);

    const deletePromises = snapshot.docs.map((productDoc) => deleteDoc(productDoc.ref));
    await Promise.all(deletePromises);

    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);

    return new NextResponse("Categoria e produtos removidos com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao deletar categoria:", error);
    return new NextResponse("Erro ao deletar categoria: " + error.message, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name } = await req.json();

    if (!id || !name) {
      return new NextResponse("Campos 'id' e 'name' são obrigatórios", { status: 400 });
    }

    const categoryRef = doc(db, "categories", id);
    await updateDoc(categoryRef, { name, updatedAt: serverTimestamp() });

    return new NextResponse("Categoria atualizada com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao atualizar categoria:", error);
    return new NextResponse("Erro ao atualizar categoria: " + error.message, { status: 500 });
  }
}