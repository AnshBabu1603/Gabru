
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      question: "Can DeFakeX detect all types of deepfakes?",
      answer:
        "While we continuously update our models to detect the latest deepfake technologies, no system can guarantee 100% detection of all manipulated media. Very sophisticated deepfakes created with cutting-edge technology may sometimes be more challenging to detect."
    },
    {
      question: "Do I need special hardware to use DeFakeX?",
      answer:
        "No, DeFakeX runs in your web browser on most modern devices. For camera-based detection, you'll need a device with a webcam. For best performance, we recommend using an updated browser and a device manufactured within the last 4-5 years."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white mb-4 rounded-lg overflow-hidden border border-gray-200">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                <div className="flex items-start">
                  <span className="text-left font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                {faq.answer.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-2">{paragraph}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions? Contact our team at{" "}
            <a href="mailto:support@defakex.com" className="text-teal-600 hover:underline">
              support@defakex.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
