type ServiceSection = { title: string; body: string; items: string[] };

type Service = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  photo: string;
  alt: string;
  intro: string;
  sections: ServiceSection[];
  scope: string;
  message: string;
};

export const services: Service[] = [
  {
    slug: 'landing',
    title: 'Una primera impresión que trabaja por tu marca.',
    label: 'WEB / PRESENCIA',
    summary: 'Landing pages y sitios para explicar tu propuesta, presentar productos y convertir visitas en conversaciones.',
    photo: '/images/services/landing.webp',
    alt: 'Interior contemporáneo de un espacio de trabajo',
    intro: 'Una web clara ayuda a que las personas entiendan qué ofreces y cómo dar el siguiente paso. El alcance se adapta a la identidad y al contenido real del negocio.',
    sections: [
      { title: 'Para quién', body: 'Negocios, profesionales y equipos que necesitan presentar una oferta con claridad y facilitar el contacto con posibles clientes.', items: [] },
      { title: 'Alcance del sitio', body: 'La estructura parte de tus objetivos y contenido. Puede incluir una página de campaña o varias páginas informativas, con diseño adaptable a móvil, tablet y escritorio.', items: ['Arquitectura de contenido y jerarquía visual.', 'Diseño de interfaz alineado con la identidad disponible.', 'Llamadas a la acción y enlaces de contacto acordados.'] },
      { title: 'Entregables posibles', body: 'Los materiales y funcionalidades se definen según el proyecto; no se presupone contenido, fotografía o integración que no se haya acordado.', items: ['Interfaz responsive y componentes reutilizables.', 'Recursos gráficos e iconografía apropiados para la marca.', 'Integración de formularios o servicios externos si forman parte del alcance.'] },
      { title: 'Cómo lo abordamos', body: 'Primero se aclaran audiencia, objetivos y contenido. Después se propone una estructura, se revisan las pantallas y se prepara la versión final para el despliegue convenido.', items: [] },
      { title: 'Qué se acuerda', body: 'Antes de empezar se confirman cantidad de páginas, textos e imágenes disponibles, revisiones, dominio, alojamiento y cualquier integración. El presupuesto depende de ese alcance.', items: [] }
    ],
    scope: 'El presupuesto se ajusta a la cantidad de páginas, complejidad visual y funcionalidades.',
    message: 'Hola, quiero solicitar presupuesto para una landing page o sitio web.'
  },
  {
    slug: 'negocio',
    title: 'Menos tareas dispersas. Más control del negocio.',
    label: 'WEB / OPERACIÓN',
    summary: 'Una aplicación web conectada a su API y base de datos, diseñada alrededor de los procesos del pequeño negocio.',
    photo: '/images/services/business.webp',
    alt: 'Interacción de pago en un pequeño comercio',
    intro: 'Cuando las tareas dependen de hojas, mensajes y memoria, un sistema puede reunir la operación en un flujo coherente. Primero se acuerdan reglas, datos y responsabilidades.',
    sections: [
      { title: 'Para quién', body: 'Pequeños negocios que quieren ordenar registros y tareas habituales con una herramienta adaptada a su forma de operar.', items: [] },
      { title: 'Alcance técnico', body: 'La aplicación web se conecta a una API y a una base de datos modelada según los registros y reglas que se definan en conjunto.', items: ['Interfaz de operación para las tareas acordadas.', 'Panel administrativo y gestión de usuarios.', 'Módulos CRUD para productos, clientes u otros registros.', 'Reglas de acceso y validación según los roles acordados.'] },
      { title: 'Entregables posibles', body: 'El sistema se construye por módulos definidos, sin asumir procesos, migraciones o integraciones que no estén en la propuesta.', items: ['Modelo de datos alineado con el flujo de trabajo.', 'API para consultar y actualizar los registros incluidos.', 'Pruebas de los recorridos y reglas priorizados.'] },
      { title: 'Cómo lo abordamos', body: 'Se mapean las tareas y excepciones; luego se acuerdan datos, permisos y pantallas. La implementación se revisa con recorridos representativos antes de preparar el despliegue.', items: [] },
      { title: 'Qué se acuerda', body: 'La propuesta detalla módulos, usuarios y roles, datos iniciales o migración, integraciones, alojamiento, soporte y mantenimiento según las necesidades reales.', items: [] }
    ],
    scope: 'El alcance y el presupuesto dependen de los módulos, pantallas y reglas operativas.',
    message: 'Hola, quiero solicitar presupuesto para un sistema web para mi negocio.'
  },
  {
    slug: 'plataforma',
    title: 'Una plataforma para usuarios, equipos y operaciones complejas.',
    label: 'PLATAFORMA / WEB + MÓVIL',
    summary: 'Soluciones de mayor alcance con servicios compartidos, controles de acceso y aplicaciones nativas.',
    photo: '/images/services/platform.webp',
    alt: 'Equipo colaborando alrededor de dispositivos',
    intro: 'Una plataforma combina varias superficies y permisos alrededor de reglas de negocio compartidas. La propuesta separa lo necesario ahora de lo que puede incorporarse después.',
    sections: [
      { title: 'Para quién', body: 'Equipos que necesitan coordinar usuarios, operaciones y más de una interfaz sobre reglas y datos compartidos.', items: [] },
      { title: 'Alcance técnico', body: 'La arquitectura se define con el dominio y las plataformas acordadas. Según el alcance, puede combinar web, API, persistencia PostgreSQL y aplicaciones nativas.', items: ['Frontend web con áreas para usuarios y administración.', 'Autenticación OAuth, roles y autorización de operaciones.', 'Middleware para proteger rutas y acciones.', 'Aplicaciones iOS con Swift y Android con Kotlin cuando se incluyan.'] },
      { title: 'Entregables posibles', body: 'Se organizan en módulos para acordar una primera entrega verificable y una evolución posterior.', items: ['Contratos entre interfaces y API.', 'Modelo de datos y reglas de acceso compartidos.', 'Pruebas de flujos críticos priorizados.', 'Despliegue web y preparación de aplicaciones según plataformas incluidas.'] },
      { title: 'Cómo lo abordamos', body: 'Se identifican actores, permisos y reglas; se diseña la arquitectura y los contratos; luego se implementan las superficies acordadas y se verifican sus flujos antes de desplegar.', items: [] },
      { title: 'Qué se acuerda', body: 'La propuesta delimita módulos, integraciones, infraestructura, soporte y mantenimiento. Publicación en tiendas, cuentas de desarrollador y costos de terceros se acuerdan por separado.', items: [] }
    ],
    scope: 'La propuesta define módulos, integraciones, plataformas, infraestructura y mantenimiento; la publicación en tiendas se acuerda por separado.',
    message: 'Hola, quiero solicitar presupuesto para una plataforma web con apps nativas.'
  }
];
