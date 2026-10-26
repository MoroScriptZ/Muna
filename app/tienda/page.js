import Catalogo from "@/components/Catalogo";
import { categoriesOfGroup, groupBySlug } from "@/data/products";

// Lee ?grupo= y ?categoria= (enlaces desde el inicio y desde la ruta del producto) en el servidor.
// La clave reinicia los filtros si el enlace cambia mientras ya se esta en la tienda.
export default function TiendaPage({ searchParams }) {
  const grupo = groupBySlug(searchParams.grupo ?? "")?.name ?? "Todos";
  const pedida = searchParams.categoria;
  const categoria = pedida && categoriesOfGroup(grupo).includes(pedida) ? pedida : "Todas";
  return <Catalogo key={`${grupo}|${categoria}`} grupoInicial={grupo} categoriaInicial={categoria} />;
}
