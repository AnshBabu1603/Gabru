
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-to" className="hover:text-teal-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-gray-800">
          <p>&copy; {currentYear} Gabru. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">
            Helping combat misinformation with advanced AI technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
