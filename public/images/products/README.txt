Fotos de los productos, importadas desde la carpeta de Drive con:

  python -I scripts/importar-imagenes.py "<ruta a la carpeta MUNA>"

El script copia las fotos como <id>-1.webp, <id>-2.webp... y escribe data/imagenes.json
(la primera foto de cada producto es la portada). Para cambiar una foto, reemplaza el archivo
conservando el nombre, o vuelve a correr el script.
