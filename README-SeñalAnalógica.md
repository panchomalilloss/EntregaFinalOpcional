# Emulador de Señal Analógica CRT y Glitch Art en GLSL

Este proyecto implementa un sombreador de fragmentos (fragment shader) de alta complejidad que simula las aberraciones físicas y electrónicas de un monitor de rayos catódicos (CRT) de los años 80, integrando técnicas modernas de manipulación de dominios y ruido procedural.

## 🛠️ Especificaciones Técnicas

El shader se basa en la manipulación dinámica de las coordenadas UV y la síntesis de color no lineal. A diferencia de un renderizado estándar, este código procesa cada píxel para introducir imperfecciones cinemáticas calculadas matemáticamente.

### Funcionalidades Avanzadas Implementadas:

1.  **Distorsión de Lente (Spherize)**: Mediante una función de potencia no lineal, se transforma el plano cartesiano en una superficie convexa, simulando la curvatura del cristal de un monitor antiguo.
2.  **Domain Warping & Glitch**: Utilización de la función `onOff` para generar ráfagas de interferencia aleatoria. Esto desplaza horizontalmente bloques de píxeles basándose en una función de ruido `noise` determinista.
3.  **Aberración Cromática Dinámica**: Separación de los canales RGB en función del tiempo y el desplazamiento de los píxeles, simulando el desajuste de los cañones de electrones.
4.  **Simulación de Fósforo y Barrido**: 
    * **Scanlines**: Líneas de barrido horizontales que dependen de la resolución vertical.
    * **V-Sync Bar**: Una barra de refresco que recorre la pantalla simulando el ciclo de escaneo de la señal analógica.
5.  **Ruido de Señal (Snow/Grain)**: Implementación de ruido blanco pseudo-aleatorio para simular interferencia electromagnética de radiofrecuencia.

---

## 🔬 Análisis de las Funciones Principales

* **`curve(vec2 uv)`**: Aplica álgebra vectorial para curvar el espacio de coordenadas. Es el corazón de la estética "ojo de pez" del monitor.
* **`onOff(float a, float b, float c)`**: Un generador de señales lógicas basado en ondas senoidales. Determina cuándo ocurren los fallos de señal ("glitches") de forma orgánica y no repetitiva.
* **`noise(vec2 p)`**: Algoritmo de generación de ruido aleatorio basado en el producto punto (`dot product`) y la parte fraccionaria de una función trigonométrica de alta frecuencia.

---

## 🚀 Instrucciones de Visualización

1.  Acceda al editor de [The Book of Shaders](http://editor.thebookofshaders.com/).
2.  Elimine el código preexistente y pegue el contenido del archivo `.frag`.
3.  Observe la interacción de la luz y el ruido. La escena generada internamente demuestra la capacidad de la GPU para sintetizar imágenes complejas sin necesidad de texturas externas.

---

## 🎓 Objetivos Académicos Alcanzados
* Comprensión de la arquitectura de la GPU y el pipeline de renderizado.
* Manipulación avanzada de sistemas de coordenadas.
* Implementación de algoritmos de post-procesado en tiempo real.
* Uso de funciones matemáticas para la simulación de fenómenos físicos analógicos.

---

**Autor:** Francisco Malillos Castellano
**Materia:** Informática Gráfica 
**Año:** 2026
