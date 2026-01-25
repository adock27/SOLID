# 🛡️ Sistema de Personajes RPG - SOLID con TypeScript

Este proyecto implementa un sistema robusto de héroes y habilidades diseñado bajo los principios **SOLID**, utilizando **TypeScript** y **Node v22.21.1**. El objetivo es demostrar cómo crear código desacoplado, escalable y fácil de mantener.

## 🚀 Tecnologías y Herramientas
* **Node.js v22.21.1**: Motor de ejecución (Modo ESModules).
* **TypeScript 5.x**: Tipado estático para un desarrollo seguro.
* **tsx**: Ejecución directa de archivos `.ts` sin pasos intermedios.
* **Nodemon**: Automatización del entorno de desarrollo.

---

## 🏗️ Arquitectura del Sistema

La estructura sigue una separación clara de responsabilidades:

- **Core**: Interfaces (contratos) y Entidades (lógica de negocio).
- **Abilities**: Implementaciones concretas de habilidades (fuego, espada, pasivas).
- **Shared**: Servicios transversales como el Logger.
- **Factory**: Centralización de la creación de instancias.



---

## 💎 Implementación de Principios SOLID

### 1. S - Single Responsibility (Responsabilidad Única)
Cada clase tiene un único propósito. El `Heroe` gestiona su estado de combate, mientras que el `Logger` se encarga de la comunicación con la consola y la `Factory` de la creación de objetos.

### 2. O - Open/Closed (Abierto/Cerrado)
El sistema está **abierto para su extensión pero cerrado para su modificación**. Para añadir una nueva habilidad (ej. "Rayo de Hielo"), solo se crea una nueva clase que implemente la interfaz correspondiente, sin tocar la clase `Heroe`.

### 3. L - Liskov Substitution (Sustitución de Liskov)
Se garantiza que cualquier subclase o implementación sea intercambiable por su base.
* **Solución:** Separamos `IHabilidadActiva` de `IHabilidadPasiva` para asegurar que el `Heroe` nunca intente ejecutar una acción en una habilidad que no la posee.

### 4. I - Interface Segregation (Segregación de Interfaz)
Diseñamos interfaces pequeñas y específicas.
* **Ejemplo:** `IHabilidadMagica` extiende de la base para añadir `costeMana`. Así, las habilidades físicas no se ven obligadas a implementar propiedades de magia que no usan.

### 5. D - Dependency Inversion (Inversión de Dependencias)
El `Heroe` depende de abstracciones (`IHabilidad`), no de clases concretas. Las dependencias se inyectan en tiempo de ejecución.
* **Implementación:** Uso de `HabilidadFactory` para desacoplar el punto de entrada (`main.ts`) de las clases de habilidades.



---

## 🛠️ Patrones y Técnicas Utilizadas

* **Factory Pattern**: Centraliza la lógica de instanciación, permitiendo cambiar el "cómo" se crea una habilidad en un solo lugar.
* **Type Guarding**: Funciones de predicado (`h is IHabilidadMagica`) para manejar el polimorfismo de forma segura en TypeScript.
* **Inyección de Dependencias**: Las habilidades se pasan al héroe vía métodos o constructor, permitiendo cambiar su comportamiento dinámicamente.

---

## 🏃 Cómo ejecutar el proyecto

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Iniciar modo desarrollo (con Nodemon):**
    ```bash
    npm run dev
    ```

3.  **Ejecución única:**
    ```bash
    npm start
    ```

---

## 📈 Próximos Pasos
- [ ] Implementar el **Patrón Observer** para un sistema de logros automático.
- [ ] Añadir persistencia de datos para guardar el estado del héroe.
- [ ] Crear una interfaz de comandos para turnos de combate.

---
*Desarrollado como ejercicio práctico de patrones de diseño y arquitectura limpia.*