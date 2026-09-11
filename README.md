# Portfolio · Federica Blanco

App de React con TypeScript, Tailwind CSS 4 y Vite. Diseño responsive en inglés, con estética minimalista, fondo negro, texto blanco y acentos rojos.

## Desarrollo

```sh
npm install
npm run dev
```

Abrí la URL que muestra Vite en la terminal (por defecto http://localhost:5173).
La app necesita el servidor de desarrollo; no se abre directamente como archivo HTML.

## Verificación y compilación

```sh
npm run typecheck
npm run build
npm run preview
```

`build` comprueba TypeScript y genera el sitio estático en `dist/`.

## Estructura

- `src/App.tsx`: composición de la página.
- `src/components/`: navegación y secciones del portfolio.
- `src/styles.css`: Tailwind, tokens de diseño, estilos base e ilustración CSS.
- `public/assets/`: favicon y CV descargable.
- `vite.config.ts`: plugins de React y Tailwind.

Los componentes usan utilidades de Tailwind para layout, tipografía, espaciado y responsive. La composición geométrica también usa utilidades de Tailwind. El menú y la copia del email usan estado de React.

Se eligió Vite 6 por compatibilidad con el Node 18.18 disponible en este entorno. Las versiones instaladas quedan fijadas en `package-lock.json`.

El contenido profesional se basa en el CV proporcionado. El PDF descargable es el original, con sus datos de contacto. Este proyecto todavía no fue publicado.

Referencia: [integración oficial de Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite).

## Publicación automática con Cloudflare Pages

El proyecto usa la integración Git de Cloudflare Pages. La conexión inicial se hace una vez desde la cuenta de Cloudflare:

1. Ir a **Workers & Pages → Create application → Pages → Connect to Git**.
2. Autorizar GitHub para el repositorio `FedericaBlanco01/Portfolio-Federica-Blanco`.
3. Seleccionar estos valores:

| Configuración | Valor |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Dejar vacío (raíz del repositorio) |
| Node.js | `22` (definido en `.nvmrc`) |

4. Hacer el primer despliegue y verificar la URL `pages.dev` asignada.
5. Más adelante, conectar el dominio desde **Custom domains**.

Cada push a `main` dispara un build y publica la nueva versión si compila correctamente. No hace falta subir `dist`, instalar un servidor, ni agregar un workflow de GitHub Actions. Si se usan filtros de archivos para disparar builds, deben incluir `public/**`.

### Actualizar el CV

Reemplazar `public/assets/CV_Federica_Blanco.pdf`, manteniendo exactamente el mismo nombre, y ejecutar:

```sh
git add public/assets/CV_Federica_Blanco.pdf
git commit -m "Update CV"
git push origin main
```

Cloudflare incluirá el nuevo PDF en el despliegue. `public/_headers` pide revalidar el PDF para evitar reutilizar una copia vieja desde la caché del navegador. El texto del portfolio se edita por separado: reemplazar el PDF no modifica automáticamente la experiencia o las descripciones.

Documentación: [GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), [headers](https://developers.cloudflare.com/pages/configuration/headers/).
