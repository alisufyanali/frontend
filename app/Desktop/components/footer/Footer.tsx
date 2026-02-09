import ContactInfo from './ContactInfo';
import LinkColumns from './LinkColumns';
import Newsletter from './Newsletter';
import FooterBanner from './FooterBanner';

export default function Footer() {
  const textStyle = {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '29px',
    letterSpacing: '0%',
  };

  const buttonColor = '#197B33';
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Banner placed above the main footer */}
      <div className="w-full">
        <FooterBanner />
      </div>
      
      {/* Icons Section */}
      <div className="me-bgcolor-g w-full p-6">
        <div className="flex justify-between items-center">
          {/* Div 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-2">
              {/* Replace with your image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center text-white px-2">
              Tell your customers about your shipping offer.
            </div>
          </div>

          {/* Div 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-2">
              {/* Replace with your image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center text-white px-2">
              Delivering on 11000+ Pincodes
            </div>
          </div>

          {/* Div 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-2">
              {/* Replace with your image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center text-white px-2">
              Tell your customers about your shipping offer.
            </div>
          </div>

          {/* Div 4 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-2">
              {/* Replace with your image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center text-white px-2">
              Tell your customers about your shipping offer.
            </div>
          </div>

          {/* Div 5 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-2">
              {/* Replace with your image */}
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center text-white px-2">
              Tell your customers about your shipping offer.
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <footer className="bg-white text-gray-900 px-6 sm:px-12 pt-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-8">
          <ContactInfo textStyle={textStyle} buttonColor={buttonColor}/>
          <LinkColumns textStyle={textStyle} buttonColor={buttonColor}/>
          <Newsletter textStyle={textStyle} buttonColor={buttonColor}/>
        </div>
        <div className="mt-5 p-2 border-t border-gray-300 text-center">
          <p style={textStyle}>
            ©2019-{currentYear} PansariInn. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}