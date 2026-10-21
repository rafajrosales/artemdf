export interface GalleryItem {
  id: string;
  title: string;
  category: 'Altares & Tradición' | 'Lámparas & Luz' | 'Cajas & Bisagras' | 'Comercial & QR' | 'Navidad & Festivos' | 'Organizadores & Hogar' | 'Eventos & Sacro' | 'Decoración & Arte';
  image: string;
  tags: string[];
  description: string;
  dimensions: string;
  mdfThickness: string;
  productionTime: string;
  estimatedPriceMxn: number;
  featured?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'altar-monumental-3n',
    title: 'Altar Tradicional Día de Muertos (3 Niveles)',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_01_20241026_094119.jpg',
    tags: ['Día de Muertos', 'Altar', 'Papel Picado', 'Calaveritas', 'Candelabros'],
    description: 'Estructura modular en MDF de 3 mm diseñada para corte en área útil de hasta 40 cm, con grabados minuciosos de papel picado, calaveritas, candelabros laterales para veladoras LED y marco calado superior.',
    dimensions: '40 cm alto x 32 cm ancho x 22 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '2 a 3 días hábiles',
    estimatedPriceMxn: 450,
    featured: true
  },
  {
    id: 'lampara-arbol-vida',
    title: 'Lámpara Cubo "Árbol de la Vida"',
    category: 'Lámparas & Luz',
    image: '/gallery/artemdf_07_20251031_200446.jpg',
    tags: ['Lámpara', 'Árbol de la Vida', 'Luz Cálida', 'Ambiente', 'Madera'],
    description: 'Lámpara geométrica decorativa en MDF de 3 mm con acabado chocolate/nogal, siluetas botánicas caladas de alta precisión y pantalla difusora de luz cálida ambiental.',
    dimensions: '20 cm x 20 cm x 28 cm',
    mdfThickness: 'MDF 3 mm con ensamble finger-joint',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 380,
    featured: true
  },
  {
    id: 'caja-curva-kerf',
    title: 'Caja Curva con Bisagra Flexible (Living Hinge)',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_24_IMG_20261008_WA0003.jpeg',
    tags: ['Living Hinge', 'Caja Flexible', 'Ensamble', 'Diseño Paramétrico', 'Alhajero'],
    description: 'Pieza de ingeniería láser donde la madera rígida de MDF de 3 mm se flexiona suavemente formando un cilindro cerrado mediante patrón de corte de desahogo (kerf bending).',
    dimensions: '16 cm alto x 12 cm diámetro',
    mdfThickness: 'MDF 3 mm flexible',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 250,
    featured: true
  },
  {
    id: 'altar-pomuch-campeche',
    title: 'Altar Fachada con Torres Campanario',
    category: 'Altares & Tradición',
    image: '/assets/aistudio/FB_IMG_1791525003208_3afcd146.jpg',
    tags: ['Pomuch', 'Campeche', 'Colonial', 'Campanario', 'Día de Muertos'],
    description: 'Fachada conmemorativa en MDF 3 mm inspirada en la arquitectura colonial de Pomuch Campeche, con cruces caladas, belfries para campanas, calaveritas estilizadas y nicho central.',
    dimensions: '38 cm alto x 28 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 320,
    featured: true
  },
  {
    id: 'placa-qr-cazuelas',
    title: 'Display Comercial con Código QR & Logo',
    category: 'Comercial & QR',
    image: '/gallery/artemdf_21_IMG_20260825_183546_181.jpg',
    tags: ['Código QR', 'Restaurante', 'Negocio', 'Grabado Láser', 'Propina Digital'],
    description: 'Placa de mostrador personalizada para negocios y cafeterías, grabada al láser en MDF 3 mm con ilustración de marca, tipografía legible y código QR funcional para menú o propinas.',
    dimensions: '15 cm x 10 cm con base de apoyo',
    mdfThickness: 'MDF 3 mm con base de ensamble',
    productionTime: '24 horas',
    estimatedPriceMxn: 160,
    featured: true
  },
  {
    id: 'altar-mascotas-memorial',
    title: 'Altar Memorial para Mascotas con Huellitas',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_30_IMG20251003231040.jpg',
    tags: ['Mascotas', 'Perrito', 'Día de Muertos', 'Memorial', 'Huellitas'],
    description: 'Altar en MDF 3 mm de tres niveles diseñado para honrar a nuestros compañeros de cuatro patas, con grabado de perrito esqueleto charro, platito con huellas y marco para su fotografía.',
    dimensions: '38 cm alto x 28 cm ancho x 18 cm fondo',
    mdfThickness: 'MDF 3 mm de alta densidad',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 390,
    featured: true
  },
  {
    id: 'altar-ensamble-flores',
    title: 'Altar Ofrenda con Portarretratos & Flores',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_35_IMG20251101185637.jpg',
    tags: ['Ofrenda', 'Cempasúchil', 'Tradición', 'Portarretrato', 'Homenaje'],
    description: 'Composición real instalada en MDF 3 mm con flores de cempasúchil, nichos laterales para ofrendas y marco barroco grabado con papel picado de Día de Muertos.',
    dimensions: '40 cm alto x 32 cm ancho',
    mdfThickness: 'MDF 3 mm pulido',
    productionTime: '2 a 3 días hábiles',
    estimatedPriceMxn: 420,
    featured: true
  },
  {
    id: 'organizador-musica-cd',
    title: 'Bandeja Organizadora de Medios "Music"',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_13_IMG_20250606_135612.jpg',
    tags: ['Organizador', 'Música', 'Discos', 'Escritorio', 'Calado'],
    description: 'Bandeja de sobremesa para discos, libros y papelería con ensamble dentado visible en MDF 3 mm y filigrana tipográfica de pentagrama musical.',
    dimensions: '30 cm largo x 16 cm ancho x 12 cm alto',
    mdfThickness: 'MDF 3 mm con ensamble finger-joint',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 220,
    featured: false
  },
  {
    id: 'arbol-navideno-tipografico',
    title: 'Pino Navideño Tipográfico & Personalizado',
    category: 'Navidad & Festivos',
    image: '/gallery/artemdf_42_IMG20251123145603.jpg',
    tags: ['Navidad', 'Pino', 'Tipografía', 'CETis', 'Paz y Amor', 'Personalizado'],
    description: 'Árbol navideño de mesa en espiral continua de MDF 3 mm con calado de palabras de bendición (Amor, Paz, Alegría, Ilusión) y grabado personalizado para instituciones o familias.',
    dimensions: '35 cm alto x 22 cm base',
    mdfThickness: 'MDF 3 mm esmaltado en blanco o madera natural',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 190,
    featured: true
  },
  {
    id: 'pergamino-primera-comunion',
    title: 'Pergamino Sacro Grabado "Primera Comunión"',
    category: 'Eventos & Sacro',
    image: '/gallery/artemdf_02_20250327_000059.jpg',
    tags: ['Primera Comunión', 'Pergamino', 'Credo', 'Grabado Sacro', 'Recuerdo'],
    description: 'Placa de MDF 3 mm con contorno quemado efecto papiro antiguo, con el Credo completo grabado con nitidez milimétrica e imagen sacra.',
    dimensions: '28 cm x 18 cm',
    mdfThickness: 'MDF 3 mm con grabado pirográfico láser',
    productionTime: '24 horas',
    estimatedPriceMxn: 180,
    featured: false
  },
  {
    id: 'catedral-cupula-dia-muertos',
    title: 'Fachada Catedral con Cúpula & Cruces',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_23_IMG_20261010_221103.jpg',
    tags: ['Catedral', 'Cúpula', 'Cruces', 'Altar', 'Día de Muertos'],
    description: 'Monumento en MDF 3 mm inspirado en basílicas coloniales con cúpula nervada, torres gemelas y vano principal listo para montar nicho iluminado.',
    dimensions: '39 cm alto x 34 cm ancho',
    mdfThickness: 'MDF 3 mm con ensamble de ranura',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 370,
    featured: true
  },
  {
    id: 'farol-torre-calado',
    title: 'Farol Torre con Celosía de Ventanales',
    category: 'Lámparas & Luz',
    image: '/gallery/artemdf_18_IMG_20250724_150935.jpg',
    tags: ['Farol', 'Celosía', 'Láser LED', 'Linterna', 'Decoración'],
    description: 'Farol arquitectónico calado en MDF 3 mm con arcos de medio punto y mirador superior, diseñado para proyectar sombras envolventes con velas aromáticas o luz LED.',
    dimensions: '36 cm alto x 16 cm x 16 cm',
    mdfThickness: 'MDF 3 mm corte limpio',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 290,
    featured: false
  },
  {
    id: 'vectorizado-mascotas-institucional',
    title: 'Vectorización & Corte de Personajes',
    category: 'Comercial & QR',
    image: '/gallery/artemdf_27_IMG_20261019_WA0007.jpeg',
    tags: ['Vectorización', 'CENDIS', 'Iztapalapa', 'Mascotas', 'Diseño'],
    description: 'Digitalización vector a vector de logotipos y personajes en placas de MDF 3 mm con preparación para corte y grabado por capas de relieve.',
    dimensions: 'Hasta 40 x 40 cm por placa',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 240,
    featured: false
  },
  {
    id: 'farol-vela-altar-par',
    title: 'Farolitos Portavelas Miniatura para Altar',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_03_20250814_172207.jpg',
    tags: ['Mini Farol', 'Veladoras', 'Altar', 'Día de Muertos'],
    description: 'Par de linternas miniatura en MDF 3 mm con cruceta superior y celosías laterales para acompañar nichos de ofrenda y repisas.',
    dimensions: '14 cm alto x 8 cm x 8 cm',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 140,
    featured: false
  },
  {
    id: 'contenedor-curvo-petalos',
    title: 'Contenedor Cilíndrico con Remates de Pétalos',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_25_IMG_20261008_WA0005.jpeg',
    tags: ['Living Hinge', 'Cilindro', 'Pétalos', 'Caja', 'Regalo'],
    description: 'Caja joyero cilíndrica con bisagras flexibles kerf en MDF 3 mm y tapa con calado botánico de flor de loto.',
    dimensions: '14 cm diámetro x 12 cm alto',
    mdfThickness: 'MDF 3 mm flexible',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 230,
    featured: false
  },
  {
    id: 'porta-retrato-filigrana-barroca',
    title: 'Marco Calado de Filigrana Barroca',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_11_IMG_20250214_213833.jpg',
    tags: ['Marco', 'Filigrana', 'Barroco', 'Fotografía', 'Decoración'],
    description: 'Marco artesanal en MDF 3 mm para retratos y recuerdos familiares con bordes calados ornamentales inspirados en el arte barroco novohispano.',
    dimensions: '25 cm x 20 cm (para foto 15x10 cm)',
    mdfThickness: 'MDF 3 mm con pie de apoyo',
    productionTime: '24 horas',
    estimatedPriceMxn: 170,
    featured: false
  },
  {
    id: 'caja-regalo-corazones',
    title: 'Caja Obsequio con Calado de Corazones',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_14_IMG_20250606_135647.jpg',
    tags: ['Caja de Regalo', 'Corazones', 'San Valentín', 'Bodas', 'Recuerdo'],
    description: 'Cajita decorativa en MDF 3 mm con tapa corrediza y patrón de calados en forma de corazón, ideal para joyería, bombones o souvenirs de boda.',
    dimensions: '12 cm x 12 cm x 8 cm',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 130,
    featured: false
  },
  {
    id: 'organizador-escritorio-modular',
    title: 'Organizador Modular de Escritorio & Taller',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_17_IMG_20250610_180917.jpg',
    tags: ['Organizador', 'Taller', 'Herramientas', 'Escritorio'],
    description: 'Torre de compartimentos múltiples en MDF 3 mm reforzado por ensamble para herramientas de precisión, útiles de arte o papelería.',
    dimensions: '28 cm x 20 cm x 18 cm',
    mdfThickness: 'MDF 3 mm con ensamble reforzado',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 280,
    featured: false
  },
  {
    id: 'centro-mesa-boda-quince',
    title: 'Centro de Mesa Calado con Silueta Floral',
    category: 'Eventos & Sacro',
    image: '/gallery/artemdf_29_IMG20250922185639.jpg',
    tags: ['Eventos', 'Boda', 'XV Años', 'Centro de Mesa', 'Floral'],
    description: 'Base calada en MDF 3 mm para números de mesa o arreglos florales en eventos sociales, con grabado de nombres y fecha conmemorativa.',
    dimensions: '28 cm alto x 18 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '2 a 3 días hábiles (según cantidad)',
    estimatedPriceMxn: 110,
    featured: false
  },
  {
    id: 'letrero-navideno-colgante',
    title: 'Corona & Esfera Colgante Festiva',
    category: 'Navidad & Festivos',
    image: '/gallery/artemdf_43_IMG20251130184411.jpg',
    tags: ['Navidad', 'Corona', 'Esfera', 'Madera', 'Pino'],
    description: 'Adorno circular en MDF 3 mm para puertas o pinos navideños con copos de nieve calados y grabado con apellido familiar.',
    dimensions: '24 cm diámetro',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 120,
    featured: false
  },
  {
    id: 'candelabro-tensegrity-flotante',
    title: 'Portavelas Tensegrity Flotante Living Hinge',
    category: 'Lámparas & Luz',
    image: '/gallery/artemdf_08_FB_IMG_1788886710565.jpg',
    tags: ['Tensegrity', 'Candelabro', 'Living Hinge', 'Mandala', 'Flotante'],
    description: 'Estructura antigravedad tensegrity en MDF 3 mm con curvas living hinge sin vapor, mandalas calados y soporte superior para veladora.',
    dimensions: '22 cm alto x 15 cm x 15 cm',
    mdfThickness: 'MDF 3 mm exclusivo flexible',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 260,
    featured: true
  },
  {
    id: 'mandala-arbol-vida-pared',
    title: 'Mandala Mural "Árbol de la Vida"',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_05_20250814_184459.jpg',
    tags: ['Árbol de la Vida', 'Mandala', 'Pared', 'Decoración', 'Follaje'],
    description: 'Medallón botánico circular en MDF 3 mm con ramas entrelazadas, hojas y raíces caladas al límite de corte de 38 cm de diámetro.',
    dimensions: '38 cm diámetro (máx 40 cm)',
    mdfThickness: 'MDF 3 mm corte de alta precisión',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 290,
    featured: true
  },
  {
    id: 'carreta-super-papa-dulcero',
    title: 'Carreta Botellero "Súper Papá"',
    category: 'Eventos & Sacro',
    image: '/gallery/artemdf_15_IMG_20250606_185847.jpg',
    tags: ['Día del Padre', 'Carreta', 'Ruedas', 'Botellero', 'Caja'],
    description: 'Carreta artesanal en MDF 3 mm con ruedas de rayos móviles, compartimento para botellas/dulces y letrero con relieve "Súper Papá".',
    dimensions: '32 cm largo x 16 cm ancho x 15 cm alto',
    mdfThickness: 'MDF 3 mm ensamble mecánico',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 210,
    featured: false
  },
  {
    id: 'mascota-corporea-cendis',
    title: 'Figura Corpórea con Base "CENDIS"',
    category: 'Comercial & QR',
    image: '/gallery/artemdf_28_IMG_20261019_WA0012.jpeg',
    tags: ['Mascota', 'Cendis', 'Iztapalapa', 'Silueta', 'Grabado'],
    description: 'Figura de pie en MDF 3 mm con base de doble disco, grabado pirográfico de texturas y logotipo institucional nítido.',
    dimensions: '36 cm alto x 20 cm ancho',
    mdfThickness: 'MDF 3 mm de alta densidad',
    productionTime: '24 horas',
    estimatedPriceMxn: 220,
    featured: false
  },
  {
    id: 'nicho-capilla-dia-muertos',
    title: 'Nicho Capilla con Puertas Caladas & Foto',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_31_IMG20251010215917.jpg',
    tags: ['Nicho', 'Capilla', 'Puertas Caladas', 'Día de Muertos', 'Retrato Láser'],
    description: 'Capilla conmemorativa en MDF 3 mm con puertas abatibles caladas con calaveras y papel picado, coronamiento y fotografía grabada al fondo.',
    dimensions: '35 cm alto x 22 cm ancho x 16 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 380,
    featured: true
  },
  {
    id: 'mini-marco-barroco-corazon',
    title: 'Portarretrato Miniatura Barroco con Corazón',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_26_IMG_20261018_WA0006.jpeg',
    tags: ['Mini Marco', 'Barroco', 'Corazón', 'Ofrenda', 'Recuerdo'],
    description: 'Marco miniatura de escritorio en MDF 3 mm con copete en forma de corazón y pie de soporte para fotos de ofrenda o recuerdos de evento.',
    dimensions: '14 cm alto x 10 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 90,
    featured: false
  },
  {
    id: 'triptico-arbol-vida-aves',
    title: 'Tríptico Calado "Árbol de la Vida con Aves Silvestres"',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_04_20250814_172207_1_.jpg',
    tags: ['Tríptico', 'Árbol de la Vida', 'Calado Láser', 'Cuadro de Pared', 'Aves'],
    description: 'Composición de 3 paneles modulares calados al láser en MDF 3 mm con silueta continua del árbol de la vida y aves reposando en las ramas, terminado en negro mate.',
    dimensions: '3 módulos de 38 cm x 18 cm (ancho total ~58 cm)',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 480,
    featured: true
  },
  {
    id: 'linterna-sombra-jack-skellington',
    title: 'Linterna de Sombra Jack Skellington & Árbol Sombrío',
    category: 'Lámparas & Luz',
    image: '/gallery/artemdf_06_20251025_235036.jpg',
    tags: ['Linterna Sombra', 'Jack Skellington', 'Halloween', 'Lámpara LED', 'Ensamble Ranura'],
    description: 'Linterna cúbica en MDF 3 mm con ensamble de lengüeta y ranura precisa, calados frontales y laterales de Jack Skellington que proyectan siluetas al iluminarse con luz LED cálida.',
    dimensions: '26 cm alto x 18 cm ancho x 18 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 320,
    featured: true
  },
  {
    id: 'altar-fachada-colonial-celosias',
    title: 'Fachada Colonial para Altar con Cruces & Belfries',
    category: 'Altares & Tradición',
    image: '/gallery/artemdf_09_FB_IMG_1791524921860.jpg',
    tags: ['Altar Colonial', 'Campanario', 'Día de Muertos', 'Fachada Calada', 'Nicho'],
    description: 'Estructura arquitectónica conmemorativa en MDF 3 mm con doble torre campanario, cruces caladas de filigrana fina y nicho central para velas LED u ofrendas.',
    dimensions: '38 cm alto x 30 cm ancho con peana',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 320,
    featured: false
  },
  {
    id: 'alcancia-reto-5000',
    title: 'Alcancía Reto de Ahorro $5,000 con Tabla Grabada',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_12_IMG_20250531_160536.jpg',
    tags: ['Alcancía', 'Reto de Ahorro', 'Grabado Láser', 'Finanzas', 'Caja de Ahorro'],
    description: 'Alcancía de madera MDF 3 mm con ensamble en diente de sierra y tabla de 100 casillas grabada al láser para tachar con plumón hasta alcanzar la meta de $5,000.',
    dimensions: '22 cm alto x 28 cm ancho x 8 cm fondo',
    mdfThickness: 'MDF 3 mm de alta densidad',
    productionTime: '24 horas',
    estimatedPriceMxn: 240,
    featured: true
  },
  {
    id: 'caja-contenedor-maritimo',
    title: 'Caja Organizadora Contenedor Marítimo a Escala',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_16_IMG_20250610_180909.jpg',
    tags: ['Contenedor Marítimo', 'Industrial', 'Portalápices', 'Caja Escala', 'Corte Precisión'],
    description: 'Modelo a escala de contenedor intermodal de carga naval en MDF 3 mm, con textura acanalada perimetral, ranura superior y sellos de identificación grabados al láser.',
    dimensions: '30 cm largo x 12 cm ancho x 13 cm alto',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 260,
    featured: false
  },
  {
    id: 'farol-conmemorativo-dije-foto',
    title: 'Farol Linterna Conmemorativa con Dije Fotográfico Grabado',
    category: 'Eventos & Sacro',
    image: '/gallery/artemdf_19_IMG_20250808_130138.jpg',
    tags: ['Farol', 'Linterna', 'Recuerdo', 'Foto Grabada', 'Bautizo', 'XV Años'],
    description: 'Farol de capilla en MDF 3 mm con ventanales arqueados tipo vidriera y colgante circular con fotograbado pirográfico de retrato y dedicatoria personalizada.',
    dimensions: '36 cm alto x 15 cm ancho x 15 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 290,
    featured: true
  },
  {
    id: 'centro-mesa-farol-xv-anos',
    title: 'Centro de Mesa Farol XV Años con Medallón Personalizado',
    category: 'Eventos & Sacro',
    image: '/gallery/artemdf_20_IMG_20250808_130145.jpg',
    tags: ['XV Años', 'Centro de Mesa', 'Medallón', 'Foto Retrato', 'Fiesta', 'Recuerdo'],
    description: 'Linterna decorativa vertical para mesas de celebración, en MDF 3 mm con cúpula superior, ventana calada y medallón grabado con fotografía conmemorativa de quinceañera.',
    dimensions: '36 cm alto x 15 cm ancho x 15 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 290,
    featured: false
  },
  {
    id: 'lampara-tensegrity-modulo-led',
    title: 'Lámpara Tensegrity Flotante con Foco LED Recargable',
    category: 'Lámparas & Luz',
    image: '/gallery/artemdf_22_IMG_20260920_003427_361.jpg',
    tags: ['Tensegrity', 'Lámpara Flotante', 'Living Hinge', 'Luz LED', 'Física', 'Decoración'],
    description: 'Pieza de ingeniería tensada en MDF 3 mm que desafía la gravedad; incluye curvatura flexible con corte living hinge, rosetas grabadas y módulo de foco LED recargable integrado.',
    dimensions: '22 cm alto x 16 cm ancho x 16 cm fondo',
    mdfThickness: 'MDF 3 mm flexible',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 390,
    featured: true
  },
  {
    id: 'buho-mandala-multicapas-3d',
    title: 'Búho Guardián Mandala Multicapas 3D con Aro Enmarcado',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_32_IMG20251023150915.jpg',
    tags: ['Búho', 'Mandala 3D', 'Multicapas', 'Arte en Madera', 'Calado Extremo'],
    description: 'Impresionante escultura de pared en MDF 3 mm compuesta por capas superpuestas que generan profundidad tridimensional, plumaje filigranado y aro protector exterior negro.',
    dimensions: '38 cm diámetro circular',
    mdfThickness: 'MDF 3 mm multicapa',
    productionTime: '2 a 3 días hábiles',
    estimatedPriceMxn: 520,
    featured: true
  },
  {
    id: 'paneles-calados-jack-arbol',
    title: 'Paneles Calados Jack Skellington & Árbol de Halloween',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_33_IMG20251025212646.jpg',
    tags: ['Jack Skellington', 'Halloween', 'Panel Calado', 'Silueta', 'Negro Mate'],
    description: 'Placas caladas al láser sobre MDF 3 mm con acabado esmaltado negro carbón, que retratan a Jack Skellington junto a las ramas retorcidas del árbol del cementerio.',
    dimensions: '34 cm alto x 22 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 180,
    featured: false
  },
  {
    id: 'paneles-calados-jack-telarana',
    title: 'Panel Calado Telaraña & Siluetas Halloween Jack',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_34_IMG20251025235358.jpg',
    tags: ['El Extraño Mundo de Jack', 'Telaraña', 'Siluetas', 'Calado Láser'],
    description: 'Panel de pared o lateral de linterna en MDF 3 mm con telarañas caladas al milímetro, araña colgante y silueta de personajes sobre luna menguante.',
    dimensions: '34 cm alto x 22 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 180,
    featured: false
  },
  {
    id: 'base-oblicua-grabado-delfines',
    title: 'Porta-Tarjetas & Base Inclinada con Grabado de Delfines',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_36_IMG20251122181416.jpg',
    tags: ['Tarjetero', 'Grabado Láser', 'Delfines', 'Oficina', 'Base Inclinada'],
    description: 'Organizador con perfil cónico en MDF 3 mm y ensambles de ranura, con pirograbado láser de fauna marina y logotipo personalizado de estudio.',
    dimensions: '18 cm alto x 10 cm ancho x 9 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 130,
    featured: false
  },
  {
    id: 'organizador-escritorio-inclinado',
    title: 'Organizador de Mostrador Inclinado para Publicidad',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_37_IMG20251122181426.jpg',
    tags: ['Mostrador', 'Organizador', 'Negocio', 'MDF 3 mm', 'Ensamble Ranurado'],
    description: 'Soporte y despachador en MDF 3 mm con cara inclinada diseñada para exhibir flyers, tarjetas de presentación o códigos QR de pago con estabilidad absoluta.',
    dimensions: '18 cm alto x 12 cm ancho x 10 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 140,
    featured: false
  },
  {
    id: 'caja-trapezoidal-finger-joint',
    title: 'Caja Trapezoidal con Ensamble Finger-Joint & Grabado',
    category: 'Organizadores & Hogar',
    image: '/gallery/artemdf_38_IMG20251122181431.jpg',
    tags: ['Caja Trapezoidal', 'Finger Joint', 'Grabado', 'Regalo Corporativo'],
    description: 'Caja organizadora con laterales convergentes cortada al láser en MDF 3 mm, cantos tostados estéticos y ajuste por encastre sin tornillos.',
    dimensions: '18 cm alto x 11 cm ancho x 10 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 140,
    featured: false
  },
  {
    id: 'arbol-navideno-frases-madera',
    title: 'Árbol Navideño Calado con Frases de Paz & Ilusión',
    category: 'Navidad & Festivos',
    image: '/gallery/artemdf_39_IMG20251122231817.jpg',
    tags: ['Navidad', 'Árbol Calado', 'Frases Navideñas', 'Engrane', 'Regalo Fin de Año'],
    description: 'Árbol de sobremesa en MDF 3 mm con tipografía continua de buenos deseos ("Que la Navidad nos traiga Amor, Paz, Alegría e Ilusión"), estrella superior y pie en cruz encastrable.',
    dimensions: '35 cm alto x 22 cm ancho con base',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 160,
    featured: true
  },
  {
    id: 'arbol-navideno-calado-natural',
    title: 'Árbol Navideño de Mesa en MDF Natural Armable',
    category: 'Navidad & Festivos',
    image: '/gallery/artemdf_40_IMG20251122231828.jpg',
    tags: ['Navidad', 'Árbol de Mesa', 'MDF Natural', 'Armable', 'Decoración'],
    description: 'Pieza festiva desmontable cortada al láser con bordes sombreados por el calor del haz láser, ideal para escritorios, repisas o regalos corporativos.',
    dimensions: '35 cm alto x 22 cm ancho',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 160,
    featured: false
  },
  {
    id: 'arbol-navideno-esmaltado-blanco',
    title: 'Árbol Navideño Decorativo Esmaltado Blanco con Frases',
    category: 'Navidad & Festivos',
    image: '/gallery/artemdf_41_IMG20251123145317.jpg',
    tags: ['Navidad', 'Blanco Nevado', 'Pintado a Mano', 'Frases', 'Festivo'],
    description: 'Versión esmaltada en blanco invernal con toques de color en las estrellas y engrane superior, destacando las letras caladas de Feliz Navidad sobre base de MDF 3 mm.',
    dimensions: '35 cm alto x 22 cm ancho',
    mdfThickness: 'MDF 3 mm con esmalte acrílico',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 210,
    featured: true
  },
  {
    id: 'mini-cofre-tesoro-curvo',
    title: 'Mini Cofre del Tesoro con Tapa Curva Segmentada',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_44_IMG20251216225042.jpg',
    tags: ['Cofre Pirata', 'Tapa Curva', 'Alhajero', 'Ensamble Preciso', 'Corte Láser'],
    description: 'Cofre artesanal en MDF 3 mm con tapa abovedada lograda mediante duelas entrelazadas y herrajes simulados en madera calada con cerradura frontal.',
    dimensions: '16 cm ancho x 11 cm fondo x 12 cm alto',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 220,
    featured: true
  },
  {
    id: 'cofre-alhajero-abierto-bisagra',
    title: 'Cofre Alhajero Abierto con Bisagras de Madera Calada',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_45_IMG20251216225050.jpg',
    tags: ['Cofre', 'Bisagra de Madera', 'Alhajero', 'Artesanía Láser', 'Joyero'],
    description: 'Detalle del mecanismo interior del cofre en MDF 3 mm, mostrando las bisagras traseras mecánicas integradas en la misma madera sin requerir tornillería metálica.',
    dimensions: '16 cm ancho x 11 cm fondo x 12 cm alto',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 220,
    featured: false
  },
  {
    id: 'set-cofres-cajitas-curvas',
    title: 'Set de Cofre del Tesoro & Cajitas con Living Hinge Flexible',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_46_IMG20251216225103.jpg',
    tags: ['Set de Regalo', 'Living Hinge', 'Cofre', 'Madera Flexible', 'Patrón Kerf'],
    description: 'Colección de muestras artesanales que combina el cofre de duelas curvas junto a micro alhajeros con tapa curva flexible de una sola pieza calada mediante corte kerf.',
    dimensions: 'Cofre 16 cm y mini cajitas de 7 cm x 7 cm',
    mdfThickness: 'MDF 3 mm flexible y rígido',
    productionTime: '2 días hábiles',
    estimatedPriceMxn: 340,
    featured: true
  },
  {
    id: 'alhajero-circular-arbol-vida-hinge',
    title: 'Alhajero Circular Árbol de la Vida con Living Hinge & Broche',
    category: 'Cajas & Bisagras',
    image: '/gallery/artemdf_47_IMG20260315231148.jpg',
    tags: ['Alhajero Circular', 'Árbol de la Vida', 'Living Hinge', 'Broche de Madera', 'Joyero'],
    description: 'Espectacular caja redonda en MDF 3 mm donde la pared perimetral se dobla en círculo gracias a un patrón living hinge calado; incluye tapa calada del árbol de la vida y cierre de madera.',
    dimensions: '16 cm diámetro x 7 cm alto',
    mdfThickness: 'MDF 3 mm flexible de alta densidad',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 310,
    featured: true
  },
  {
    id: 'tapa-calada-arbol-vida-detalle',
    title: 'Tapa Calada Circular Árbol de la Vida de Alta Precisión',
    category: 'Decoración & Arte',
    image: '/gallery/artemdf_48_IMG20260315231159.jpg',
    tags: ['Árbol de la Vida', 'Calado Láser', 'Filigrana', 'Detalle Fino', 'Arte'],
    description: 'Primer plano del calado sobre MDF 3 mm con haz de 0.1 mm, mostrando las ramas entrelazadas, hojas individuales y raíces que forman la copa del árbol celta.',
    dimensions: '16 cm diámetro circular',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 150,
    featured: false
  },
  {
    id: 'alhajero-circular-compartimentos',
    title: 'Alhajero Circular Multicompartimento con Tapa Deslizante',
    category: 'Cajas & Bisagras',
    image: '/gallery/IMG20260322215230.jpg',
    tags: ['Joyero Redondo', 'Compartimentos', 'Tapa Giratoria', 'Organizador', 'Artesanía'],
    description: 'Vista funcional de la caja circular abierta en MDF 3 mm sobre superficie de estudio, con divisiones internas para anillos y aretes, y compuertas móviles con living hinge perimetral calado.',
    dimensions: '16 cm diámetro x 7 cm alto',
    mdfThickness: 'MDF 3 mm flexible',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 310,
    featured: true
  },
  {
    id: 'organizador-joyero-gaveta-hojas',
    title: 'Organizador Joyero con Gaveta Extraíble & Calado Botánico',
    category: 'Organizadores & Hogar',
    image: '/gallery/IMG20260322215037.jpg',
    tags: ['Joyero con Cajón', 'Gaveta Deslizable', 'Hojas Caladas', 'Organizador', 'Tocador'],
    description: 'Caja organizadora de tocador en MDF 3 mm fotografiada en estudio con fondo limpio; compartimento superior con tapa calada de nervaduras botánicas, tirador integrado y gaveta inferior deslizable.',
    dimensions: '22 cm ancho x 14 cm fondo x 14 cm alto',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '1 a 2 días hábiles',
    estimatedPriceMxn: 330,
    featured: true
  },
  {
    id: 'cactus-parametrico-maceta',
    title: 'Cactus Escultural Paramétrico 3D en Maceta Geométrica',
    category: 'Decoración & Arte',
    image: '/gallery/IMG20260322215134.jpg',
    tags: ['Cactus 3D', 'Escultura Botánica', 'Paramétrico', 'MDF 3 mm', 'Ensamble de Precisión'],
    description: 'Pieza escultórica contemporánea en MDF 3 mm de encastre concéntrico con costillas dentadas, coronada con flor geométrica de suculenta y maceta facetada de 4 lados ensamblada al milímetro.',
    dimensions: '24 cm alto x 14 cm ancho x 14 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 240,
    featured: true
  },
  {
    id: 'cactus-saguaro-escultural',
    title: 'Cactus Saguaro Paramétrico con Brazos & Flor de Suculenta',
    category: 'Decoración & Arte',
    image: '/gallery/IMG20260322215155.jpg',
    tags: ['Cactus Saguaro', 'Escultura', 'Diseño Paramétrico', 'Decoración Mexicana', 'MDF 3 mm'],
    description: 'Cactus tridimensional estilo saguaro en MDF 3 mm con brazos laterales interconectados, estípulas aserradas cortadas al láser, flor suculenta superior calada y macetero biselado.',
    dimensions: '28 cm alto x 18 cm ancho x 12 cm fondo',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 a 48 horas',
    estimatedPriceMxn: 260,
    featured: true
  },
  {
    id: 'llavero-michi-guerrero',
    title: 'Llavero Artesanal Gatito con Herraje Metálico',
    category: 'Decoración & Arte',
    image: '/gallery/IMG20260322215243.jpg',
    tags: ['Llavero', 'Gatito', 'Michi', 'Grabado Láser', 'Accesorios', 'Corte Fino'],
    description: 'Llavero personalizado cortado y pirograbado al láser en MDF 3 mm de alta densidad con silueta de felino en relieve, detalles de huellitas y herraje tipo mosquetón de alta resistencia.',
    dimensions: '6 cm alto x 5.5 cm ancho',
    mdfThickness: 'MDF 3 mm de alta densidad',
    productionTime: '24 horas',
    estimatedPriceMxn: 65,
    featured: true
  },
  {
    id: 'llaveros-pareja-miss-you',
    title: 'Llaveros Dúo Pareja Interconectados "Miss You" Llave & Corazón',
    category: 'Decoración & Arte',
    image: '/gallery/IMG20260322215310.jpg',
    tags: ['Llaveros Pareja', 'Miss You', 'Amor', 'San Valentín', 'Llave y Corazón', 'Grabado Láser'],
    description: 'Juego de dos llaveros complementarios en MDF 3 mm con encaje rompecabezas perfecto entre corazón grabado y llave con guarda calada, argollas y mosquetones dobles.',
    dimensions: '8 cm x 4.5 cm ensamblados',
    mdfThickness: 'MDF 3 mm exclusivo',
    productionTime: '24 horas',
    estimatedPriceMxn: 110,
    featured: true
  }
];

export const WORKSHOP_STATS = [
  { value: '3 mm', label: 'Grosor Exclusivo de Corte', detail: 'MDF de alta densidad calibrado' },
  { value: '40 cm', label: 'Área Máxima de Corte', detail: 'Formato óptimo láser LED continuo' },
  { value: '0.1 mm', label: 'Precisión Focal Láser', detail: 'Calado fino y pirograbado nítido' },
  { value: '50+', label: 'Modelos en Catálogo', detail: 'Altares, lámparas y cajas paramétricas' }
];

export const WORKSHOP_STEPS = [
  {
    step: '01',
    title: 'Diseño Vectorial para MDF 3 mm',
    description: 'Preparamos el archivo en vectores digitales (.DXF / .SVG), ajustando las holguras y tolerancias específicas para MDF de 3 mm y área útil de hasta 40 cm.',
    icon: 'PenTool'
  },
  {
    step: '02',
    title: 'Corte Láser LED de Alta Definición',
    description: 'Corte con rayo láser focalizado sobre placas de 3 mm. Permite calados ultradefinidos de menos de 1 mm, pirograbados limpios y bisagras flexibles living hinge.',
    icon: 'Zap'
  },
  {
    step: '03',
    title: 'Lijado & Descarbonizado Manual',
    description: 'Lijamos cada pieza de 3 mm a mano para suavizar los cantos quemados, retirar residuos térmicos y dejar la textura natural del MDF lista para tinte o esmalte.',
    icon: 'Sparkles'
  },
  {
    step: '04',
    title: 'Ensamble de Precisión & Entrega',
    description: 'Ensamblamos las piezas mediante ranuras y encastres calibrados a 3.0 mm. Instalamos luz LED cálida en lámparas y coordinamos la entrega personal acordada.',
    icon: 'CheckCircle'
  }
];

export const FAQS = [
  {
    q: '¿Qué grosor de MDF manejan para sus cortes y diseños?',
    a: 'Trabajamos exclusivamente con MDF de 3 mm de espesor. Este grosor es el estándar óptimo para nuestro equipo de corte láser LED: garantiza la máxima definición en detalles finos (como papel picado, calados botánicos y textos pequeños), permite bisagras curvas flexibles (living hinge) sin fracturas, ensambles de ranura firmes y figuras tridimensionales mediante capas superpuestas.'
  },
  {
    q: '¿Cuál es el tamaño máximo de corte en una sola pieza?',
    a: 'El área máxima de corte continuo de nuestro equipo láser es de 40 x 40 cm por placa en MDF de 3 mm. Si tu proyecto requiere una dimensión mayor (como altares monumentales, celosías de pared o letreros grandes), diseñamos ensambles modulares con uniones tipo finger-joint o encastre oculto para que la estructura final alcance el tamaño que necesitas.'
  },
  {
    q: '¿Cómo son las entregas personales y qué zonas cubren?',
    a: 'Nuestras entregas son 100% personales y directas en mano: 1) Zona Norte de la CDMX y zonas cercanas: entregas a convenir en puntos de encuentro acordados (sin costo de recargo). 2) Los Héroes Tecámac y alrededores: aplica un 10% adicional por concepto de traslado y logística. No manejamos envíos foráneos a otros estados de la República Mexicana para garantizar que cada pieza llegue en perfecto estado.'
  },
  {
    q: '¿Por qué cortar en MDF de 3 mm?',
    a: 'El MDF de 3 mm ofrece un balance perfecto entre ligereza, resistencia y precisión estética. Al ser cortado con láser LED, genera aristas limpias con un quemado ámbar controlado, excelente facilidad de transporte y permite crear estructuras sólidas en 3D mediante encastres a presión.'
  },
  {
    q: '¿Hacen envíos a otros estados o paquetería foránea?',
    a: 'No realizamos envíos a todo México ni paqueterías foráneas. Nos enfocamos exclusivamente en la Zona Norte de la CDMX y Los Héroes Tecámac con entrega personal a convenir. Esto asegura que recibas tu pieza de MDF 3 mm directamente en mano, verificada y protegida contra cualquier maltrato de paquetería.'
  },
  {
    q: '¿Puedo enviar mi propio diseño o logotipo?',
    a: '¡Por supuesto! Puedes compartirnos tu archivo en vectores (.ai, .cdr, .dxf, .svg) o una foto/imagen clara. Lo adaptamos a nuestra cama de corte de 40 cm y grosor de 3 mm sin costo adicional en la mayoría de los casos.'
  },
  {
    q: '¿Las lámparas ya incluyen la iluminación LED?',
    a: 'Sí, nuestras luminarias incluyen instalación eléctrica o tira LED cálida, cable con interruptor y clavija lista para conectar a corriente estándar de 110V.'
  }
];
