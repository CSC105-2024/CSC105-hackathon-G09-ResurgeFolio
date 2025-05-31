export const Footer = () => {
  return (
    <footer id="about" className="bg-gray-800 text-gray-300 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-xl font-semibold text-white mb-4">About us</h5>
            <p className="text-sm mb-2">
              This website is anything for helping people to learn to create a perfected portfolio by learning from others' failure portfolio.
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ResurgeFolio. All rights reserved.
            </p>
          </div>
          <div>
            <h5 id="contact" className="text-xl font-semibold text-white mb-4">Contact us</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <a href="mailto:info@resurgefolia.com" className="hover:text-blue-400">info@resurgefolia.com</a>
              </li>
              <li className="flex items-center">
                <span>123-456-7890</span>
              </li>
              <li className="flex items-center">
                <span>123 Main St, Anytown, USA</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">How it work</a></li>
              <li><a href="#" className="hover:text-blue-400">Register</a></li>
            </ul>
             <div className="mt-4">
                <h5 className="text-xl font-semibold text-white mb-2">Follow Us</h5>
                <div className="flex space-x-4">
                    <a href="https://github.com/" className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.148 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};