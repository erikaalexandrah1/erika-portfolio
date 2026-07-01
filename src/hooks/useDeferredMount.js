import { useEffect, useState } from "react";

/**
 * Deja que el primer render y pintado ocurran antes de montar algo pesado
 * (p. ej. un Canvas 3D de Three.js). Devuelve `false` en el render inicial y
 * pasa a `true` cuando el hilo principal está libre tras el primer frame.
 *
 * Beneficio: el contenido (texto, layout) aparece al instante y el fondo 3D
 * entra un momento después, sin bloquear la carga inicial.
 */
export default function useDeferredMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    const schedule = window.requestIdleCallback
      ? (cb) => window.requestIdleCallback(cb, { timeout: 500 })
      : (cb) => setTimeout(cb, 200);
    const cancel = window.cancelIdleCallback || clearTimeout;

    // Esperar al primer frame pintado y luego a que el hilo esté ocioso.
    const rafId = requestAnimationFrame(() => {
      idleId = schedule(() => setReady(true));
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (idleId) cancel(idleId);
    };
  }, []);

  return ready;
}
