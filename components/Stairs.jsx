import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: "0%", // Ensure consistency
  },
};

const reverseIndex = (index, totalSteps) => totalSteps - index - 1;

const Stairs = () => {
  const totalSteps = 6;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {[...Array(totalSteps)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reverseIndex(index, totalSteps) * 0.1, // Stagger delay
          }}
          className={`absolute w-full h-[20px] bg-white`}
          style={{
            top: `${index * 20}px`, // Stagger positioning for visibility
            zIndex: reverseIndex(index, totalSteps), // Ensure proper layering
          }}
        />
      ))}
    </div>
  );
};

export default Stairs;
