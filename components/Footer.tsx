import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const siteUrl = 'https://rosarynow.com'; 

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            &copy; {currentYear} Rosary Now. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-3">Share:</span>
            <div className="flex space-x-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${siteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out Rosary Now: ${siteUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}