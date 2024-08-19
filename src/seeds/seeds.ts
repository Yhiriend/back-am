import connection from "../db/connection";

async function seedDatabase() {
  const conn = await connection;

  try {
    // Insertar datos en la tabla `category`
    await conn.query(`
      INSERT INTO \`category\` (\`id\`, \`name\`, \`description\`) VALUES
      (1, 'VISUAL MEMORY', 'Los juegos de esta categoría desafían y estimulan la capacidad cognitiva del jugador al requerir la retención y recuperación de información. Estos juegos son conocidos por mejorar la memoria a corto y largo plazo, la concentración y la atención. Los participantes deben recordar la ubicación de elementos específicos, patrones o secuencias presentados en el juego. Estos pueden incluir cartas, imágenes, números, o cualquier otro tipo de información visual o auditiva.'),
      (2, 'AUDITORY MEMORY', 'Este tipo de actividades se centra en el desarrollo y la estimulación de la memoria auditiva, una capacidad crucial para retener y recordar sonidos y secuencias de sonidos. Estas actividades están diseñadas para desafiar y fortalecer la capacidad del usuario para procesar y recordar información auditiva de manera efectiva. A través de juegos y ejercicios envolventes, los participantes podrán mejorar su memoria para sonidos, tonos y patrones auditivos, contribuyendo así al desarrollo general de sus habilidades cognitivas relacionadas con la percepción y el procesamiento auditivo.'),
      (3, 'SPATIAL PUZZLES', 'Esta categoría está dedicada a desafíos que estimulan y potencian las habilidades espaciales y la resolución de problemas. En estos ejercicios, los participantes se enfrentarán a laberintos y rompecabezas diseñados para fomentar el pensamiento espacial, la planificación estratégica y la capacidad de navegar a través de entornos complejos.');
    `);

    // Insertar datos en la tabla `activity`
    await conn.query(`
      INSERT INTO \`activity\` (\`id\`, \`category_id\`, \`name\`, \`description\`, \`instruction\`) VALUES
      (1, 1, 'MEMORAMA', 'En esta actividad los jugadores se enfrentan a un desafío diseñado para poner a prueba su capacidad de memoria visual. MEMORAMA presenta cartas distribuidas aleatoriamente, cada una con su pareja correspondiente. El objetivo es emparejar todas las cartas en el menor número de movimientos posible.', 'Voltea las Cartas: Pulsa sobre las cartas para voltearlas y revelar su contenido. Memoriza la ubicación de cada carta y su pareja correspondiente.\r\n\r\nEncuentra las Parejas: Encuentra los pares de cartas idénticas. Recuerda que cada carta tiene una pareja exacta en el tablero.\r\n\r\nMinimiza los Movimientos: El número de movimientos es crucial para alcanzar la puntuación objetivo. Intenta emparejar las cartas en el menor número de movimientos posible.\r\n\r\nObjetivo de Puntuación: Alcanza o supera la puntuación objetivo de 500 puntos para desbloquear el siguiente nivel y avanzar en el juego.'),
      (2, 1, 'ARMONÍA DEL COLOR', 'Esta actividad está diseñada para mejorar la memoria visual a través de desafíos de colores. Los jugadores se sumergirán en un entorno visualmente estimulante, donde la tarea principal es recordar y replicar secuencias de colores.', 'Al comenzar, los jugadores serán recibidos con una pantalla colorida y atractiva que les presenta el desafío por delante.\r\n\r\nCada nivel presentará una secuencia inicial de colores y formas en un patrón específico. Estos colores pueden aparecer en botones, bloques o cualquier otro elemento interactivo.\r\n\r\nLos jugadores deben prestar atención a la secuencia presentada y memorizar el orden en el que aparecen los colores. Cuanto más larga sea la secuencia, mayor será el nivel de dificultad.\r\n\r\nDespués de visualizar la secuencia, los jugadores deben replicarla tocando o seleccionando los elementos en el mismo orden que aparecieron inicialmente.\r\n\r\nA medida que avanzan en el juego, los jugadores enfrentarán secuencias más complejas y desafiantes. La velocidad y la cantidad de elementos en la secuencia aumentarán gradualmente.\r\n\r\nLos jugadores ganarán puntos por cada secuencia correctamente replicada. A medida que acumulan puntos, desbloquearán nuevos niveles y desafíos.'),
      (21, 3, 'LABERINTO DE ZEN', 'Sumérgete en un mundo lleno de intrincados pasillos, giros sorprendentes y desafíos estimulantes. Tu misión es navegar a través de un laberinto en constante cambio para llegar a la salida antes de que se agote el tiempo.', 'Tu misión es llegar a la salida del laberinto antes de que se agote el tiempo. Cada laberinto te presenta un conjunto único de desafíos que debes superar para llegar a la libertad.\r\n\r\nUtiliza las teclas de flecha o los controles táctiles para moverte por el laberinto.\r\nExplora cada pasillo y giro para descubrir la ruta más rápida hacia la salida.\r\n\r\nTu tiempo es limitado, ¡así que mantente alerta y avanza rápidamente! Cada nivel tiene su propio límite de tiempo, y superar el laberinto antes de que se agote es clave para la victoria.');
    `);

    // Insertar datos en la tabla `activity_levels`
    await conn.query(`
      INSERT INTO \`activity_levels\` (\`id\`, \`activity_id\`, \`level\`, \`target_points\`) VALUES
      (1, 1, 1, 500),
      (2, 1, 2, 500),
      (3, 1, 3, 500),
      (4, 1, 4, 500),
      (5, 1, 5, 500),
      (6, 1, 6, 500),
      (7, 1, 7, 500),
      (8, 1, 8, 500),
      (9, 1, 9, 500),
      (10, 1, 10, 500),
      (11, 2, 1, 500),
      (12, 2, 2, 500),
      (13, 2, 3, 500),
      (14, 2, 4, 500),
      (15, 2, 5, 500),
      (16, 2, 6, 500),
      (17, 2, 7, 500),
      (18, 2, 8, 500),
      (19, 2, 9, 500),
      (20, 2, 10, 500),
      (21, 21, 1, 500),
      (22, 21, 2, 500),
      (23, 21, 3, 500),
      (24, 21, 4, 500),
      (25, 21, 5, 500),
      (26, 21, 6, 500),
      (27, 21, 7, 500),
      (28, 21, 8, 500),
      (29, 21, 9, 500),
      (30, 21, 10, 500);
    `);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await conn.end();
  }
}

// Ejecutar la función de seed
seedDatabase();
