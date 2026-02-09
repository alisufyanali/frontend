interface LinkColumnsProps {
  textStyle: React.CSSProperties;
  buttonColor: string;
}

const linkGroups = [
  {
    title: 'Quick Links',
    links: ['About Us', 'Our Story', 'Ingredients', 'Blog', 'Careers']
  },
  {
    title: 'Shop',
    links: ['Skincare', 'Haircare', 'Oils', 'Supplements', 'Best Sellers']
  },
  {
    title: 'Customer Service',
    links: ['Track Order', 'Returns', 'Shipping Info', 'FAQs']
  }
];

export default function LinkColumns({ textStyle, buttonColor }: LinkColumnsProps) {
  return (
    <div className="md:w-1/3 flex flex-col sm:flex-row justify-between gap-6">
      {linkGroups.map((group) => (
        <div key={group.title}>
          <h4 
            className="text-sm font-bold mb-3 whitespace-nowrap" 
            style={{ 
              fontFamily: 'Poppins',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}
          >
            {group.title}
          </h4>
          <ul className="space-y-1">
            {group.links.map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  style={{ 
                    ...textStyle, 
                    fontSize: '14px',
                    letterSpacing: '0.1px',
                    fontWeight: 400,
                    lineHeight: '1.3'
                  }} 
                  className="hover:text-[#197B33] transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}