# Manual de Usuario - Sistema de Backoffice para Tienda Online

## Introducción

Este documento describe las funcionalidades disponibles en el sistema de backoffice para la administración de una tienda online. El sistema permite gestionar productos, inventario, órdenes de compra, transferencias de stock, categorías, proveedores y más, con capacidades específicas para operaciones multi-provincia en Cuba.

---

## 1. Gestión de Productos

### 1.1 Lista de Productos

**Descripción:** Visualización y gestión completa del catálogo de productos del sistema.

> **📸 Screenshot:** _[Insertar captura de pantalla de la página principal de lista de productos, mostrando la tabla con todos los campos mencionados, filtros y acciones]_

**Información mostrada en la tabla:**

- **Imagen principal:** Thumbnail del producto con placeholder si no tiene imagen
- **Nombre del producto:** Identificación principal
- **Marca:** Fabricante del producto
- **Modelo:** Modelo específico del producto
- **Categoría:** Mostrada con badge azul, campo requerido
- **Alias:** Nombre alternativo para búsquedas
- **Tipo de producto:** Normal, Pack o Bundle con badges diferenciados
- **Unidad de medida:** Una de las 16 unidades disponibles
- **Etiquetas asociadas:** Tags para clasificación adicional
- **Requiere número de serie:** Indicador visual (Sí/No) para productos que necesitan seguimiento individual
- **Estado:** Activo/Inactivo con indicadores visuales

**Filtros avanzados disponibles:**

- **Tipo de producto:**

    - Normal: Producto individual estándar
    - Pack: Conjunto de artículos agrupados (ej: pack de cervezas)
    - Bundle: Colección con descuento combinado

- **Unidad de medida:** 16 opciones disponibles

    - **Peso:** Libras, Onzas, Kilogramos, Gramos
    - **Volumen:** Litros, Mililitros, Galones
    - **Longitud:** Pies, Pulgadas, Metros, Centímetros
    - **Agrupación:** Unidad, Caja, Estuche, Paquete, Docena

- **Categoría:** Búsqueda por texto libre del nombre de categoría
- **Etiquetas:** Búsqueda por texto libre de etiquetas
- **Estado:** Activo o Inactivo

**Funcionalidades de la tabla:**

- Paginación inteligente (5, 10, 20, 50 elementos por página)
- Ordenamiento por cualquier columna
- Selección múltiple de productos
- Filtros aplicables en tiempo real con indicadores visuales
- Persistencia de configuración entre sesiones

> **📸 Screenshot:** _[Insertar captura de pantalla del panel de filtros expandido mostrando todas las opciones de filtrado]_

### 1.2 Acciones Disponibles por Producto

Cada producto tiene un menú de acciones contextual:

- **Ver detalles:** Visualizar información completa
- **Editar producto:** Modificar todos los datos
- **Gestionar etiquetas:** Agregar/quitar etiquetas
- **Gestionar imágenes:** Subir, eliminar y organizar imágenes
- **Ver números de serie:** Solo para productos que requieren números de serie
- **Eliminar producto:** Desactivar (soft delete) - solo productos activos
- **Restaurar producto:** Reactivar - solo productos inactivos

### 1.3 Crear/Editar Productos

**Campos obligatorios:**

- **Nombre:** Texto libre, identificación principal del producto
- **Categoría:** **CAMPO REQUERIDO** - Selector dropdown con categorías existentes
    - **Restricción crítica:** No se pueden crear productos sin una categoría válida
    - Si no existen categorías, el sistema mostrará mensaje de error y opción para crear una

**Campos opcionales:**

- **Marca:** Texto libre para el fabricante
- **Modelo:** Texto libre para el modelo específico
- **Alias:** Nombre alternativo para facilitar búsquedas
- **Descripción:** Editor de texto enriquecido para descripción detallada
- **Unidad de medida:** Selector con las 16 opciones disponibles (por defecto: "Unidad")
- **Requiere número de serie:** Checkbox para activar seguimiento individual

**Configuración de números de serie:**

- **Propósito:** Para productos que requieren seguimiento individual (ej: teléfonos con IMEI, electrónicos con números de serie únicos)
- **Implicaciones:** Al activar esta opción:
    - Cada unidad del producto debe tener un número de serie único
    - En órdenes de compra se deben ingresar manualmente los números de serie
    - En transferencias se deben seleccionar números de serie específicos
    - En recepciones se deben confirmar los números de serie recibidos

**Tipos de producto y sus características:**

- **Producto Normal:** Artículo individual que se vende por separado
- **Producto Bundle:** Colección de productos con descuento combinado
- **Producto Pack:** Conjunto de artículos agrupados (requiere selector de productos componentes)

**Validaciones del formulario:**

- Nombre no puede estar vacío
- Categoría es obligatoria (dependencia del sistema)
- Para productos Pack: debe tener al menos un producto componente
- Límites de caracteres en campos de texto
- Verificación de unicidad donde corresponda

### 1.4 Gestión de Imágenes

**Funcionalidad:** Sistema completo de gestión de imágenes por producto.

**Características:**

- Subida múltiple de imágenes
- Previsualización antes de subir
- Organización y reordenamiento
- Eliminación individual
- Soporte para formatos estándar de imagen

### 1.5 Números de Serie

**Funcionalidad:** Sistema completo de gestión y seguimiento de números de serie para productos que requieren identificación individual.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Vista de la página principal de números de serie mostrando la tabla con columnas de producto, número de serie, estado y provincia]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Página principal de números de serie:**

- **Vista general:** Todos los números de serie del sistema
- **Vista por producto:** Números de serie específicos de un producto
- **Filtrado avanzado:** Por producto, estado, provincia actual
- **Información mostrada:**
    - Nombre del producto
    - Número de serie único
    - Estado actual (Disponible, Vendido, En Tránsito, Defectuoso, Devuelto)
    - Provincia actual donde se encuentra
    - Descripción adicional
    - Fechas de recepción y venta
    - Fecha de creación en el sistema

**Estados de números de serie:**

- **Disponible:** Número de serie en inventario, listo para venta
- **Vendido:** Producto vendido al cliente final
- **En Tránsito:** Número de serie en movimiento entre provincias
- **Defectuoso:** Producto con problemas, fuera de venta
- **Devuelto:** Producto devuelto por el cliente

**Acceso desde productos:**

- Enlace directo desde los detalles de cualquier producto que requiera números de serie
- Vista filtrada automáticamente para mostrar solo los números de serie de ese producto específico

---

## 2. Gestión de Productos por Provincia

### 2.1 Configuración Provincial

**Descripción:** Sistema de precios y disponibilidad específico por cada una de las 16 provincias cubanas.

**Provincias disponibles en el sistema:**

- Pinar del Río (PRI)
- Artemisa (ART)
- La Habana (LHA)
- Mayabeque (MAY)
- Matanzas (MTZ)
- Cienfuegos (CFG)
- Villa Clara (VLC)
- Sancti Spíritus (SSP)
- Ciego de Ávila (CAV)
- Camagüey (CAM)
- Las Tunas (LTU)
- Holguín (HOL)
- Granma (GRM)
- Santiago de Cuba (SCU)
- Guantánamo (GTM)
- Isla de la Juventud (IJV)

**Información mostrada por configuración:**

- **Provincia:** Nombre completo de la provincia
- **Producto:** Nombre del producto configurado
- **Porcentaje de oferta:** Descuento aplicable (0-100%)
- **Precio de costo:** Precio de adquisición del producto
- **Precio de venta:** Precio final al cliente
- **Tipo de stock:** Clasificación del inventario (Normal, Bajo Demanda)
- **Disponibilidad:** Estado disponible/no disponible por provincia

**Propósito:** Permite estrategias comerciales diferenciadas según condiciones económicas locales de cada provincia.

---

## 3. Gestión de Categorías

### 3.1 Lista de Categorías

**Descripción:** Sistema de categorización fundamental para la organización del catálogo.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Vista de la tabla de categorías mostrando la lista completa con columnas de nombre y estado "Mostrar en inicio"]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Información mostrada:**

- **Nombre de la categoría:** Identificación única
- **Mostrar en inicio:** Indicador visual (Sí/No) con badges coloridos para controlar visibilidad en página principal

**Importancia crítica:** Las categorías son **dependencia obligatoria** para crear productos. Sin categorías existentes, no se pueden agregar productos al sistema.

### 3.2 Crear/Editar Categorías

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Formulario de creación/edición de categorías mostrando los campos de nombre y checkbox "Mostrar en página de inicio"]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Campos del formulario:**

- **Nombre:** Campo obligatorio, texto libre para identificar la categoría
- **Mostrar en página de inicio:** Checkbox para controlar si aparece en la página principal de la tienda

**Validaciones:**

- Nombre obligatorio y no puede estar vacío
- Verificación de unicidad de nombres
- Límites apropiados de caracteres

**Flujo recomendado:** Crear categorías antes que productos para evitar bloqueos en el sistema.

---

## 4. Gestión de Órdenes de Compra

### 4.1 Lista de Órdenes de Compra

**Descripción:** Control completo del ciclo de vida de órdenes de compra a proveedores.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Vista de la tabla de órdenes de compra mostrando todas las columnas mencionadas y diferentes estados con sus colores distintivos]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Información mostrada en la tabla:**

- **ID de orden:** Identificador único secuencial
- **Proveedor:** Nombre del proveedor seleccionado
- **Provincia destino:** Una de las 16 provincias cubanas
- **Estado:** Badge colorizado según el estado actual
- **Tipo de pago:** Método de pago con icono representativo
- **Cantidad de líneas:** Número de productos diferentes en la orden
- **Total de la orden:** Suma calculada automáticamente
- **Fechas de control:** Solicitud, aprobación, tránsito, recepción
- **Responsables:** Usuarios que ejecutaron cada acción

### 4.2 Estados del Flujo de Trabajo

**1. Pendiente de Aprobación (Estado inicial):**

- La orden fue creada pero aún no autorizada
- Requiere revisión y aprobación antes de proceder
- Se puede editar, aprobar, rechazar o cancelar/Naranja

**2. Aprobada:**

- La orden ha sido autorizada oficialmente
- Lista para ser procesada por el proveedor
- Ya no se puede editar
- Se puede marcar en tránsito o cancelar

**3. En Tránsito:**

- Los productos han sido enviados por el proveedor
- Están en camino hacia el destino especificado
- Se puede recibir parcial/totalmente o cancelar en casos excepcionales

**4. Recibida Parcialmente:**

- Se han recibido algunos productos pero no la totalidad
- Estado transitorio hasta completar la recepción
- Permite continuar recibiendo productos restantes claro

**5. Recibida Completamente:**

- Todos los productos fueron recibidos exitosamente
- Estado final del flujo exitoso
- No se pueden realizar más acciones oscuro

**6. Rechazada:**

- La orden fue rechazada durante el proceso de aprobación
- **Requiere nota explicativa obligatoria** del motivo
- Estado final, no permite más acciones

**7. Cancelada:**

- La orden fue cancelada antes de completarse
- **Requiere nota explicativa obligatoria** del motivo
- Estado final, no permite más acciones

### 4.3 Tipos de Pago Disponibles

El sistema soporta 8 métodos de pago con iconografía específica:

- **Efectivo:** Pago en efectivo al recibir
- **Transferencia bancaria:** Transferencia electrónica
- **Tarjeta de crédito:** Pago con tarjeta de crédito
- **Tarjeta de débito:** Pago con tarjeta de débito
- **Cheque:** Pago mediante cheque
- **Gateway de pago:** Procesador de pagos online
- **Criptomoneda:** Pago con monedas digitales
- **Otro:** Método personalizado

### 4.4 Crear/Editar Órdenes de Compra

**Campos obligatorios del formulario:**

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Formulario de creación de orden de compra mostrando los campos de proveedor, provincia destino, tipo de pago y lista de productos]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

- **Proveedor:** Selector dropdown con proveedores registrados en el sistema
    - **Restricción:** Si no hay proveedores, no se pueden crear órdenes
- **Provincia destino:** Selector con las 16 provincias cubanas
- **Tipo de pago:** Selector con iconos para cada método
- **Lista de productos:** Mínimo un producto con cantidad y precio válidos

**Campos opcionales:**

- **Observaciones:** Campo de texto libre para notas adicionales sobre la orden

**Selector de productos - Características avanzadas:**

- **Búsqueda inteligente:** Autocompletado por nombre de producto (mínimo 2 caracteres)
- **Validación de unicidad:** No permite productos duplicados en la misma orden
- **Control de cantidades:** Solo números enteros positivos mayores a cero
- **Control de precios:** Solo números decimales positivos
- **Cálculo automático:** Total de línea y total general se calculan dinámicamente

**Gestión de números de serie en órdenes de compra:**

Para productos que requieren números de serie, el sistema incluye funcionalidades adicionales:

- **Entrada manual obligatoria:** Al agregar un producto que requiere números de serie, se debe ingresar manualmente cada número
- **Validación de cantidad:** La cantidad de números de serie debe coincidir exactamente con la cantidad ordenada
- **Control de duplicados:** No se permiten números de serie duplicados en la misma orden
- **Formato flexible:** Acepta cualquier formato de número de serie (alfanumérico)
- **Indicador visual:** Los productos que requieren números de serie se muestran con indicador especial

**Ejemplo de proceso con números de serie:**

- Se ordena 5 unidades del teléfono XYZ (requiere números de serie)
- El sistema solicita ingresar exactamente 5 números de serie únicos
- Cada número se valida para evitar duplicados
- Los números se asocian automáticamente al producto y orden

**Validaciones críticas del formulario:**

- Debe existir al menos un proveedor en el sistema
- Mínimo un producto en la orden
- Cantidades deben ser enteros positivos (≥ 1)
- Precios unitarios deben ser decimales positivos (> 0)
- No se pueden duplicar productos en la misma orden
- Para productos con números de serie: cantidad exacta de números únicos
- Proveedor y provincia son campos obligatorios

### 4.5 Acciones Disponibles por Estado

**Estado: Pendiente de Aprobación**

- **Editar:** Modificar cualquier aspecto de la orden
- **Aprobar:** Autorizar la orden (requiere confirmación del usuario)
- **Rechazar:** Denegar la orden (**requiere nota explicativa obligatoria**)
- **Cancelar:** Anular la orden (**requiere nota explicativa obligatoria**)

**Estado: Aprobada**

- **Marcar en tránsito:** Indicar que el proveedor envió los productos
- **Cancelar:** Anular la orden (**requiere nota explicativa obligatoria**)

**Estado: En Tránsito**

- **Recibir parcialmente:** Registrar recepción de cantidades específicas por producto
- **Cancelar:** Anular por circunstancias excepcionales (**requiere nota explicativa obligatoria**)

**Estado: Recibida Parcialmente**

- **Continuar recibiendo:** Completar la recepción de productos pendientes

### 4.6 Sistema de Recepción Parcial

**Funcionalidad avanzada:** El sistema permite recibir **solo una parte** de lo ordenado originalmente.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Formulario de recepción parcial mostrando productos ordenados, cantidades disponibles para recibir y controles de cantidad]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Características del sistema:**

- **Control granular:** Cantidad específica por cada producto de la orden
- **Validaciones de recepción:**
    - Cantidad mínima a recibir: 1 unidad
    - Cantidad máxima: no puede exceder lo ordenado originalmente
    - Solo números enteros positivos
- **Progreso visual:** Barras de progreso que muestran porcentaje recibido vs ordenado
- **Estados por producto:** Badges que indican "Recibido", "Pendiente", "Completo"
- **Cálculo automático:** Totales y porcentajes de completitud

**Gestión de números de serie en recepción:**

Para productos que requieren números de serie durante la recepción:

- **Confirmación de números de serie:** Se deben confirmar los números de serie específicos que se están recibiendo
- **Selección de la lista:** Los números de serie aparecen preseleccionados según lo ordenado
- **Validación de cantidades:** La cantidad de números de serie seleccionados debe coincidir con la cantidad a recibir
- **Actualización de estado:** Los números de serie recibidos cambian su estado a "Disponible" en la provincia destino

**Ejemplo práctico de recepción parcial con números de serie:**

- Orden original: 5 teléfonos con números de serie: A123, B456, C789, D012, E345
- Primera recepción: 2 unidades → Seleccionar números A123 y B456
- Segunda recepción: 3 unidades → Seleccionar números C789, D012 y E345
- El sistema rastrea cada número de serie individualmente

### 4.7 Gestión de Notas Obligatorias

**Situaciones que requieren notas explicativas:**

- **Rechazar una orden:** Campo de texto obligatorio para explicar motivos del rechazo
- **Cancelar una orden:** Campo de texto obligatorio para documentar razones de cancelación

**Propósito de las notas:**

- Proporcionar trazabilidad de decisiones importantes
- Facilitar auditorías posteriores
- Documentar lecciones aprendidas
- Mejorar procesos futuros

**Validación:** El sistema no permitirá proceder sin completar la nota explicativa en estos casos.

---

## 5. Gestión de Transferencias de Stock

### 5.1 Lista de Transferencias de Stock

**Descripción:** Sistema para mover inventario entre las diferentes provincias cubanas.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Vista de la tabla de transferencias de stock mostrando origen, destino, estado y detalles del courier]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Información mostrada en la tabla:**

- **ID de transferencia:** Identificador único
- **Provincia origen:** De dónde sale el stock
- **Provincia destino:** A dónde va el stock
- **Estado:** Badge colorizado según estado actual
- **Courier/Transportista:** Empresa o persona responsable del traslado
- **Cantidad de líneas:** Número de productos diferentes transferidos
- **Fechas de control:** Solicitud, aprobación, envío, recepción
- **Responsables:** Usuarios que ejecutaron cada acción

### 5.2 Estados del Flujo de Transferencias

**Los estados son idénticos a las órdenes de compra:**

**1. Pendiente de Aprobación:** Transferencia creada, esperando autorización
**2. Aprobada:** Transferencia autorizada, lista para envío
**3. En Tránsito:** Productos en camino con courier asignado
**4. Recibida Parcialmente:** Algunos productos recibidos, otros pendientes
**5. Recibida Completamente:** Todos los productos transferidos exitosamente
**6. Rechazada:** Transferencia denegada (**requiere nota obligatoria**)
**7. Cancelada:** Transferencia anulada (**requiere nota obligatoria**)

### 5.3 Crear/Editar Transferencias de Stock

**Campos obligatorios del formulario:**

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Formulario de creación de transferencia de stock mostrando campos de provincia origen, destino y lista de productos]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

- **Provincia origen:** Selector con las 16 provincias cubanas
- **Provincia destino:** Selector con las 16 provincias cubanas
- **Lista de productos:** Mínimo un producto con cantidad válida

**Campos opcionales:**

- **Observaciones:** Notas adicionales sobre la transferencia

**Gestión de números de serie en transferencias:**

Para productos que requieren números de serie, las transferencias incluyen funcionalidades especiales:

- **Verificación de disponibilidad:** Solo se pueden transferir números de serie que estén disponibles en la provincia origen
- **Selección específica:** Se debe seleccionar exactamente qué números de serie se van a transferir
- **Validación de cantidades:** La cantidad de números de serie seleccionados debe coincidir con la cantidad a transferir
- **Control de stock:** El sistema verifica que los números de serie estén en estado "Disponible" en la provincia origen

**Validaciones específicas:**

- **Provincias diferentes:** Origen y destino no pueden ser iguales
- **Productos únicos:** No se pueden duplicar productos en la misma transferencia
- **Cantidades válidas:** Solo números enteros positivos (≥ 1)
- **Stock disponible:** Verificación de inventario suficiente en provincia origen
- **Números de serie disponibles:** Para productos que los requieren, verificación de números disponibles

### 5.4 Gestión de Tránsito con Courier

**Funcionalidad:** Al marcar una transferencia "En Tránsito" se requiere especificar el transportista y seleccionar números de serie específicos.

**Proceso completo de puesta en tránsito:**

**1. Información del transporte:**

- **Nombre del courier/transportista:** Campo de texto obligatorio que identifica quién transporta la mercancía

**2. Selección de números de serie (para productos que los requieren):**

- **Lista de números disponibles:** Se muestran todos los números de serie disponibles en la provincia origen
- **Selección exacta:** Se debe seleccionar exactamente la cantidad de números de serie que se van a transferir
- **Búsqueda y filtrado:** Sistema de búsqueda para localizar números de serie específicos
- **Validación:** No se puede proceder sin seleccionar la cantidad exacta requerida

**3. Resumen de la transferencia:**

- **Ruta:** Información clara de provincia origen → provincia destino
- **Productos y cantidades:** Lista detallada de todos los artículos
- **Números de serie:** Lista específica de los números de serie en tránsito

**Propósito:** Trazabilidad completa del proceso de transferencia y responsabilidad del transporte.

### 5.5 Sistema de Recepción Parcial en Transferencias

**Funcionalidad idéntica a órdenes de compra con funcionalidades adicionales para números de serie:**

**Características generales:**

- Recepción por cantidades específicas
- Validaciones de cantidad mínima (1) y máxima (no exceder transferido)
- Progreso visual por producto
- Estados y badges indicativos
- Cálculo automático de completitud

**Gestión específica de números de serie en recepción:**

**1. Selección de números de serie a recibir:**

- **Lista de números en tránsito:** Se muestran todos los números de serie que están siendo transferidos
- **Selección flexible:** Se pueden seleccionar solo algunos números de serie para recepción parcial
- **Validación de cantidades:** La cantidad de números de serie seleccionados debe coincidir con la cantidad a recibir

**2. Proceso de confirmación:**

- **Revisión de números:** Lista clara de los números de serie que se están recibiendo
- **Actualización de estado:** Los números recibidos cambian a estado "Disponible" en la provincia destino
- **Números restantes:** Los no recibidos permanecen "En Tránsito" para futuras recepciones

**Ejemplo práctico de recepción parcial con números de serie:**

- Transferencia: 4 laptops con números L001, L002, L003, L004
- Primera recepción: 2 unidades → Seleccionar L001 y L002
- Estado: L001 y L002 = "Disponible" en destino, L003 y L004 = "En Tránsito"
- Segunda recepción: 2 unidades → Seleccionar L003 y L004
- Resultado final: Todas las laptops disponibles en provincia destino

### 5.6 Acciones por Estado (Transferencias)

**Estado: Pendiente de Aprobación**

- **Editar:** Modificar productos, cantidades, provincias
- **Aprobar:** Autorizar la transferencia
- **Rechazar:** Denegar (**requiere nota explicativa obligatoria**)
- **Cancelar:** Anular (**requiere nota explicativa obligatoria**)

**Estado: Aprobada**

- **Marcar en tránsito:** Asignar courier e iniciar traslado (**requiere selección de números de serie**)
- **Cancelar:** Anular (**requiere nota explicativa obligatoria**)

**Estado: En Tránsito**

- **Recibir parcialmente:** Registrar llegada de productos específicos (**incluye selección de números de serie**)
- **Cancelar:** Anular en casos excepcionales (**requiere nota explicativa obligatoria**)

---

## 6. Gestión de Proveedores

### 6.1 Lista de Proveedores

**Descripción:** Administración de la red de proveedores del sistema.

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Vista de la tabla de proveedores mostrando nombre, contacto, dirección y estado activo/inactivo]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Información mostrada en la tabla:**

- **Nombre:** Identificación del proveedor
- **Correo electrónico:** Contacto principal
- **Teléfono:** Número de contacto
- **Dirección:** Ubicación física
- **Estado:** Activo/Inactivo con indicadores visuales

**Funcionalidades disponibles:**

- Listado completo de proveedores registrados
- Filtros y búsqueda
- Paginación estándar
- Acciones de CRUD completas

### 6.2 Gestión de Proveedores

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Formulario de creación/edición de proveedores mostrando campos de nombre, contacto y estado]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Campos del formulario:**

- **Nombre del proveedor:** Campo obligatorio, identificación principal
- **Correo electrónico:** Campo opcional para contacto
- **Teléfono:** Campo opcional para comunicación directa
- **Dirección:** Campo opcional para ubicación física
- **Estado activo:** Checkbox para controlar disponibilidad

**Funcionalidades básicas:**

- **Crear proveedor:** Formulario de registro de nuevo proveedor
- **Editar proveedor:** Modificación de datos existentes
- **Ver detalles:** Información completa del proveedor
- **Desactivar/Activar:** Control del estado del proveedor

**Importancia:** Los proveedores son **dependencia obligatoria** para crear órdenes de compra. Sin proveedores registrados, no se pueden generar órdenes.

---

## 7. Autenticación y Seguridad

### 7.1 Sistema de Login

**Funcionalidad:** Acceso seguro al sistema con credenciales de usuario.

**Características:**

- Validación de credenciales
- Gestión de sesiones
- Redirección automática tras login exitoso

### 7.2 Registro de Usuarios

**Funcionalidad:** Creación de nuevas cuentas en el sistema.

**Proceso:** Formulario de registro con validaciones de seguridad.

---

## 8. Características Generales del Sistema

### 8.1 Interfaz de Usuario

**Diseño moderno y funcional:**

- **Responsive design:** Adaptable a diferentes tamaños de pantalla
- **Tema dual:** Modo claro y oscuro según preferencia del usuario
- **Navegación intuitiva:** Breadcrumbs y menú lateral organizado
- **Tipografía clara:** Textos legibles y bien estructurados

### 8.2 Tablas Inteligentes

**Funcionalidades avanzadas:**

- **Paginación flexible:** 5, 10, 20, 50 elementos por página
- **Filtros dinámicos:** Panel expandible con filtros específicos por columna
- **Ordenamiento:** Clic en encabezados para ordenar ascendente/descendente
- **Selección múltiple:** Checkboxes para operaciones en lote
- **Búsqueda en tiempo real:** Con debounce para optimizar rendimiento
- **Persistencia de estado:** Configuración guardada entre sesiones
- **Indicadores visuales:** Estados, badges coloridos, iconos descriptivos

### 8.3 Formularios Avanzados

**Características robustas:**

- **Validación en tiempo real:** Feedback inmediato al usuario
- **Manejo de errores:** Mensajes descriptivos del servidor
- **Estados de carga:** Indicadores visuales durante procesamiento
- **Autocompletado inteligente:** Sugerencias dinámicas (mínimo 2 caracteres)
- **Selectores dinámicos:** Opciones que se actualizan según contexto
- **Editor de texto enriquecido:** Para descripciones detalladas

### 8.4 Sistema de Acciones Contextual

<!-- PLACEHOLDER PARA SCREENSHOT -->

**[INSERTAR SCREENSHOT: Menú contextual de acciones mostrando opciones disponibles según el estado (ej: aprobar, rechazar, cancelar) con diálogos de confirmación]**

<!-- /PLACEHOLDER PARA SCREENSHOT -->

**Menús inteligentes:**

- **Acciones por estado:** Solo se muestran acciones válidas según el estado actual
- **Confirmaciones:** Diálogos de confirmación para acciones destructivas
- **Estados de carga:** Feedback visual durante ejecución de acciones
- **Mensajes de resultado:** Toasts informativos de éxito/error

### 8.5 Gestión Visual de Estados

**Elementos visuales informativos:**

- **Badges colorizado:** Cada estado tiene color específico y significativo
- **Iconos representativos:** Símbolos que facilitan identificación rápida
- **Barras de progreso:** Indicadores visuales de completitud
- **Timeline de eventos:** Historial cronológico de acciones
- **Metadatos de auditoría:** Información de quién y cuándo se ejecutó cada acción

---

## 9. Dependencias y Restricciones del Sistema

### 9.1 Dependencias Críticas

**Productos requieren Categorías:**

- No se pueden crear productos sin categorías existentes
- Mensaje de error y redirección para crear categorías primero

**Órdenes de Compra requieren Proveedores:**

- No se pueden crear órdenes sin proveedores registrados
- Mensaje explicativo con opción para crear proveedor

**Números de Serie requieren configuración específica:**

- Solo productos marcados como "requiere número de serie" pueden tener números de serie
- Los números de serie son obligatorios para estos productos en todas las operaciones

### 9.2 Validaciones de Integridad

**Cantidades y Precios:**

- Solo números positivos mayores a cero
- Validación tanto en frontend como backend
- Cálculos automáticos de totales

**Números de Serie:**

- Unicidad absoluta en todo el sistema
- Formato alfanumérico flexible
- Validación de estado antes de operaciones
- Trazabilidad completa de movimientos

**Unicidad:**

- No se permiten productos duplicados en órdenes/transferencias
- Verificación de nombres únicos donde corresponda
- Números de serie únicos globalmente

**Estados y Transiciones:**

- Solo se permiten transiciones válidas entre estados
- Validación de acciones según estado actual
- Control de números de serie según el estado

---

## 10. Flujos de Trabajo Principales

### 10.1 Flujo Completo de Orden de Compra

**Flujo estándar:**

1. **Crear orden** → Estado: Pendiente de Aprobación
2. **Aprobar orden** → Estado: Aprobada
3. **Marcar en tránsito** → Estado: En Tránsito
4. **Recibir productos** → Estado: Recibida Parcialmente/Completamente

**Flujo con números de serie:**

1. **Crear orden** → Ingresar números de serie manualmente → Estado: Pendiente de Aprobación
2. **Aprobar orden** → Estado: Aprobada
3. **Marcar en tránsito** → Estado: En Tránsito
4. **Recibir productos** → Confirmar números de serie recibidos → Estado: Recibida

**Flujos alternativos:**

- **Rechazar** (desde Pendiente) → Estado: Rechazada + nota obligatoria
- **Cancelar** (desde cualquier estado no final) → Estado: Cancelada + nota obligatoria

### 10.2 Flujo Completo de Transferencia de Stock

**Flujo estándar:**

1. **Crear transferencia** → Estado: Pendiente de Aprobación
2. **Aprobar transferencia** → Estado: Aprobada
3. **Marcar en tránsito** → Asignar courier → Estado: En Tránsito
4. **Recibir productos** → Estado: Recibida Parcialmente/Completamente

**Flujo con números de serie:**

1. **Crear transferencia** → Estado: Pendiente de Aprobación
2. **Aprobar transferencia** → Estado: Aprobada
3. **Marcar en tránsito** → Asignar courier + seleccionar números de serie específicos → Estado: En Tránsito
4. **Recibir productos** → Seleccionar números de serie a recibir → Estado: Recibida

**Flujos alternativos idénticos a órdenes de compra**

### 10.3 Flujo de Gestión de Productos

1. **Crear categoría** (prerequisito obligatorio)
2. **Crear producto** con categoría asignada
3. **Configurar si requiere números de serie** (opcional)
4. **Configurar precios por provincia** (opcional)
5. **Gestionar imágenes y etiquetas** (opcional)
6. **Administrar números de serie** (si aplicable)
7. **Activar/desactivar** según necesidades del negocio

### 10.4 Flujo de Números de Serie

**Para productos que requieren números de serie:**

1. **Configuración inicial:** Marcar producto como "requiere número de serie"
2. **Ingreso al sistema:** Los números de serie ingresan via órdenes de compra
3. **Trazabilidad:** Cada número tiene estado y ubicación específica
4. **Transferencias:** Selección específica de números para movimiento entre provincias
5. **Venta:** Cambio de estado a "Vendido" al completar venta

**Estados del ciclo de vida:**

- **Creación:** Ingreso manual en orden de compra
- **Disponible:** En inventario, listo para venta
- **En Tránsito:** Durante transferencias entre provincias
- **Vendido:** Entregado al cliente final
- **Defectuoso/Devuelto:** Estados especiales según circunstancias

---

## Conclusión

Este sistema de backoffice proporciona una solución integral para la gestión de tiendas online con operaciones multi-provincia. Las funcionalidades cubren desde la administración básica de productos hasta complejos flujos de órdenes de compra y transferencias de inventario, incluyendo un robusto sistema de trazabilidad de números de serie.

<!-- PLACEHOLDER PARA SCREENSHOTS -->

**📸 Nota sobre Screenshots:**

Este documento incluye múltiples placeholders marcados con `[INSERTAR SCREENSHOT: ...]` ubicados estratégicamente en las secciones principales para facilitar la inserción manual de capturas de pantalla. Los screenshots sugeridos incluyen:

- **Lista de productos** con filtros y acciones
- **Formularios de creación** para productos, órdenes, transferencias y proveedores
- **Tablas principales** de cada módulo (categorías, órdenes, transferencias, proveedores, números de serie)
- **Procesos de recepción** y gestión de números de serie
- **Menús de acciones contextuales** y diálogos de confirmación

Para una presentación completa, se recomienda capturar pantallas reales del sistema funcionando e insertarlas en los lugares indicados.

<!-- /PLACEHOLDER PARA SCREENSHOTS -->

**Fortalezas principales:**

- **Flujos de trabajo bien definidos** con estados claros y transiciones lógicas
- **Validaciones robustas** que aseguran integridad de datos
- **Flexibilidad en recepciones** permitiendo entregas parciales
- **Trazabilidad completa** con notas obligatorias y auditoría
- **Sistema avanzado de números de serie** para seguimiento individual de productos
- **Gestión granular de inventario** con control por provincia y números de serie
- **Interfaz moderna** con feedback visual inmediato
- **Adaptación al mercado cubano** con las 16 provincias y consideraciones locales

**Capacidades destacadas del sistema de números de serie:**

- **Seguimiento individual:** Cada producto con número de serie es rastreado individualmente
- **Trazabilidad completa:** Desde ingreso hasta venta, incluyendo movimientos entre provincias
- **Control de estados:** Sistema robusto de estados que refleja el ciclo de vida real
- **Flexibilidad operativa:** Selección específica de números de serie en transferencias y recepciones
- **Validaciones integrales:** Prevención de duplicados y control de disponibilidad

El sistema está diseñado para escalar y manejar las complejidades de un negocio de comercio electrónico distribuido geográficamente, proporcionando las herramientas necesarias para una gestión eficiente, controlada y totalmente trazable.
