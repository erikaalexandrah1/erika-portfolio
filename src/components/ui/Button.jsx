import { motion } from "framer-motion";
import { useSceneTransition } from "../../App";

/**
 * Botón/enlace unificado del design system.
 *
 * - `to`   → navegación INTERNA con la transición de estrellas (SceneTransition).
 * - `href` → enlace EXTERNO (abre en pestaña nueva).
 * - `download` → descarga de archivo (mismo tab, sin transición).
 *
 * Micro-interacciones: crece en hover y se hunde en tap (spring).
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide " +
  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 select-none";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

const variants = {
  primary:
    "text-white bg-[linear-gradient(100deg,#5b6cff,#a25bff,#ff5fa8)] bg-[length:200%_100%] " +
    "shadow-[0_10px_34px_-10px_rgba(120,90,255,0.75)] hover:bg-[position:100%_0] hover:shadow-[0_14px_44px_-8px_rgba(255,95,168,0.65)]",
  secondary:
    "text-white border border-white/15 bg-white/[0.06] backdrop-blur hover:bg-white/[0.12] hover:border-white/30",
  ghost: "text-white/70 hover:text-white hover:bg-white/[0.06]",
};

const spring = { type: "spring", stiffness: 420, damping: 24 };

export default function Button({
  children,
  to,
  href,
  download,
  variant = "secondary",
  size = "md",
  className = "",
  onClick,
  ...rest
}) {
  const ctx = useSceneTransition();
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.96 },
    transition: spring,
  };

  // Descarga (CV): ancla normal con atributo download.
  if (download) {
    return (
      <motion.a href={href || to} download={download} onClick={onClick} className={cls} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  // Interno: dispara la transición de estrellas y navega por detrás del overlay.
  if (to) {
    const go = (e) => {
      e.preventDefault();
      onClick?.(e);
      if (ctx?.navigateWithTransition) ctx.navigateWithTransition(to);
      else window.location.href = to;
    };
    return (
      <motion.a href={to} onClick={go} className={cls} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  // Externo: pestaña nueva.
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cls}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  // Acción sin navegación.
  return (
    <motion.button onClick={onClick} className={cls} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}
