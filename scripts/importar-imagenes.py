"""Copia las fotos de la carpeta de Drive (una carpeta por producto) a public/images/products/
y escribe data/imagenes.json (id -> lista de archivos, la primera es la portada).
Uso: python -I scripts/importar-imagenes.py "<ruta a la carpeta MUNA>"
"""
import json, re, shutil, sys
from pathlib import Path

origen = Path(sys.argv[1])
raiz = Path(__file__).resolve().parent.parent
destino = raiz / "public" / "images" / "products"
destino.mkdir(parents=True, exist_ok=True)

# carpeta -> ids de producto. Los correctores se reparten por el numero de tono del nombre del archivo.
CARPETAS = {
    "Borrador maqui": ["bmt2271"],
    "Brillos/AURA": ["bat1878-tono-05"],
    "Brillos/MOCCA": ["bam2430-tono-04"],
    "Contorno queen": ["cqt1981"],
    "Fijador": ["cn09"],
    "Gel cejas": ["mt2380"],
    "Iluminador torre": ["mt1665"],
    "Kit brochas básico": ["kbl2274"],
    "Papeletas": ["pmb2486"],
    "Primer Rosas": ["pm04"],
    "Rubor star": ["rcs2205-tono-04"],
    "Sombra coco": ["c06"],
    "Tónico": ["dtr1753"],
}
orden = lambda f: [int(n) for n in re.findall(r"\d+", f.name[:3])] or [99]

res = {}
def agregar(pid, archivos):
    lista = res.setdefault(pid, [])
    for f in archivos:
        nombre = f"{pid}-{len(lista) + 1}{f.suffix.lower()}"
        shutil.copyfile(f, destino / nombre)
        lista.append(nombre)

for carpeta, ids in CARPETAS.items():
    archivos = sorted((origen / carpeta).glob("*.*"), key=orden)
    for pid in ids:
        agregar(pid, archivos)

# Polvos Jack: banana / rosado en el nombre del archivo.
polvos = sorted((origen / "Polvos JACK").glob("*.*"), key=orden)
agregar("dy2188-banana", [f for f in polvos if "banana" in f.name.lower()])
agregar("dy2188-rosados", [f for f in polvos if "rosado" in f.name.lower()])

# Correctores: "N.CO.MINI TONO X" -> tono X; "CO.MINI" (carta de tonos) va al final de los cuatro.
corr = sorted((origen / "Correctores Mini").glob("*.*"), key=orden)
general = [f for f in corr if "tono" not in f.name.lower()]
for tono in ("2", "3", "6", "8"):
    agregar(f"cmt547-tono-{tono}", [f for f in corr if re.search(rf"tono {tono}\b", f.name.lower())] + general)

catalogo = {p["id"] for p in json.loads((raiz / "data" / "catalogo.json").read_text(encoding="utf-8"))}
assert set(res) == catalogo, f"faltan/sobran: {catalogo ^ set(res)}"
(raiz / "data" / "imagenes.json").write_text(json.dumps(res, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(res)} productos, {sum(map(len, res.values()))} imagenes")
