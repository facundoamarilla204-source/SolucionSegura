**DOCUMENTACIÓN FUNCIONAL**  
**Plataforma de reclamos**  
**urbanos de La Matanza**

Especificación de navegación, reglas, escenarios y User Flow

Trabajo práctico de Visualización e Interfaces 

Este documento reúne las decisiones tomadas durante la definición del producto, describe los recorridos normales y alternativos y sirve de referencia para los diagramas, wireframes y prototipo responsive.

## **Guía de lectura**

* Secciones 1–3: objetivo, principios y navegación.  
* Secciones 4–10: procedimientos del visitante y del usuario registrado.  
* Secciones 11–14: reglas especiales, datos simulados, estados y validaciones.  
* Sección 15: matriz consolidada de decisiones de las preguntas 1–36.  
* Sección 16: lista de pruebas y criterios de aceptación del prototipo.

# **1\. Propósito y límites del servicio**

La plataforma permite a los vecinos visualizar, crear, apoyar y seguir reportes de problemas urbanos en el partido de La Matanza, provincia de Buenos Aires. El foco está en una experiencia mobile-first, comprensible para personas de aproximadamente 25 a 50 años, especialmente cuando reportan desde la calle.

## **1.1 Categorías admitidas**

* Calles y pavimento: baches, roturas y deterioro de la calzada.  
* Residuos y limpieza: acumulación de basura y problemas de limpieza urbana.  
* Alumbrado público: luminarias apagadas o deterioradas.

**SE PUEDE AGREGAR MAS CATEGORÍAS** 

Los problemas fuera de estas tres categorías se orientan desde Ayuda o se identifican como fuera de alcance durante una revisión simulada.

## **1.2 Qué representa la maqueta**

* Registro e inicio de sesión ficticios; opción Google simulada y opción email/contraseña ficticia.  
* Persistencia visual de sesión y borradores mediante almacenamiento del navegador, si se implementa.  
* Mapa interactivo real opcional para fines de demostración; reportes y marcadores ficticios.  
* Revisión municipal, asignación de prioridad, cambios de estado, correo electrónico y reapertura simulados.  
* No se solicitará número de padrón, DNI ni domicilio personal como requisito de registro.

## **1.3 Conceptos fundamentales**

| Concepto | Significado funcional |
| :---- | :---- |
| Reclamo | Incidencia pública única con identificador, ubicación, categoría, estado e historial. |
| Creador | Usuario registrado que envió originalmente ese reclamo. |
| Adhesión / apoyo | Vínculo único entre un usuario registrado y un reclamo ajeno. No crea otra incidencia. |
| Participantes | Cantidad total de cuentas vinculadas al reclamo; debe aclararse si incluye al creador. |
| Prioridad | Indicador orientativo que considera gravedad y apoyos; no promete una fecha de solución. |
| Estado | Etapa del reclamo; puede tener estados alternativos como rechazado, reabierto o cancelado. |

# **2\. Perfiles, permisos y privacidad**

| Tipo de usuario | Puede | No puede |
| :---- | :---- | :---- |
| Visitante | Ver Inicio, Explorar, Detalle público, Estadísticas y Ayuda. | Crear, apoyar, retirar apoyo, ver historial privado o gestionar cuenta. |
| Registrado | Todo lo público \+ crear reclamos, apoyar una vez, retirar apoyo, ver Mis reclamos, perfil y notificaciones. | Modificar reclamos de otros; votar duplicadamente. |
| Creador de reclamo | Editar/cancelar mientras esté Recibido; solicitar corrección luego; confirmar solución o pedir reapertura. | Borrar sin rastro el historial o alterar directamente una gestión ya iniciada. |
| Operador ficticio | En la simulación, revisar, rechazar, derivar, resolver y cambiar estados. | No se diseña un panel administrativo real salvo que la consigna se amplíe. |

En los detalles públicos se muestran dirección o punto del problema, categoría, descripción, fotos aportadas, fecha, estado, historial público y número de respaldos. No se muestran nombre, correo, dirección particular ni otros datos identificatorios del creador o participantes.

# **3\. Navegación y arquitectura de información**

## **3.1 Celular**

Barra inferior fija con tres destinos: Inicio, Explorar y Reportar. Encabezado con campana de Notificaciones y acceso a perfil. El perfil despliega Mis reclamos, Estadísticas, Ayuda, Mi perfil y Cerrar sesión; si no hay sesión, reemplaza opciones privadas por Iniciar sesión y Registrarse.

## **3.2 Computadora**

Cabecera horizontal con Inicio, Explorar, Estadísticas, Ayuda, botón destacado Realizar reclamo, campana y acceso al perfil. La arquitectura de páginas es la misma que en móvil.

## **3.3 Las trece vistas principales**

| \# | Vista | Acceso |
| :---- | :---- | :---- |
| 1 | Inicio | Público |
| 2 | Explorar reclamos: Mapa/Lista | Público |
| 3 | Detalle de reclamo | Público |
| 4 | Estadísticas | Público |
| 5 | Ayuda / contacto | Público |
| 6 | Iniciar sesión | Público |
| 7 | Registrarse | Público |
| 8 | Recuperar contraseña | Público |
| 9 | Nuevo reclamo | Registrado |
| 10 | Confirmación de envío | Registrado |
| 11 | Mis reclamos | Registrado |
| 12 | Mi perfil | Registrado |
| 13 | Notificaciones | Registrado |

Los pasos internos del formulario, los filtros, las coincidencias, el estado vacío, la edición y la valoración son componentes o estados dentro de estas vistas, no necesariamente páginas independientes.

# **4\. Inicio y consulta pública**

## **4.1 Pantalla de Inicio**

* Presentación breve del propósito y alcance territorial.  
* Botón principal «Realizar reclamo»; botón secundario «Explorar reclamos».  
* Bloque de las tres categorías con etiquetas fáciles de identificar.  
* Indicadores generales simulados; explicación «Cómo funciona» en tres pasos.  
* Si la sesión está iniciada, acceso rápido a Mis reclamos.  
* Accesos visibles también a Estadísticas y Ayuda, no solo desde el menú del perfil.

## **4.2 Si el visitante toca Reportar**

1. El sistema comprueba si hay sesión simulada activa.  
2. Si la hay, abre Nuevo reclamo; si no, abre Inicio de sesión/Registro.  
3. Tras iniciar sesión o registrarse, vuelve automáticamente a Nuevo reclamo.  
4. No se solicita padrón ni otra validación domiciliaria.

## **4.3 Explorar como visitante**

5. Entrar a Explorar desde barra inferior o Inicio.  
6. Elegir Mapa o Lista; ambas muestran por defecto reclamos activos.  
7. Aplicar filtros por categoría, localidad y estado.  
8. Abrir un reclamo desde marcador o tarjeta para conocer su detalle.  
9. Si el visitante toca «Sumarme», presentar acceso; luego regresar al reclamo solicitado.

# **5\. Registro, ingreso y persistencia de sesión**

## **5.1 Registro con correo y contraseña**

10. Abrir Registrarse; solicitar nombre, correo y contraseña. No pedir apellido, padrón, DNI ni localidad obligatoria.  
11. Validar en la maqueta que los campos requeridos tengan contenido y que el formato de correo sea plausible. Mostrar errores junto a los campos.  
12. Simular la creación de cuenta, marcar sesión iniciada y dirigir a la pantalla de origen o a Inicio.

## **5.2 Continuar con Google (simulado)**

13. Tocar Continuar con Google.  
14. Mostrar selección/confirmación ficticia de cuenta, claramente reconocible como demostración; no capturar credenciales reales de Google.  
15. Crear el perfil ficticio si es el primer acceso o recuperar la sesión simulada; regresar al destino previsto.

## **5.3 Inicio de sesión habitual**

16. Correo y contraseña ficticios, o Google simulado. El sistema mantiene la sesión iniciada en el dispositivo.  
17. Si la sesión está guardada, omitir la pantalla de ingreso y abrir directamente el destino solicitado.  
18. Al cerrar sesión se revoca el indicador simulado en este navegador. Los reclamos ficticios pueden conservarse en el conjunto demostrativo.

## **5.4 Recuperar contraseña**

Mostrar solicitud de correo y una confirmación ficticia de envío. No enviar correos reales ni generar credenciales auténticas. Ofrecer volver a Inicio de sesión.

## **5.5 Errores y excepciones**

* Datos incompletos: impedir avance y mostrar ayuda contextual.  
* Correo con formato incorrecto: resaltar campo y explicar corrección.  
* Intento de acceso con datos simulados inválidos: mostrar mensaje claro y posibilidad de reintentar.  
* Google simulado cancelado: regresar al acceso sin perder el destino original.  
* Visita a ruta privada sin sesión: llevar a acceso y retornar a la ruta al finalizar.

# **6\. Nuevo reclamo: recorrido principal paso a paso**

| Regla base  Para abrir el formulario de Nuevo reclamo es obligatorio haber iniciado sesión. El formulario ocurre en una única vista; no se divide artificialmente en cinco páginas. |
| :---- |

19. El vecino toca «Reportar» y, si no está autenticado, primero inicia sesión. Se recuerda la pantalla destino.  
20. Ubicación: escribe nombre y altura de calle, usa GPS con permiso, o mueve manualmente el marcador sobre el mapa.  
21. Confirma que el punto señalado corresponda al sitio del problema. Si la búsqueda falla, sigue con el marcador manual.  
22. Elige una categoría entre Calles, Residuos y Alumbrado. Es obligatoria.  
23. Puede escribir una descripción adicional, opcional.  
24. Puede tomar o adjuntar hasta cinco fotografías, opcionales; ve miniaturas y puede quitar imágenes antes del envío.  
25. Se guardan de manera automática en un borrador local los valores recuperables del formulario.  
26. Al continuar o enviar, el sistema busca reclamos potencialmente similares por cercanía y categoría.  
27. Si existe una coincidencia: mostrar tarjeta del reclamo existente, estado y cantidad de apoyos; ofrecer «Sumarme» o «Es otro problema, crear nuevo».  
28. Si no existe coincidencia o el usuario elige «Es otro problema», validar campos obligatorios y registrar el reclamo ficticio.  
29. Mostrar confirmación: «Tu reclamo fue registrado», número de seguimiento y botones «Ver mis reclamos» / «Volver al inicio».  
30. Agregarlo automáticamente a «Mis reclamos» → «Creados por mí», con estado inicial Recibido.

## **6.1 Datos obligatorios y opcionales**

| Campo | Regla |
| :---- | :---- |
| Ubicación geográfica | Obligatoria; punto confirmado en mapa dentro del alcance territorial. |
| Categoría | Obligatoria; una de las tres admitidas. |
| Descripción | Opcional; permite aclarar contexto. |
| Fotografías | Opcionales, máximo cinco; pueden quitarse antes de enviar. |
| Identificación del usuario | Sesión simulada obligatoria; no requiere padrón. |

## **6.2 Localización y fallos**

* Búsqueda sin resultados → ofrecer mover el pin sobre el mapa y escribir referencias.  
* GPS denegado o impreciso → informar con claridad y permitir búsqueda o pin manual.  
* Ubicación fuera de La Matanza → pedir un punto válido antes de enviar.  
* Sin categoría o sin punto confirmado → impedir envío y señalar la corrección necesaria.  
* Sin fotos o descripción → permitir enviar igualmente.

## **6.3 Sin conectividad**

Conservar automáticamente el borrador local con ubicación, categoría y descripción; opcionalmente conservar miniaturas solo mientras sea viable dentro del navegador. Si se pierde Internet, mostrar «Guardamos tu borrador. Podés continuar cuando vuelva la conexión». El envío no se simula como exitoso hasta recuperar conectividad y confirmar la acción.

# **7\. Coincidencias, apoyos y participación comunitaria**

## **7.1 Cómo detectar una coincidencia**

En el prototipo, una regla de ejemplo compara categoría y distancia aproximada de marcadores. La coincidencia es orientativa, no una fusión automática: dos baches cercanos pueden ser distintos.

## **7.2 Al encontrar un reclamo similar**

31. Mostrar tarjeta con categoría, descripción breve, ubicación, estado y número de participantes.  
32. Permitir «Sumarme a este reclamo» con un toque si el usuario está registrado.  
33. Permitir «Es otro problema» para continuar con un reclamo independiente.

## **7.3 Sumarse desde Explorar o Detalle**

34. Comprobar que exista sesión; si no, mostrar acceso y luego regresar al mismo reclamo.  
35. Comprobar que la cuenta no se haya sumado ya; si ya participa, mostrar estado «Ya participás» y opción de retirarse.  
36. Agregar una adhesión única, incrementar el contador e incluirlo en Mis reclamos → Me sumé.  
37. Confirmar con un mensaje breve. No pedir fotos, formulario, comentario ni aceptación extra.

## **7.4 Retirar apoyo**

38. Desde Detalle o Mis reclamos, seleccionar «Dejar de participar».  
39. Eliminar la adhesión ficticia; reducir el contador e informar resultado.  
40. Quitar de la pestaña Me sumé, sin cancelar el reclamo ni afectar a otros participantes.

El número de personas que respaldan un reporte no equivale a la cantidad de problemas distintos de esa zona. El marcador y la estadística deben contar el problema una sola vez.

## **7.5 Reclamos ya resueltos**

No mostrar «Sumarme» como acción habitual en un reclamo resuelto. Mostrar «El problema sigue presente»: registrar un aviso ficticio de revisión y permitir seguir el caso en Mis reclamos; este aviso NO reabre automáticamente el reclamo.

# **8\. Mis reclamos y Detalle de reclamo**

## **8.1 Lista de Mis reclamos**

Una única pantalla, con filtros: Todos, Creados por mí y Me sumé. Cada tarjeta presenta categoría, ubicación, estado actual y cantidad de vecinos participantes. Al tocarla, abre el Detalle de reclamo.

## **8.2 Estados vacíos**

* Sin ninguna participación: «Todavía no participaste en ningún reclamo» \+ «Realizar reclamo» y «Explorar reclamos».  
* Sin propios: «Todavía no creaste reclamos» \+ «Realizar reclamo».  
* Sin adhesiones: «Todavía no te sumaste a reclamos» \+ «Explorar reclamos».

## **8.3 Detalle y línea de progreso**

Mostrar un encabezado con categoría, ubicación, fecha, identificador, estado y contador de apoyos. Debajo, mapa o punto de ubicación, descripción, galería opcional e historial. La línea de progreso central usa Recibido → En revisión → En proceso → Resuelto. Cada actualización tiene fecha y una explicación textual. Los estados alternativos se muestran fuera de la progresión lineal.

## **8.4 Derechos de edición del creador**

* Estado Recibido: editar ubicación, categoría y descripción; cambios importantes deben advertirse a quienes se sumaron.  
* En revisión o En proceso: no editar directamente; ofrecer «Solicitar corrección».  
* El creador puede cancelar solo cuando esté Recibido; el caso cambia a Cancelado y conserva su historial.  
* En fases posteriores, cancelación mediante solicitud. Si hubo apoyos, se simula un aviso a participantes.

# **9\. Estados, revisión y gestión del caso**

| Estado | Significado | Acción visible relevante |
| :---- | :---- | :---- |
| Recibido | Se registró el caso; aún no se evaluó. | Creador puede editar o cancelar. |
| En revisión | Se verifica ubicación, categoría y datos. | Consultar seguimiento; solicitar corrección. |
| En proceso | Se simula asignación y trabajo sobre el problema. | Consultar avances y avisos. |
| Resuelto | Se informa que se solucionó. | Creador confirma/califica o solicita reapertura; terceros informan persistencia. |
| Rechazado | No se admitió; motivo registrado. | Corregir y reenviar si es subsanable. |
| Reabierto | Se aceptó reexaminar un problema informado como resuelto. | Volver a seguimiento del caso. |
| Cancelado | El creador canceló en etapa Recibido o se aprobó solicitud. | Queda en historial, no se elimina sin rastro. |

## **9.1 Revisión y rechazo**

41. La simulación pasa de Recibido a En revisión.  
42. Si la información es válida, pasa a En proceso o a la etapa informada por el operador ficticio.  
43. Si falta información corregible, mostrar Rechazado con causa y botón «Corregir y reenviar».  
44. Al reenviar, mantener identificador/historial de referencia y registrar nueva revisión simulada.  
45. Si el problema está fuera del alcance del servicio, mostrar rechazo definitivo con orientación, sin prometer derivación real.

## **9.2 Priorización**

La prioridad baja, media o alta es ORIENTATIVA y se muestra con etiqueta textual, no solo color. La estimación ficticia combina gravedad y número de apoyos. Un riesgo alto puede superar en importancia a un reclamo con más apoyos. No se promete tiempo máximo de resolución ni prioridad oficial del municipio.

# **10\. Resolución, valoración y reapertura**

## **10.1 Acción del creador cuando aparece Resuelto**

46. El detalle muestra «¿El problema se solucionó?» con opciones claras.  
47. Si elige «Sí», puede puntuar el resultado con 1 a 5 estrellas. Se registra calificación ficticia y confirmación.  
48. Si elige «No», solicita reapertura y puede agregar explicación opcional. Se genera una revisión simulada; la reapertura se distingue del simple aviso.

## **10.2 Acción de vecinos participantes que no crearon el caso**

Pueden informar «El problema sigue presente» sin reabrir por cuenta propia. Se agrega un aviso para revisión y el caso puede incluirse en su seguimiento. El sistema evita avisos duplicados por usuario o informa cuando ya lo comunicó.

## **10.3 Notificaciones**

Los cambios de estado se reflejan en campana y en un correo electrónico simulado. La notificación enlaza al Detalle y debe estar disponible para el creador y los usuarios adheridos. Los avisos también cubren rechazo/corrección, resolución, reapertura y cancelación de un reporte con participantes.

# **11\. Explorar: mapa, lista, filtros y densidad**

## **11.1 Vista Mapa**

* Por defecto mostrar activos: Recibido, En revisión, En proceso y Reabierto. Los resueltos son visibles mediante filtro.  
* Marcadores con color e icono por categoría, nunca solo color. Tarjeta al pulsar: título, estado, ubicación y apoyos.  
* Clustering: varios puntos cercanos se agrupan en burbuja con número; al ampliar se separan.  
* Botón para alternar mapa habitual y mapa de calor; las zonas rojas significan más incidentes distintos, no más adhesiones a un solo incidente.  
* Si el usuario definió una localidad preferida, centrar inicialmente allí; de lo contrario, mostrar una vista general de La Matanza. El mapa sigue navegable.

## **11.2 Vista Lista**

* Lista de tarjetas sincronizada con filtros: categoría, localidad y estado.  
* Orden inicial: más recientes. Otras opciones: más respaldados y más cercanos a una ubicación elegida.  
* El cambio Mapa ↔ Lista no debería perder los filtros activos.  
* Estado sin resultados: mensaje claro \+ botón para limpiar filtros.

## **11.3 Mapa de calor y estadísticas**

El mapa de calor refleja densidad espacial de reclamos activos distintos. Si hay filtros, el calor debe responder a los filtros. La escala baja/media/alta/muy alta se presenta con leyenda textual. La prioridad de un reclamo y el calor de una zona son métricas diferentes.

# **12\. Estadísticas y Ayuda**

## **12.1 Estadísticas públicas**

* Indicadores: total de reclamos, activos, resueltos y porcentaje de resolución.  
* Gráficos por categoría, localidad y estado; evolución mensual.  
* Filtro por localidad; contenidos con leyendas y valores visibles, accesibles en pantalla pequeña.  
* Datos demostrativos coherentes entre indicadores, mapa y listado; evitar cifras contradictorias.

## **12.2 Ayuda**

* Cómo funciona: guía en tres pasos con ilustraciones sencillas y textos directos.  
* Preguntas frecuentes: registro, ubicación, fotos opcionales, adhesiones, estados, correcciones, privacidad y resolución.  
* Contacto: formulario de consulta ficticio con confirmación de envío simulada.  
* No presentar canales ficticios como atención real del municipio.

# **13\. Mi perfil y preferencias**

* Mostrar nombre y correo; permitir edición ficticia del nombre cuando corresponda.  
* Localidad preferida OPCIONAL, agregada desde perfil; se usa para centrar Explorar.  
* Configuración de notificaciones en plataforma y correo (ambas simuladas).  
* Sección de seguridad: referencia a contraseña/medio de acceso, sin exigir datos sensibles adicionales.  
* Cerrar sesión con retorno a modo visitante. Si más tarde se vuelve a iniciar sesión, recuperar el perfil demostrativo.

# **14\. Inventario de estados y escenarios alternativos**

| Situación | Comportamiento esperado |
| :---- | :---- |
| Usuario no autenticado toca Reportar | Redirigir a Inicio de sesión; volver a Nuevo reclamo al ingresar. |
| Usuario no autenticado toca Sumarme | Redirigir a acceso; volver al mismo detalle y permitir apoyo. |
| Dirección no encontrada | Habilitar GPS o marcador manual. |
| GPS denegado | Mantener búsqueda manual y marcador. |
| Ubicación inválida / fuera del partido | Señalar error; impedir envío hasta corregir. |
| Categoría omitida | Señalar selección obligatoria. |
| Sin descripción o fotos | Permitir envío. |
| Más de cinco fotos | Mostrar límite, no aceptar excedentes. |
| Reclamo similar encontrado | Ofrecer sumarse o crear otro. |
| Usuario ya adherido | No duplicar adhesión; mostrar «Ya participás». |
| Retirar apoyo | Reducir contador y quitar de Me sumé. |
| Conexión interrumpida | Conservar borrador local; no afirmar que se envió. |
| Envío exitoso | Confirmación con número; añadir a Mis reclamos. |
| Mis reclamos sin actividad | Mostrar acciones Reportar y Explorar. |
| Reclamo Recibido con error | Permitir editar o cancelar. |
| Reclamo bajo revisión | Solicitar corrección, no edición directa. |
| Reclamo rechazado corregible | Mostrar motivo; corregir y reenviar. |
| Reclamo resuelto; creador disconforme | Solicitar reapertura y explicación opcional. |
| Reclamo resuelto; tercero disconforme | Aviso «Sigue presente» para revisión, sin reapertura automática. |
| Reclamo cancelado con adherentes | Conservar historial y avisar a participantes. |
| Mapa saturado de marcadores | Agrupar puntos con contador (clustering). |
| Lista filtrada sin resultados | Mostrar estado vacío y limpiar filtros. |

# **15\. Registro de decisiones:** 

**1\. ¿Qué ocurre cuando un reclamo figura como «Resuelto»?**

Respuesta seleccionada: El vecino que lo creó puede confirmar que el problema fue solucionado o indicar que continúa y solicitar su reapertura.

**2\. ¿Quiénes pueden sumarse a un reclamo existente?**

Respuesta seleccionada: Cualquier usuario registrado puede sumarse, sin necesidad de validar un padrón o domicilio. Cada cuenta puede respaldar un mismo reclamo una sola vez.

**3\. ¿Puede un vecino retirar su apoyo a un reclamo?**

Respuesta seleccionada: Sí. Puede retirarlo cuando lo desee; disminuye el contador de apoyos y el reclamo deja de aparecer en «Me sumé».

**4\. ¿Qué sucede al intentar reportar un problema similar a uno ya registrado?**

Respuesta seleccionada: Se muestra una tarjeta del reclamo cercano, con su estado y cantidad de apoyos. El vecino puede sumarse al existente o seleccionar «Es otro problema» y crear uno nuevo.

**5\. ¿Cómo funciona el mapa de «Explorar reclamos»?**

Respuesta seleccionada: Muestra marcadores individuales y permite activar o desactivar un mapa de calor que visualiza la concentración de incidencias.

**6\. ¿Cómo se notifican los cambios de estado?**

Respuesta seleccionada: Se generan avisos dentro de la plataforma y por correo electrónico. En la maqueta los envíos y mensajes son simulados.

**7\. ¿Qué información de los reclamos se muestra públicamente?**

Respuesta seleccionada: Ubicación, categoría, descripción, fotografías, fecha, estado y cantidad de apoyos. No se publican nombres, correos ni datos personales del creador.

**8\. ¿Qué estadísticas puede consultar el público?**

Respuesta seleccionada: Indicadores generales, gráficos por categoría, localidad y estado, evolución mensual y porcentaje de casos resueltos, con filtro por localidad.

**9\. ¿Qué ve el vecino en la pantalla de inicio del celular?**

Respuesta seleccionada: Una pantalla con acciones rápidas: «Realizar reclamo», «Explorar reclamos» y un resumen claro de la actividad de la plataforma.

**10\. ¿Cómo se organiza la navegación móvil?**

Respuesta seleccionada: Con una barra inferior para «Inicio», «Explorar» y «Reportar», y accesos secundarios desde el menú superior.

**11\. ¿Qué ocurre si alguien quiere reportar sin haber iniciado sesión?**

Respuesta seleccionada: Primero se le solicita iniciar sesión o registrarse. Al completar el acceso, continúa al formulario de nuevo reclamo. Si ya tenía la sesión guardada, ingresa directamente.

**12\. ¿Qué datos se piden para registrarse?**

Respuesta seleccionada: Datos mínimos: nombre, correo electrónico y contraseña. También se ofrece «Continuar con Google». No se pide número de padrón, DNI ni dirección particular. El acceso se simula en la maqueta.

**13\. ¿Qué ocurre después de enviar un reclamo exitosamente?**

Respuesta seleccionada: Aparece una pantalla «Tu reclamo fue registrado», con número de seguimiento y botones «Ver mis reclamos» y «Volver al inicio». El estado inicial es «Recibido».

**14\. ¿Cómo se organiza la sección «Mis reclamos»?**

Respuesta seleccionada: Una única pantalla con filtros «Todos», «Creados por mí» y «Me sumé». Cada tarjeta resume ubicación, categoría, estado y vecinos participantes.

**15\. ¿Cómo se muestra el seguimiento de un reclamo?**

Respuesta seleccionada: Mediante una línea de progreso «Recibido → En revisión → En proceso → Resuelto», acompañada de un historial de actualizaciones fechadas. Se explican también los estados alternativos.

**16\. ¿Qué sucede si otra persona encuentra un reclamo ya marcado como resuelto, pero el problema persiste?**

Respuesta seleccionada: En lugar de sumarse normalmente, puede elegir «El problema sigue presente». Se registra un aviso para revisar la posible reapertura, sin cambiar el estado automáticamente.

**17\. ¿Cómo se presenta «Explorar reclamos»?**

Respuesta seleccionada: Se puede alternar entre las vistas «Mapa» y «Lista». Ambas permiten filtrar por categoría, localidad y estado; el mapa agrega el modo de calor.

**18\. ¿En qué orden aparecen los reclamos en la vista Lista?**

Respuesta seleccionada: Los más recientes primero, con posibilidad de ordenar por cantidad de apoyos o por cercanía a una ubicación elegida.

**19\. ¿Puede el creador corregir un reclamo ya enviado?**

Respuesta seleccionada: Sí, mientras permanezca en estado «Recibido». Puede cambiar ubicación, categoría y descripción; después debe solicitar una corrección.

**20\. ¿Puede el creador eliminar o cancelar un reclamo?**

Respuesta seleccionada: Puede cancelarlo directamente mientras esté «Recibido». Queda registrado como «Cancelado» en el historial; si ya está en revisión o proceso, debe pedir cancelación. Se informa a quienes se sumaron.

**21\. ¿Cómo se selecciona la ubicación del problema?**

Respuesta seleccionada: Mediante búsqueda de calle o dirección, GPS del celular o colocación y ajuste manual de un marcador en el mapa.

**22\. ¿Cómo se distinguen los reclamos en el mapa?**

Respuesta seleccionada: Con marcadores de color e ícono según la categoría: calles, residuos y alumbrado. Al tocarlos se abre un resumen con estado y apoyos.

**23\. ¿Qué reclamos aparecen inicialmente en el mapa?**

Respuesta seleccionada: Los activos: «Recibido», «En revisión», «En proceso» y «Reabierto». Los resueltos pueden visualizarse mediante un filtro.

**24\. ¿Cómo se define la prioridad de un reclamo?**

Respuesta seleccionada: Con una prioridad orientativa baja, media o alta que considera tanto la cantidad de apoyos como la gravedad del problema. No depende solo de los apoyos.

**25\. ¿Qué sucede si un reclamo es rechazado?**

Respuesta seleccionada: Se informa el motivo. Cuando se trata de datos incorrectos o incompletos, el creador puede corregirlos y reenviar el reclamo para una nueva revisión; si es definitivo, se explica por qué.

**26\. ¿Cómo se suma un vecino a un reclamo existente?**

Respuesta seleccionada: Si está registrado, se suma con un solo toque y sin formularios ni fotos obligatorias. Aumenta el contador, se incorpora a «Mis reclamos» y puede retirar su apoyo después.

**27\. ¿Qué se muestra cuando «Mis reclamos» no tiene contenido?**

Respuesta seleccionada: Un estado vacío explicativo, con botones «Realizar reclamo» y «Explorar reclamos». Los filtros sin resultados también muestran mensajes específicos.

**28\. ¿Qué información incluye «Mi perfil»?**

Respuesta seleccionada: Nombre, correo, localidad preferida opcional, preferencias de notificaciones, opciones de seguridad y cierre de sesión.

**29\. ¿Qué incluye la sección «Ayuda»?**

Respuesta seleccionada: Instrucciones paso a paso, preguntas frecuentes y un formulario de contacto, con apoyo visual sencillo para facilitar la comprensión.

**30\. ¿Qué ocurre si se corta Internet mientras se completa un reclamo?**

Respuesta seleccionada: El borrador se guarda automáticamente en el dispositivo con dirección, ubicación, categoría y descripción. El vecino puede retomarlo luego; el envío requiere conexión.

**31\. ¿Cómo se usa la localidad preferida del perfil?**

Respuesta seleccionada: Al abrir «Explorar», el mapa se centra en la localidad configurada, pero se puede mover y consultar todo el partido de La Matanza.

**32\. ¿Qué sucede cuando hay muchos reclamos muy próximos en el mapa?**

Respuesta seleccionada: Los marcadores cercanos se agrupan en círculos con un contador (clustering). Al ampliar el mapa, se separan para permitir seleccionar cada incidencia.

**33\. ¿Cuántas fotografías se pueden adjuntar?**

Respuesta seleccionada: Hasta cinco fotografías opcionales por reclamo, tomadas con la cámara o elegidas de la galería, con vistas previas y opción de quitar imágenes antes del envío.

**34\. ¿Cómo confirma el creador que un reclamo se resolvió?**

Respuesta seleccionada: Puede indicar que fue solucionado y calificar el resultado de una a cinco estrellas. Si el problema continúa, solicita la reapertura y puede agregar una explicación opcional.

**35\. ¿Qué contenido tiene la pantalla de Inicio?**

Respuesta seleccionada: Presentación de la plataforma, acciones «Realizar reclamo» y «Explorar», las tres categorías, indicadores generales, instrucciones en tres pasos y acceso a «Mis reclamos» si hay sesión.

**36\. ¿Qué accesos aparecen en el encabezado del celular?**

Respuesta seleccionada: Una campana para notificaciones y un ícono de perfil. El perfil abre un menú con «Mis reclamos», «Estadísticas», «Ayuda», configuración y cierre de sesión; los visitantes ven acceso y registro.

| Cambio prevalente  El requisito anterior de verificación mediante padrón fue eliminado después de la pregunta 11\. No debe figurar en el prototipo, en el flujo actualizado ni en los formularios. |
| :---- |

# **16\. Criterios de aceptación y pruebas de la maqueta**

Antes de dar por terminado el prototipo, se recomienda recorrer manualmente estos escenarios, tanto en celular como en computadora:

* □ Entrar como visitante, explorar mapa/lista y abrir detalles sin iniciar sesión.  
* □ Pulsar Reportar sin sesión, completar acceso simulado y llegar a Nuevo reclamo.  
* □ Crear cuenta mínima por email; acceder mediante Google ficticio; comprobar sesión persistente al recargar.  
* □ Seleccionar ubicación por búsqueda, GPS simulado y pin manual; corregir marcador.  
* □ Crear un reclamo sin fotos ni descripción; crear otro con cinco fotos.  
* □ Detectar un reclamo similar y probar tanto Sumarse como Es otro problema.  
* □ Evitar doble apoyo; retirarlo y verificar contador y pestaña Me sumé.  
* □ Enviar caso nuevo y observar confirmación e incorporación a Mis reclamos.  
* □ Cambiar filtros Todos/Creados/Me sumé; comprobar estados vacíos.  
* □ Simular cambio de estado y verificar línea de progreso, historial y campana.  
* □ Editar y cancelar Recibido; bloquear edición directa en En revisión.  
* □ Rechazar con causa corregible, corregir y reenviar.  
* □ Resolver, confirmar con estrellas y probar solicitud de reapertura.  
* □ Como tercero, avisar que el problema continúa sin reabrirlo automáticamente.  
* □ Probar filtros, orden de lista, clustering y mapa de calor.  
* □ Configurar localidad preferida y comprobar centrado inicial del mapa.  
* □ Simular interrupción de conexión y recuperación del borrador.  
* □ Probar Ayuda, Estadísticas, privacidad de datos y cierre de sesión.  
* □ Comprobar que no existe ninguna pantalla de padrón ni un paso de DNI.

## **16.1 Reglas de consistencia en interfaz**

* Usar el mismo nombre de estado y color semántico en tarjetas, detalle, notificaciones y gráficos.  
* La cifra de participantes debe seguir una definición única (recomendado: total incluyendo al creador).  
* Usar confirmaciones visibles de acciones completadas; no prometer envíos reales de emails ni derivaciones municipales.  
* Hacer controles suficientemente grandes para dedos y lenguaje comprensible.  
* El color nunca debe ser el único canal para indicar prioridad, categoría o estado.  
* Mantener la maqueta dentro del partido de La Matanza; usar localidades y direcciones de ejemplo claramente ficticias.

.

