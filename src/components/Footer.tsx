
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-teal-400" />
                <a href="mailto:support@defakex.com" className="hover:text-teal-400 transition-colors">
                  support@defakex.com
                </a>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-teal-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
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
          
          <div>
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
            <p className="mt-4 text-gray-400">
              Stay updated with our latest developments and deepfake detection techniques.
            </p>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-gray-800">
          <p>&copy; {currentYear} DeFakeX. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">
            Helping combat misinformation with advanced AI technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
