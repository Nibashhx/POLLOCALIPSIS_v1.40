# 🐔 Pollocalipsis

> **¡El fin está cerca! (Y está delicioso)**

Roguelite de defensa de base ambientado en un barrio de **La Paz–El Alto, Bolivia**,
durante una crisis de bloqueos y desabastecimiento. El pollo escasea, tu pollería es
de las pocas abastecidas… y los pollos vinieron a cobrarse la revancha.

Defendé el negocio familiar de **1.240 pollos armados** repartidos en tres oleadas.

![Pollocalipsis](icons/icon-512.png)

---

## 🎮 Jugar

**[▶ Jugar ahora]([https://nibashhx.github.io/POLLOCALIPSIS_v1.40/])**

Se puede **instalar como app** en el celular o en el escritorio, y una vez instalada
**funciona sin conexión**.

---

## 📖 Cómo se juega

Tu pollería está en el centro del mapa. Tenés ~95 segundos de preparación antes de la
primera oleada.

| Acción | Cómo |
|---|---|
| Mover la cámara | Arrastrar, o WASD / flechas |
| Zoom | Botones **+** / **−** |
| Seleccionar | Tocar una unidad · 👥 y 🛡️ seleccionan por tipo |
| Recolectar | Seleccionar aldeanos → tocar un **árbol** o una **roca** |
| Atacar | Seleccionar tropas → tocar un **enemigo** |
| Construir | 🔨 → elegir edificio → tocar el terreno · **R** rota |
| Mapa / Pausa / Ajustes | Botones 🗺 ⏸ ⚙ arriba a la derecha |
| Pantalla completa | Botón ⛶ |

### Las oleadas

| Oleada | Pollos |
|---:|---:|
| 1 | 40 |
| 2 | 200 |
| 3 | **1.000** |
| | **1.240 en total** |

El crecimiento es exponencial (razón 5). Los pollos son débiles de a uno: el peligro
es la **masa**. Levantá muros para embudarlos y torres detrás para barrerlos.

> 💡 Como máximo hay ~190 pollos vivos a la vez; el resto espera su turno para entrar.
> Sin ese límite ni el navegador ni la partida serían jugables.

---

## ⚙️ Ajustes

Pensados para que ande bien también en celulares modestos:

- **Música** y **efectos** — volumen independiente
- **Efectos de muerte** — Todos / Reducidos / Ninguno
- **Detalle de pollos** — Alto / Automático / Bajo
  *(en Automático los primeros se dibujan detallados y el resto en versión simple)*
- **Proteger aldeanos** — Al inicio / Siempre / Nunca
- **Sacudida de cámara**

**¿Se traba en la oleada final?** Poné *Detalle de pollos* en **Bajo** y *Efectos de
muerte* en **Ninguno**. En pruebas eso mejora la fluidez alrededor de un 50 %.

---

## 🛠️ Detalles técnicos

Todo el juego es **un único archivo HTML** sin motor ni dependencias externas:

- **Gráficos**: SVG generado y manipulado por JavaScript vanilla. Proyección
  isométrica dimétrica 2:1. Los sprites ilustrados van incrustados en base64.
- **El pollo enemigo** está dibujado con paths SVG vectoriales y se registra como un
  único `<symbol>`: cada pollo en pantalla es sólo un `<use>` que lo referencia, por
  eso pueden coexistir cientos sin que el DOM colapse.
- **Música y sonido**: sintetizados en tiempo real con la Web Audio API — no hay
  archivos de audio. La banda sonora es un **carnavalito** andino con zampoña,
  charango y bombo.
- **Sin librerías, sin build, sin instalación.** Abrís el HTML y funciona.

### Estructura

```
.
├── index.html          # el juego completo (~15 MB, todo incluido)
├── manifest.json       # metadatos de la PWA
├── service-worker.js   # caché para jugar sin conexión
├── icons/              # iconos de la app
└── README.md
```

---

## 🚀 Publicar en GitHub Pages

1. Creá un repositorio nuevo (por ejemplo `pollocalipsis`) y subí estos archivos a la
   raíz de la rama `main`.

   ```bash
   git init
   git add .
   git commit -m "Pollocalipsis: versión inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/pollocalipsis.git
   git push -u origin main
   ```

2. En el repositorio: **Settings → Pages**.
3. En *Source* elegí **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guardá y esperá un minuto. Queda publicado en
   `https://TU-USUARIO.github.io/pollocalipsis/`.

> **Importante:** la PWA necesita **HTTPS** para instalarse y funcionar sin conexión.
> GitHub Pages ya lo provee. Si abrís el `index.html` directamente desde el disco
> (`file://`) el juego anda igual, pero sin instalación ni modo offline.

### Al publicar una versión nueva

Subí el `index.html` actualizado y **cambiá `CACHE_VERSION`** en `service-worker.js`
(por ejemplo de `pollocalipsis-v1.39` a `v1.40`). Si no lo cambiás, quienes ya lo
tengan instalado seguirán viendo la versión vieja desde su caché.

---

## 📱 Instalar

- **Android (Chrome):** menú ⋮ → *Instalar aplicación*
- **iOS (Safari):** Compartir → *Añadir a pantalla de inicio*
- **Escritorio (Chrome/Edge):** el icono de instalar en la barra de direcciones

---

## 📄 Licencia

Elegí la que prefieras. Si no tenés preferencia, MIT es una opción sencilla: creá un
archivo `LICENSE` con el texto de la licencia MIT y tu nombre.

Ojo con el arte: si alguna ilustración fue generada con IA o proviene de terceros,
revisá las condiciones de uso antes de publicarla bajo una licencia abierta.
