import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  hover = true,
  style
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  className = "",
  style
}: AnimatedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export function AnimatedText({ 
  children, 
  className = "",
  delay = 0,
  style
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedIcon({ 
  children, 
  className = "",
  delay = 0
}: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        rotate: 6,
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function AnimatedStaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: AnimatedStaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStaggerItem({ 
  children, 
  className = ""
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MagneticButton({ 
  children, 
  className = "",
  style
}: MagneticButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      style={{
        ...style,
        cursor: 'pointer'
      }}
    >
      {children}
    </motion.div>
  );
}
