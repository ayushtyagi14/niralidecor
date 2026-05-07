export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Service-specific metadata
  const metadataMap = {
    'wedding': {
      title: 'Wedding Decor Services | Expert Wedding Decorators | Nirali Decor',
      description: 'Book premium wedding decor services and wedding decoration services by top wedding decorators in New Jersey for elegant and stress-free celebrations.',
    },
    'reception': {
      title: 'Wedding Reception Decor Services | Reception Decorations | Nirali Decor',
      description: 'Explore elegant wedding reception decor and reception decoration ideas. Elevate your wedding decor reception. Book your dream setup today.',
    },
    'vidhi-and-haldi': {
      title: 'Vidhi and Haldi Decoration Services | Wedding Decoration',
      description: 'Explore Haldi decoration services and Vidhi decoration services for traditional ceremonies. Create vibrant, elegant setups for your Haldi ceremony.',
    },
    'centerpiece': {
      title: 'Wedding Centerpieces | Centerpiece Decor Services | Nirali Decor',
      description: 'Book stunning wedding centerpieces and centerpiece decor for your big day. Custom floral styling and elegant table designs crafted to impress guests.',
    },
    'sangeet-and-garba': {
      title: 'Sangeet Decoration | Indian Wedding Stage Decoration | Nirali Decor',
      description: 'Explore sangeet decoration ideas with Indian wedding stage decoration and wedding Indian decoration themes for a colorful celebration.',
    },
  };
  
  const serviceMeta = metadataMap[slug];
  
  if (serviceMeta) {
    return {
      title: serviceMeta.title,
      description: serviceMeta.description,
    };
  }
  
  // Default metadata for other service pages
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} Decor Services | Nirali Decor`,
    description: `Professional ${slug.replace(/-/g, ' ')} decoration services by Nirali Decor. Indian wedding decor experts in New Jersey and Atlanta, GA.`,
  };
}

export default function ServiceSlugLayout({ children }) {
  return children;
}
