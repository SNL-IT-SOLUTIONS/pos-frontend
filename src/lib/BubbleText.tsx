import React from "react";
import styles from "./bubble.module.css";

interface BubbleTextProps {
    className?: string;
    text: string;
}

const BubbleText: React.FC<BubbleTextProps> = ({ className, text }) => {
    return (
        <h2 className={`hover:cursor-help text-center text-sm font-thin text-neutral-800 ${className ?? ""}`}>
            {text.split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    );
};

export default BubbleText;



// Usage Example

{/* 
    
<BubbleText
  className="fixed bottom-10 right-10 text-pretty max-w-lg"
  text="A Point of Sale (POS) system is a project designed to handle sales transactions, track inventory, and generate reports. Aims to make operations faster, more accurate, and efficient within a structured process."
/> 


*/}