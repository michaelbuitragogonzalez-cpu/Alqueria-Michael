// Catálogo de productos. Edita precios, nombres o imágenes aquí.
// "imagen" apunta a la carpeta img/. Reemplaza los .svg por tus fotos (.jpg/.png) y actualiza la ruta.
const PRODUCTOS = [
  { id: 1,  nombre: "Bocadillo Beleño",           presentacion: "Paquete X 36",        descripcion: "Delicioso bocadillo ideal para disfrutar en cualquier momento del día.", precio: 15500,  imagen: "img/bocadillo.jpeg" },
  { id: 2,  nombre: "Boliqueso",     presentacion: "Paquete X 24",        descripcion: "Crujientes y deliciosos boliquesos, perfectos para disfrutar como pasabocas en cualquier momento.",                      precio: 8000,  imagen: "img/Boliqueso.jpeg" },
  { id: 3,  nombre: "Chocoleche",   presentacion: "Paquete X 6",        descripcion: "Deliciosa bebida achocolatada, ideal para disfrutar fría y darle dulzura a tu día.",                         precio: 10000,  imagen: "img/chocoleche.jpeg" },
  { id: 4,  nombre: "Avena Sabor Original",      presentacion: "Paquete X 6", descripcion: "Avena cremosa y deliciosa, perfecta para disfrutar bien fría en cualquier momento del día.",             precio: 9000, imagen: "img/avenabolsaautentica.jpeg" },
  { id: 5,  nombre: "Avena Sabor Cubana",         presentacion: "Paquete X 6",         descripcion: "Avena cremosa y deliciosa, perfecta para disfrutar bien fría en cualquier momento del día.",                         precio: 9000,  imagen: "img/avenabolsacubana.jpeg" },
  { id: 6,  nombre: "Bonyurt Galleta",     presentacion: "Unidad X 170 G",        descripcion: "Delicioso yogurt con trocitos de galleta, ideal para disfrutar de un antojo dulce y cremoso.",                      precio: 3200,  imagen: "img/bonyurtgalleta.jpeg" },
  { id: 7,  nombre: "Bonyurt M&M",                  presentacion: "Unidad X 100 G",         descripcion: "Delicioso yogurt cremoso con chocolates M&M's, perfecto para disfrutar de un antojo dulce y divertido.",        precio: 2800,  imagen: "img/bonyurtm&m.jpeg" },
  { id: 8,  nombre: "Bonyurt Milo",         presentacion: "Unidad X 100 G",          descripcion: "Delicioso yogurt cremoso con el inconfundible sabor a Milo, ideal para disfrutar en cualquier momento.",                                precio: 2800,  imagen: "img/bonyurtmilo.jpeg" },
  { id: 9,  nombre: "Bonyurt Zucaritas",      presentacion: "Unidad X 170 G",          descripcion: "Delicioso yogurt cremoso acompañado de crujientes Zucaritas, perfecto para un antojo lleno de sabor.",                      precio: 3200, imagen: "img/bonyurtzucarita.jpeg" },
  { id: 10, nombre: "Caja de Avena Original",            presentacion: "Paquete X 8",          descripcion: "Avena cremosa y deliciosa, perfecta para disfrutar bien fría en cualquier momento del día.",                    precio: 12000,  imagen: "img/cajaavenaautentica.jpeg" },
  { id: 11, nombre: "Caja de Avena Cubana",               presentacion: "Paquete X 8",          descripcion: "Avena cremosa y deliciosa, perfecta para disfrutar bien fría en cualquier momento del día.",                                  precio: 12000,  imagen: "img/cajaavenacubana.jpeg" },
  { id: 51, nombre: "Leche Litro", presentacion: "Unidad X 1000 ml", descripcion: "Leche fresca y nutritiva para disfrutar en cualquier momento.", precio: 4500,imagen: "img/litro.jpeg" },
  
  { id: 14, nombre: "Leche Megalitro", presentacion: "Unidad X 1100 ml", descripcion: "Leche fresca y nutritiva para disfrutar en cualquier momento.", precio: 5600, imagen: "img/megalitro.jpeg" },
  { id: 53, nombre: "Crema X 125", presentacion: "Unidad X 125 G", descripcion: "Leche fresca y nutritiva para disfrutar en cualquier momento.", precio: 3000, imagen: "img/crema125.jpeg" },
  { id: 15, nombre: "Leche Pequeña", presentacion: "Unidad X 200 ml", descripcion: "Leche práctica y deliciosa para disfrutar donde quieras.", precio: 1100, imagen: "img/pequeña.jpeg" },

  { id: 16, nombre: "Lengua", presentacion: "Paquete X 13", descripcion: "Delicioso producto ideal para disfrutar como acompañamiento.", precio: 3000, imagen: "img/lengua.jpeg" },

  { id: 17, nombre: "Maduro", presentacion: "Paquete X 13", descripcion: "Maduro delicioso, perfecto para acompañar tus comidas.", precio: 13000, imagen: "img/maduro.jpeg" },

  { id: 18, nombre: "Nacho", presentacion: "Paquete X 12", descripcion: "Crujientes y deliciosos nachos para disfrutar como pasabocas.", precio: 9000, imagen: "img/nacho.jpeg" },

  { id: 19, nombre: "Sueros Costeños 200G", presentacion: "Unidad X 200 G", descripcion: "Suero costeño cremoso y delicioso, ideal para acompañar tus comidas.", precio: 4000, imagen: "img/suero200.jpeg" },

  { id: 20, nombre: "Sueros Costeños 400G", presentacion: "Unidad X 400 G", descripcion: "Suero costeño cremoso y delicioso para compartir en familia.", precio: 8000, imagen: "img/suero400.jpeg" },

  { id: 21, nombre: "Tangelo", presentacion: "Paquete X 13", descripcion: "Delicioso producto para disfrutar en cualquier momento del día.", precio: 8000, imagen: "img/tangelo.jpeg" },

  { id: 22, nombre: "Tocineta", presentacion: "Paquete X 12", descripcion: "Deliciosa tocineta ideal para complementar tus preparaciones.", precio: 9000, imagen: "img/tocineta.jpeg" },

  { id: 23, nombre: "Tostada", presentacion: "Paquete X 13", descripcion: "Crujientes tostadas perfectas para acompañar tus comidas.", precio: 3000, imagen: "img/tostada.jpeg" },

  { id: 24, nombre: "Verdesitos", presentacion: "Paquete X 12", descripcion: "Delicioso producto ideal para disfrutar y compartir.", precio: 17500, imagen: "img/verdesitos.jpeg" },

  { id: 25, nombre: "Papa Limón", presentacion: "Paquete X 24", descripcion: "Crujientes papas con delicioso sabor a limón.", precio: 8000, imagen: "img/papalimon.jpeg" },

  { id: 26, nombre: "Papa Mayonesa", presentacion: "Paquete X 24", descripcion: "Deliciosas papas ideales para disfrutar como pasabocas.", precio: 8000, imagen: "img/papamayonesa.jpeg " },

  { id: 27, nombre: "Papas Pollo", presentacion: "Paquete X 24", descripcion: "Crujientes papas con delicioso sabor a pollo.", precio: 8000, imagen: "img/papapollo.jpeg" },

  { id: 28, nombre: "Picada", presentacion: "Paquete X 13", descripcion: "Una deliciosa combinación para compartir y disfrutar.", precio: 13000, imagen: "img/picadas.jpeg" },

  { id: 29, nombre: "Puritas", presentacion: "Paquete X 30", descripcion: "Deliciosas y prácticas para disfrutar en cualquier momento.", precio: 4500, imagen: "img/puritas.jpeg" },

  { id: 30, nombre: "Salchichón", presentacion: "Unidad X 900 G", descripcion: "Delicioso salchichón ideal para acompañar tus comidas.", precio: 7000, imagen: "img/salchichon.jpeg" },

  { id: 31, nombre: "Crema X 170", presentacion: "Unidad X 170 G", descripcion: "Cremosa y deliciosa, perfecta para tus recetas favoritas.", precio: 4100, imagen: "img/crema170.jpeg" },

  { id: 32, nombre: "Crema X 400", presentacion: "Unidad X 400 G", descripcion: "Cremosa y deliciosa, ideal para compartir y preparar tus recetas.", precio: 9000, imagen: "img/crema400.jpeg" },

  { id: 33, nombre: "Crema X 850 G", presentacion: "Unidad X 850 G", descripcion: "Crema de gran tamaño, ideal para tus preparaciones y recetas.", precio: 17700, imagen: "img/crema850.jpeg" },

  { id: 34, nombre: "Crispetas", presentacion: "Paquete X 30", descripcion: "Crujientes crispetas perfectas para disfrutar viendo tus películas favoritas.", precio: 11000, imagen: "img/crispetas.jpeg" },

  { id: 35, nombre: "Cuca Grande", presentacion: "Paquete X 13", descripcion: "Deliciosa galleta tradicional, perfecta para acompañar tu bebida favorita.", precio: 5700, imagen: "img/cucagrande.jpeg " },

  { id: 36, nombre: "Cuca Pequeña", presentacion: "Paquete X 13", descripcion: "Pequeña y deliciosa galleta tradicional para disfrutar a cualquier hora.", precio: 3000, imagen: "img/cucapequeña.jpeg" },

  { id: 37, nombre: "Yoguito", presentacion: "Paquete X 30", descripcion: "Delicioso y cremoso yoguito para disfrutar bien frío.", precio: 7000, imagen: "img/yoguito.jpeg" },

  { id: 38, nombre: "Yogurt Bolsa", presentacion: "Paquete X 6", descripcion: "Yogurt delicioso y refrescante, ideal para disfrutar en cualquier momento.", precio: 8500, imagen: "img/yogurt.jpeg" },

  { id: 39, nombre: "Paca de Leche Deslactosada", presentacion: "Paca X 6", descripcion: "Leche deslactosada ideal para disfrutar todos los días.", precio: 34100, imagen: "img/pacadeslactosada.jpeg" },

  { id: 40, nombre: "Leche Mediana", presentacion: "Unidad X 400 G", descripcion: "Leche de excelente calidad, perfecta para el consumo diario.", precio: 2200, imagen: "img/mediana.jpeg" },

  { id: 41, nombre: "Paca de Leche Megalitro", presentacion: "Paca X 6", descripcion: "Leche fresca y deliciosa en presentación de paca.", precio: 34200, imagen: "img/pacamegalitro.jpeg " },

  { id: 42, nombre: "Pan de 3000", presentacion: "Paquete X 13", descripcion: "Pan fresco y delicioso, perfecto para acompañar tus desayunos.", precio: 3000, imagen: "img/pan3000.jpeg" },

  { id: 43, nombre: "Pan de 500", presentacion: "Paquete X 5", descripcion: "Pan fresco y económico para disfrutar a cualquier hora.", precio: 400, imagen: "img/pan500.jpeg" },

  { id: 44, nombre: "Papa Chile", presentacion: "Paquete X 24", descripcion: "Crujientes papas con un delicioso toque de sabor a chile.", precio: 8000, imagen: "img/papachile.jpeg" },

  { id: 45, nombre: "Caja de Leche de Litro", presentacion: "Unidad X 1 L", descripcion: "Leche fresca y nutritiva, ideal para toda la familia.", precio: 5900, imagen: "img/cajalechedelitro.jpeg" },

  { id: 46, nombre: "Caja de Leche Deslactosada", presentacion: "Unidad X 1 L", descripcion: "Leche deslactosada, deliciosa y perfecta para disfrutar diariamente.", precio: 5900, imagen: "img/cajalechedeslactosada.jpeg" },

  { id: 47, nombre: "Crema Chantilly", presentacion: "Unidad X 250 G", descripcion: "Cremosa y deliciosa, ideal para decorar y acompañar tus postres.", precio: 16300, imagen: "img/cremachantilly.jpeg" },

  { id: 48, nombre: "Crema Institucional", presentacion: "Unidad X 1000 G", descripcion: "Crema de excelente calidad, ideal para preparaciones y recetas.", precio: 18500, imagen: "img/cremainstitucional.jpeg" },
  { id: 51, nombre: "Galleta Blanca", presentacion: "Paquete X 13", descripcion: "Deliciosa galleta tradicional, perfecta para acompañar tu bebida favorita.", precio: 5700, imagen: "img/galletablanca.jpeg" },
  { id: 54, nombre: "Galleta Roja", presentacion: "Paquete X 13", descripcion: "Deliciosa galleta tradicional, perfecta para acompañar tu bebida favorita.", precio: 3000, imagen: "img/galletaroja.jpeg" },
  { id: 55, nombre: "Gelatina Blanca", presentacion: "Paquete X 28", descripcion: "Delicioso dulce relleno, ideal para remedios.", precio: 8500, imagen: "img/gelatinablanca.jpeg" },
  { id: 56, nombre: "Leche Deslactosada Mediana", presentacion: "Unidad X 400 ml", descripcion: "Leche fresca y nutritiva para disfrutar en cualquier momento sin lactosa.", precio: 2100, imagen: "img/deslactosadamediana.jpeg" },

];
// Ordenar los productos alfabéticamente por nombre (A-Z)
PRODUCTOS.sort((a, b) =>
  a.nombre.localeCompare(b.nombre, "es") ||
  a.presentacion.localeCompare(b.presentacion, "es", { numeric: true })
);
