# Manual de Usuario - Sistema de Backoffice para Tienda Online

## Índice

1. [Introducción General](#introducción-general)
2. [Gestión de Productos](#gestión-de-productos)
3. [Gestión de Categorías](#gestión-de-categorías)
4. [Gestión de Órdenes de Compra](#gestión-de-órdenes-de-compra)
5. [Gestión de Transferencias de Stock](#gestión-de-transferencias-de-stock)
6. [Gestión de Proveedores](#gestión-de-proveedores)
7. [Gestión de Productos por Provincia](#gestión-de-productos-por-provincia)
8. [Números de Serie de Productos](#números-de-serie-de-productos)
9. [Conceptos Técnicos Importantes](#conceptos-técnicos-importantes)
10. [Validaciones y Reglas de Negocio](#validaciones-y-reglas-de-negocio)

---

## Introducción General

Este sistema de backoffice permite la gestión completa de una tienda online, incluyendo productos, inventario, órdenes de compra, transferencias entre provincias y configuración de precios regionales. El sistema está diseñado para manejar las 16 provincias de Cuba y soporta múltiples tipos de productos, unidades de medida y métodos de pago.

### Características Principales

- **Gestión multi-provincial:** Soporte completo para las 16 provincias cubanas
- **Control de inventario:** Transferencias de stock con seguimiento completo
- **Órdenes de compra:** Flujo completo desde solicitud hasta recepción
- **Precios regionales:** Configuración de precios específicos por provincia
- **Trazabilidad completa:** Seguimiento de todas las acciones y cambios de estado
- **Validaciones estrictas:** Control de integridad de datos y flujos de trabajo

---

## 1. Gestión de Productos

### 1.1 Vista General de Productos

La sección de productos permite gestionar todo el catálogo de la tienda, incluyendo productos normales, paquetes (bundles) y packs.

**Información mostrada en la tabla:**

- Imagen principal del producto
- Nombre y descripción
- Marca y modelo
- Categoría asociada
- Tipo de producto (Normal, Bundle, Pack)
- Unidad de medida
- Alias/código alternativo
- Estado de disponibilidad

### 1.2 Tipos de Productos Disponibles

**Producto Normal (Normal):**

- Productos individuales estándar
- Venta por unidad individual
- Configuración de precio único

**Bundle:**

- Agrupación de productos diferentes vendidos como conjunto
- Puede incluir productos de diferentes categorías
- Precio combinado con posible descuento

**Pack:**

- Agrupación de productos similares vendidos juntos
- Ejemplo: pack de cervezas, pack de cigarrillos
- Precio por pack completo

### 1.3 Unidades de Medida Soportadas

El sistema soporta 16 unidades de medida diferentes:

**Unidades básicas:**

- Unidad (pieza, artículo individual)

**Peso:**

- Libras (lb)
- Onzas (oz)
- Kilogramos (kg)
- Gramos (g)

**Volumen:**

- Litros (L)
- Mililitros (mL)
- Galones (gal)

**Longitud:**

- Pies (ft)
- Pulgadas (in)
- Metros (m)
- Centímetros (cm)

**Empaque:**

- Caja (Box)
- Caso (Case)
- Paquete (Pack)
- Docena (Dozen)

### 1.4 Crear/Editar Productos

**Campos obligatorios del formulario:**

- **Nombre:** Identificación principal del producto
- **Marca:** Fabricante o marca del producto
- **Modelo:** Modelo específico del producto
- **Categoría:** Selección de categoría existente (obligatorio)
- **Unidad de medida:** Una de las 16 unidades disponibles

**Campos opcionales:**

- **Descripción:** Editor de texto enriquecido para descripción detallada
- **Alias:** Código alternativo o nombre corto para búsquedas

**Restricción importante:** Si no existen categorías en el sistema, no se pueden crear productos. El sistema mostrará un mensaje explicativo con opciones para crear una categoría primero.

**Validaciones aplicadas:**

- Nombre único para evitar duplicados
- Categoría debe existir y estar activa
- Marca y modelo son obligatorios para identificación completa

### 1.5 Gestión de Imágenes de Productos

**Funcionalidades disponibles:**

- Subida múltiple de imágenes
- Establecimiento de imagen principal
- Eliminación de imágenes individuales
- Reordenamiento de imágenes por prioridad

**Formatos soportados:**

- JPG, JPEG, PNG, WebP
- Tamaño máximo por imagen: configurable
- Límite de imágenes por producto: configurable

---

## 2. Gestión de Categorías

### 2.1 Importancia de las Categorías

Las categorías son **fundamentales** en el sistema ya que:

- **No se pueden crear productos sin una categoría válida**
- Organizan el catálogo para los usuarios finales
- Permiten filtrado y navegación estructurada
- Determinan la visibilidad en la página principal

### 2.2 Campos del Formulario de Categorías

**Campos obligatorios:**

- **Nombre:** Identificación única de la categoría

**Campos opcionales:**

- **Mostrar en página de inicio:** Control de visibilidad en la página principal

**Validaciones:**

- El nombre es obligatorio
- Verificación de unicidad de nombres
- No se pueden eliminar categorías que tengan productos asociados

### 2.3 Dependencias del Sistema

**Restricción crítica:** El sistema tiene una dependencia estricta que requiere categorías existentes antes de poder agregar productos al catálogo. Si no hay categorías:

1. La creación de productos está bloqueada
2. Se muestra un mensaje informativo
3. Se proporciona acceso directo para crear categorías

---

## 3. Gestión de Órdenes de Compra

### 3.1 Vista General de Órdenes

Las órdenes de compra gestionan todo el flujo desde la solicitud de productos hasta su recepción completa. Incluyen seguimiento detallado de estados, proveedores, y productos solicitados.

**Información mostrada:**

- ID único de la orden
- Proveedor asociado
- Provincia de destino
- Estado del flujo de trabajo
- Tipo de pago
- Valor total de la orden
- Fechas de creación, aprobación, envío, recepción
- Usuario responsable de cada acción

### 3.2 Estados del Flujo de Trabajo y sus Significados

**Pendiente de Aprobación (PendingApproval):**

- Estado inicial cuando se crea una orden
- Requiere revisión y autorización antes de proceder
- Puede ser editada, aprobada, rechazada o cancelada
- Indicador visual: badge amarillo con animación pulsante

**Aprobada (Approved):**

- La orden ha sido autorizada y está lista para ser procesada
- Se puede marcar como "en tránsito" o cancelar
- No se puede editar una vez aprobada
- Indicador visual: badge azul sólido

**En Tránsito (InTransit):**

- Los productos han sido enviados por el proveedor
- Están en camino hacia el destino
- Se puede recibir parcial o totalmente, o cancelar
- Indicador visual: badge azul con animación pulsante

**Recibida Parcialmente (PartiallyReceived):**

- Se han recibido algunos productos pero no todos
- Permite recibir cantidades adicionales hasta completar la orden
- Estado transitorio hasta recepción completa
- Indicador visual: badge amarillo sólido

**Recibida Completamente (FullyReceived):**

- Todos los productos han sido recibidos exitosamente
- Estado final del flujo exitoso
- No se pueden realizar más acciones
- Indicador visual: badge verde sólido

**Rechazada (Rejected):**

- La orden fue rechazada durante la aprobación
- **Requiere una nota explicativa obligatoria** del motivo del rechazo
- Estado final, no se pueden realizar más acciones
- Indicador visual: badge rojo sólido

**Cancelada (Cancelled):**

- La orden fue cancelada antes de completarse
- **Requiere una nota explicativa obligatoria** del motivo de cancelación
- Estado final, no se pueden realizar más acciones
- Indicador visual: badge gris claro

### 3.3 Acciones Disponibles por Estado

**Pendiente de aprobación:**

- Editar orden
- Aprobar
- Rechazar (con nota obligatoria)
- Cancelar (con nota obligatoria)

**Aprobada:**

- Marcar en tránsito
- Cancelar (con nota obligatoria)

**En tránsito:**

- Recibir parcialmente
- Recibir completamente
- Cancelar (con nota obligatoria)

**Recibida parcialmente:**

- Recibir cantidades adicionales
- Marcar como recibida completamente

### 3.4 Crear/Editar Órdenes de Compra

**Campos obligatorios del formulario:**

- **Proveedor:** Selector dropdown con proveedores registrados
- **Provincia de destino:** Selector con las 16 provincias cubanas
- **Tipo de pago:** Selector con iconos representativos para cada método
- **Productos y cantidades:** Mínimo un producto con cantidad y precio válidos

**Campos opcionales:**

- **Observaciones:** Campo de texto libre para notas adicionales

**Validaciones importantes:**

- No se pueden agregar productos duplicados
- Las cantidades deben ser números positivos mayores a cero
- Los precios unitarios deben ser números positivos
- Debe haber al menos un producto en la orden
- El sistema calcula automáticamente el total de la orden

**Selector de productos:**

- Búsqueda por texto con autocompletado
- Visualización de información del producto (nombre, marca, modelo)
- Control de cantidades con validaciones en tiempo real
- Control de precios unitarios por producto
- Cálculo automático del subtotal por línea
- Verificación de productos únicos
- Control de cantidades y precios unitarios por producto
- Cálculo automático del total general

**Restricción importante:** Si no existen proveedores en el sistema, no se pueden crear órdenes de compra. El sistema mostrará opciones para crear un proveedor primero.

### 3.5 Tipos de Pago Disponibles

El sistema soporta 8 tipos de pago diferentes:

1. **Desconocido (Unknown):** Para casos no definidos
2. **Efectivo (InCash):** Pagos en efectivo
3. **Pasarela (Gateway):** Pagos a través de pasarelas de pago
4. **Transferencia Bancaria (BankTransfer):** Transferencias directas
5. **Tarjeta de Crédito (CreditCard):** Pagos con tarjeta de crédito
6. **Tarjeta de Débito (DebitCard):** Pagos con tarjeta de débito
7. **Cheque (Check):** Pagos mediante cheques
8. **Otro (Other):** Métodos de pago alternativos

**Presentación en interfaz:** Cada tipo de pago se muestra con un icono representativo para facilitar la identificación visual.

### 3.6 Gestión de Recepción Parcial

**Funcionalidad de recepción parcial:**

- Permite recibir cantidades específicas de cada producto
- Validación de cantidades máximas permitidas
- Seguimiento de progreso por producto individual
- Cálculo automático de pendientes

**Controles de validación:**

- Cantidad mínima: 1 unidad
- Cantidad máxima: cantidad pendiente de recibir
- No se pueden recibir más productos de los solicitados

**Indicadores visuales:**

- Progreso por producto con barras de estado
- Badges informativos mostrando: recibido, total, pendiente
- Estados: completo, en progreso, pendiente

### 3.7 Gestión de Notas Obligatorias

**Cuándo se requieren notas:**

- Al rechazar una orden (campo obligatorio)
- Al cancelar una orden (campo obligatorio)

**Propósito:** Las notas proporcionan trazabilidad y documentación de las decisiones importantes, permitiendo auditorías y análisis posteriores de por qué se rechazaron o cancelaron órdenes.

**Campos de notas en el sistema:**

- **Razón de rechazo (rejectionReason):** Se almacena cuando se rechaza una orden
- **Razón de cancelación (canceledReason):** Se almacena cuando se cancela una orden

**Interfaz de notas:** Diálogo modal con campo de texto obligatorio que requiere confirmación antes de proceder con la acción.

---

## 4. Gestión de Transferencias de Stock

### 4.1 Vista General de Transferencias

Las transferencias de stock gestionan el movimiento de inventario entre diferentes provincias. El sistema mantiene un seguimiento completo del flujo desde la solicitud hasta la recepción final.

**Información mostrada:**

- ID único de transferencia
- Provincia origen y destino
- Estado del flujo de trabajo
- Transportista/courier (cuando aplique)
- Productos y cantidades transferidas
- Fechas de solicitud, aprobación, envío, recepción
- Información de quién creó, aprobó, rechazó, canceló o recibió

### 4.2 Estados de Transferencia y sus Significados

**Pendiente de Aprobación (PendingApproval):**

- Estado inicial al crear una transferencia
- Requiere autorización antes de proceder
- Puede ser editada, aprobada, rechazada o cancelada
- Indicador visual: badge amarillo claro con animación pulsante

**Aprobada (Approved):**

- Transferencia autorizada, lista para envío
- Se puede marcar en tránsito o cancelar
- No se puede editar una vez aprobada
- Indicador visual: badge azul claro

**En Tránsito (InTransit):**

- Productos enviados, en camino al destino
- Requiere información del courier/transportista
- Se puede recibir parcial o totalmente, o cancelar
- Indicador visual: badge azul sólido con animación pulsante

**Recibida Parcialmente (PartiallyReceived):**

- Algunos productos recibidos, otros pendientes
- Permite recepciones adicionales
- Estado transitorio hacia recepción completa
- Indicador visual: badge amarillo sólido

**Recibida Completamente (Received):**

- Todos los productos recibidos exitosamente
- Estado final del flujo exitoso
- No se pueden realizar más acciones
- Indicador visual: badge verde sólido

**Rechazada (Rejected):**

- Transferencia rechazada durante aprobación
- **Requiere nota explicativa obligatoria**
- Estado final, no se pueden realizar más acciones
- Indicador visual: badge rojo sólido

**Cancelada (Cancelled):**

- Transferencia cancelada antes de completarse
- Puede ocurrir en estados: pendiente, aprobada, o en tránsito
- Estado final, no se pueden realizar más acciones
- Indicador visual: badge gris claro

### 4.3 Acciones Disponibles por Estado

**Pendiente de aprobación:**

- Editar transferencia
- Aprobar
- Rechazar (con nota obligatoria)
- Cancelar

**Aprobada:**

- Marcar en tránsito (requiere nombre del courier)
- Cancelar

**En tránsito:**

- Recibir parcialmente
- Cancelar

**Recibida parcialmente:**

- Continuar recibiendo productos
- Marcar como recibida completamente

### 4.4 Crear/Editar Transferencias

**Campos obligatorios del formulario:**

- **Provincia origen:** Selector con las 16 provincias cubanas
- **Provincia destino:** Selector con las 16 provincias cubanas
- **Productos y cantidades:** Mínimo un producto con cantidad válida

**Campos opcionales:**

- **Observaciones:** Campo de texto para notas adicionales

**Validaciones críticas:**

- **Provincias diferentes:** No se puede transferir dentro de la misma provincia
- **Productos únicos:** No se pueden duplicar productos en la misma transferencia
- **Cantidades válidas:** Números positivos mayores a cero
- **Mínimo un producto:** La transferencia debe incluir al menos un producto

**Selector de productos:**

- Búsqueda con autocompletado
- Control de cantidades con validaciones en tiempo real
- Eliminación individual de productos
- Verificación de productos únicos

**Validaciones específicas del formulario:**

- Verificación automática de provincias diferentes
- Control de existencia de productos
- Validación de cantidades mínimas y máximas

### 4.5 Gestión de Courier/Transportista

**Cuándo se requiere:**

- Al marcar una transferencia como "en tránsito"
- Campo obligatorio para el cambio de estado

**Información requerida:**

- Nombre del courier/transportista
- Campo de texto libre para flexibilidad

**Propósito:** Mantener trazabilidad de quién maneja físicamente el transporte de los productos entre provincias.

### 4.6 Recepción Parcial de Transferencias

**Funcionalidad detallada:**

- Permite recibir cantidades específicas de cada producto
- Muestra productos ya completamente recibidos como "no editables"
- Control individual por producto con validaciones

**Controles de validación:**

- Cantidad mínima: 1 unidad
- Cantidad máxima: cantidad pendiente de recibir por producto
- No se pueden recibir más productos de los transferidos

**Indicadores visuales avanzados:**

- **Productos completamente recibidos:** Marcados con check verde y no editables
- **Productos pendientes:** Controles de cantidad activos
- **Badges informativos:** Recibido, total, máximo a recibir
- **Resumen en tiempo real:** Total de productos siendo recibidos

**Estadísticas mostradas:**

- Total de productos en transferencia
- Productos ya recibidos
- Productos pendientes de recepción
- Porcentaje de completitud

### 4.7 Gestión de Notas en Transferencias

**Cuándo se requieren notas obligatorias:**

- Al rechazar una transferencia
- Las cancelaciones no requieren nota (a diferencia de las órdenes de compra)

**Campos relacionados:**

- **Razón de rechazo (rejectionReason):** Obligatorio al rechazar
- **Razón de cancelación (canceledReason):** Almacenado pero no obligatorio
- **Observaciones (observation):** Campo general opcional

**Diferencia con órdenes de compra:** Las transferencias no requieren nota obligatoria para cancelación, solo para rechazo.

---

## 5. Gestión de Proveedores

### 5.1 Vista General de Proveedores

Los proveedores son fundamentales para el sistema de órdenes de compra. Sin proveedores registrados, no se pueden crear órdenes de compra.

**Información típica gestionada:**

- Datos de contacto
- Información fiscal
- Historial de órdenes
- Estado de proveedor (activo/inactivo)

**Dependencia crítica:** El sistema requiere al menos un proveedor registrado para poder crear órdenes de compra. Si no hay proveedores disponibles, se muestra un mensaje informativo con opción para crear uno.

---

## 6. Gestión de Productos por Provincia

### 6.1 Propósito del Sistema

Esta funcionalidad permite establecer precios específicos de productos para cada una de las 16 provincias cubanas, facilitando una estrategia de precios regionalizada.

### 6.2 Configuración de Precios Provinciales

**Campos de configuración:**

- **Producto:** Selección del producto base
- **Provincia:** Una de las 16 provincias cubanas
- **Precio de venta:** Precio específico para esa provincia
- **Posición en catálogo:** Orden de aparición en el catálogo provincial

**Validaciones importantes:**

- **Precio mínimo:** No puede ser inferior al precio de costo del producto
- **Advertencia de precio bajo:** Si el precio está cerca del costo, se muestra una advertencia
- **Confirmación visual:** Cuando el precio es adecuado, se muestra confirmación en verde

**Provincias cubanas soportadas:**

1. Pinar del Río (PRI)
2. Artemisa (ART)
3. La Habana (LHA)
4. Mayabeque (MAY)
5. Matanzas (MTZ)
6. Cienfuegos (CFG)
7. Villa Clara (VLC)
8. Sancti Spíritus (SSP)
9. Ciego de Ávila (CAV)
10. Camagüey (CAM)
11. Las Tunas (LTU)
12. Holguín (HOL)
13. Granma (GRM)
14. Santiago de Cuba (SCU)
15. Guantánamo (GTM)
16. Isla de la Juventud (IJV)

---

## 7. Números de Serie de Productos

### 7.1 Funcionalidad

Sistema para el seguimiento individual de productos mediante números de serie únicos, especialmente útil para productos de alto valor o que requieren trazabilidad individual.

**Características:**

- Asignación de números de serie únicos
- Seguimiento de estado (disponible, vendido, reservado)
- Trazabilidad completa del producto individual
- Asociación con productos específicos

---

## 8. Conceptos Técnicos Importantes

### 8.1 Flujos de Trabajo (Workflows)

El sistema implementa flujos de trabajo estrictos para órdenes de compra y transferencias de stock:

**Características comunes:**

- Estados claramente definidos
- Transiciones controladas
- Validaciones en cada cambio de estado
- Trazabilidad completa de acciones
- Usuarios responsables de cada cambio

**Diferencias importantes:**

- **Órdenes de compra:** Requieren notas obligatorias para rechazo Y cancelación
- **Transferencias:** Solo requieren nota obligatoria para rechazo

### 8.2 Sistema de Validaciones

**Validaciones a nivel de formulario:**

- Campos obligatorios
- Formatos de datos
- Rangos de valores
- Unicidad de registros

**Validaciones de negocio:**

- Dependencias entre entidades
- Estados permitidos
- Reglas de integridad
- Restricciones funcionales

**Validaciones en tiempo real:**

- Autocompletado con validación
- Cálculos automáticos
- Verificación de duplicados
- Control de límites

### 8.3 Sistema de Permisos y Acciones

**Acciones contextuales:** Las acciones disponibles dependen del estado actual del registro y los permisos del usuario.

**Tipos de acciones:**

- **Visualización:** Siempre disponible
- **Edición:** Solo en estados específicos
- **Cambios de estado:** Controlados por workflow
- **Eliminación:** Restringida por dependencias

### 8.4 Indicadores Visuales y UX

**Sistema de badges:**

- Colores específicos por estado
- Animaciones para estados en progreso
- Iconos representativos
- Información contextual

**Diálogos de confirmación:**

- Acciones destructivas requieren confirmación
- Notas obligatorias en casos específicos
- Validaciones antes de proceder
- Información clara sobre consecuencias

---

## 9. Validaciones y Reglas de Negocio

### 9.1 Dependencias Críticas del Sistema

**Categorías → Productos:**

- No se pueden crear productos sin categorías existentes
- No se pueden eliminar categorías con productos asociados

**Proveedores → Órdenes de Compra:**

- No se pueden crear órdenes sin proveedores registrados
- Se debe mantener al menos un proveedor activo

**Productos → Todas las Operaciones:**

- Los productos deben existir para ser incluidos en órdenes o transferencias
- No se pueden eliminar productos con órdenes o transferencias activas

### 9.2 Validaciones de Formularios

**Campos obligatorios universales:**

- Nombres y títulos identificativos
- Selecciones de entidades relacionadas
- Cantidades y precios en transacciones

**Validaciones específicas por módulo:**

- **Productos:** Unicidad de nombres, categoría obligatoria
- **Órdenes:** Proveedor, provincia, productos únicos, cantidades > 0
- **Transferencias:** Provincias diferentes, productos únicos, cantidades > 0
- **Precios provinciales:** Precio >= costo, província única por producto

### 9.3 Reglas de Estados y Transiciones

**Estados finales (no permiten más cambios):**

- Recibido completamente
- Rechazado
- Cancelado

**Estados que requieren confirmación con nota:**

- Rechazo de órdenes (nota obligatoria)
- Cancelación de órdenes (nota obligatoria)
- Rechazo de transferencias (nota obligatoria)

**Estados que requieren información adicional:**

- Marcar en tránsito (requiere courier)
- Recepción parcial (requiere cantidades específicas)

### 9.4 Validaciones de Integridad

**Validaciones numéricas:**

- Cantidades siempre > 0
- Precios siempre >= costo
- No se pueden recibir más productos de los solicitados/transferidos

**Validaciones de unicidad:**

- Nombres de productos y categorías
- Productos en la misma orden/transferencia
- Configuraciones de precio por provincia

**Validaciones de relaciones:**

- Productos deben pertenecer a categorías existentes
- Órdenes deben referenciar proveedores activos
- Transferencias deben involucrar provincias diferentes

---

## Conclusión

Este sistema de backoffice proporciona un control completo sobre las operaciones de una tienda online, con especial enfoque en:

1. **Gestión multi-provincial** adaptada a Cuba
2. **Flujos de trabajo robustos** con validaciones estrictas
3. **Trazabilidad completa** de todas las operaciones
4. **Flexibilidad de configuración** para diferentes tipos de productos y precios
5. **Control de inventario** con transferencias inter-provinciales
6. **Validaciones de integridad** para mantener la consistencia de datos

El sistema está diseñado para escalar y adaptarse a las necesidades específicas del mercado cubano, proporcionando herramientas robustas para la gestión eficiente de una tienda online con distribución nacional.
