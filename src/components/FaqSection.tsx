
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FaqSection = () => {
  const faqs = [
    {
      question: "How accurate is the detection?",
      answer:
        "Our system achieves 95-98% accuracy on standard benchmarks. Real-world performance may vary based on video quality, compression, and the sophistication of the deepfake technology used. Higher quality media generally yields more accurate results."
    },
    {
      question: "What file formats are supported?",
      answer:
        "Videos: MP4, AVI, MOV (up to 100MB)\nImages: JPG, PNG, WEBP (up to 20MB)\nWe recommend using the highest quality files available for best results."
    },
    {
      question: "Is my data stored or shared?",
      answer:
        "No. All processing happens in your browser or our secure servers with immediate deletion after analysis. We do not store, share, or use your media for any purpose beyond the immediate detection you request."
    },
    {
      question: "How does the detection technology work?",
      answer:
        "Our AI uses deep learning models trained on thousands of real and fake examples. It analyzes subtle inconsistencies in facial movements, lighting patterns, blending boundaries, and compression artifacts that are typically invisible to the human eye but present in manipulated media."
    },
    {
      question: "Can Gabru detect all types of deepfakes?",
      answer:
        "While we continuously update our models to detect the latest deepfake technologies, no system can guarantee 100% detection of all manipulated media. Very sophisticated deepfakes created with cutting-edge technology may sometimes be more challenging to detect."
    },
    {
      question: "Do I need special hardware to use Gabru?",
      answer:
        "No, Gabru runs in your web browser on most modern devices. For best performance, we recommend using an updated browser and a device manufactured within the last 4-5 years."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-white mb-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-start">
                      <span className="text-left font-medium group-hover:text-teal-600 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-2">{paragraph}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
