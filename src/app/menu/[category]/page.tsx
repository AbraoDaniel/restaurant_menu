export default async function Category({params

}: {
  params: Promise<{category: string}>
}) {
  const { category } = await params;

  return (
    <div><h1>{`CATEGORIA: ${category}`}</h1></div>
  )
}
