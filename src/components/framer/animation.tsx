import { useEffect } from 'react';
import { useAnimation, motion, AnimationControls, Variants } from 'framer-motion';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  variants: Variants;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className, variants }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  } as IntersectionOptions); // Ensure proper typings for useInView options

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls as AnimationControls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
