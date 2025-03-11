import { NextRequest, NextResponse } from "next/server";
import { db } from "@/util/firebase";
import { doc, writeBatch } from "firebase/firestore";

export async function PUT(req: NextRequest) {
  try {
    const { categories } = await req.json();
    if (!categories || !Array.isArray(categories)) {
      return new NextResponse("É necessário enviar um array 'categories'", { status: 400 });
    }

    const batch = writeBatch(db);

    categories.forEach((cat: { id: string; order: number }) => {
      const ref = doc(db, "categories", cat.id);
      batch.update(ref, { order: cat.order });
    });

    await batch.commit();

    return new NextResponse("Reordenação realizada com sucesso", { status: 200 });
  } catch (error: any) {
    console.error("Erro ao reordenar categorias:", error);
    return new NextResponse("Erro ao reordenar categorias: " + error.message, { status: 500 });
  }
}
