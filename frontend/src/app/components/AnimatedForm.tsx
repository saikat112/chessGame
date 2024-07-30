"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedFormProps {
  children: React.ReactNode;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedForm;
