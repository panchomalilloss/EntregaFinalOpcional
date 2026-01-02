# Shader GLSL: Metaballs 3D con Raymarching e Interacción

Este proyecto presenta un sombreador (shader) de fragmentos avanzado escrito en **GLSL**. Utiliza la técnica de **Raymarching** para renderizar una escena 3D dinámica y reactiva en un entorno 2D, implementando conceptos de geometría implícita y modelos de iluminación avanzados.

## 🚀 Características Principales

* **Raymarching Engine**: Algoritmo de renderizado que atraviesa el espacio 3D píxel a píxel para encontrar intersecciones con volúmenes definidos matemáticamente.
* **SDF (Signed Distance Functions)**: Uso de funciones de distancia para definir esferas perfectas sin necesidad de polígonos o mallas.
* **Smooth Blending (Metaballs)**: Implementación de la función `smin` (mínimo suave) para fusionar dos esferas como si fueran fluidos o mercurio.
* **Cámara Orbital Interactiva**: Sistema de rotación basado en matrices (`mat3`) que permite al usuario orbitar la escena mediante el movimiento del ratón (`u_mouse`).
* **Sombras Suaves (Soft Shadows)**: Algoritmo de penumbra procedural que calcula la obstrucción de la luz de forma gradual.
* **Fondo Estelar Procedural**: Generación de un campo de estrellas infinito basado en ruido determinista y la dirección de los rayos.

---

## 🛠️ Detalles Técnicos

### 1. Iluminación y Materiales
El shader implementa un modelo de iluminación compuesto:
* **Difuso (Lambert)**: Determina la intensidad de la luz según la inclinación de la superficie.
* **Especular (Phong)**: Añade brillos de alta intensidad para simular superficies pulidas.
* **Iridiscencia**: El color del material varía en función de la normal del objeto y el tiempo (`u_time`).

### 2. Matemáticas Aplicadas
* **Matrices de Rotación**: Transformaciones lineales para rotar los vectores `ro` (origen del rayo) y `rd` (dirección del rayo).
* **Cálculo de Normales**: Derivación numérica de la superficie utilizando el gradiente del campo de distancias.
* **Corrección Gamma**: Ajuste final de color ($C_{out} = C_{in}^{1/2.2}$) para garantizar la fidelidad visual en monitores estándar.

---

## 🖥️ Cómo Visualizarlo

Para ejecutar este código, puedes utilizar el editor online de **The Book of Shaders**:

1.  Copia el código íntegro del archivo `.frag`.
2.  Accede a [editor.thebookofshaders.com](http://editor.thebookofshaders.com/).
3.  Pega el código en el editor.
4.  Interactúa con la escena moviendo el ratón sobre el canvas para rotar la cámara.

---

## 📂 Estructura del Código

* `mat3 rotY / rotX`: Generación de matrices para la transformación del espacio.
* `map(vec3 p)`: Función principal del mundo que describe la posición y comportamiento de los objetos.
* `shadow(vec3 ro, vec3 rd)`: Cálculo procedural de sombras proyectadas.
* `main()`: Punto de entrada que normaliza coordenadas, gestiona la cámara y realiza el loop de Raymarching.

---

**Autor:** Francisco Malillos Castellano
**Materia:** Informática Gráfica 
**Año:** 2026
