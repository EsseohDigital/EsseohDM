
import { ServiceCategory, ServicePageData, Testimonial, NavItem } from './types';
import { Wrench, Zap, Hammer, Sparkles, Shovel, Home, Droplet, Paintbrush, Layers, Key, AppWindow } from 'lucide-react';

export const APP_NAME = "WycombeLocalPros";

export const NAV_ITEMS: NavItem[] = [];

// Split into the "Big 3" shown in the middle section
export const MAIN_SERVICES: (ServiceCategory & { image: string })[] = [
  {
    id: 'roofing',
    title: 'Roofing',
    description: 'Expert roof repairs, replacements, and maintenance.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'plumbing',
    title: 'Plumbers',
    description: 'Emergency leaks, boiler servicing, and bathroom installs.',
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'electrical',
    title: 'Electricians',
    description: 'Safety inspections, rewiring, and lighting installation.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'
  }
];

// The "Other Services" section at the bottom
export const OTHER_SERVICES: (ServiceCategory & { image: string })[] = [
  {
    id: 'builders',
    title: 'Builders',
    description: 'Extensions, wall removals, and structural renovations.',
    iconName: 'Hammer',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'painters',
    title: 'Painters',
    description: 'Interior and exterior decorating and wallpapering.',
    iconName: 'Paintbrush',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'flooring',
    title: 'Flooring',
    description: 'Carpet, laminate, wood, and tile installations.',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    description: 'Regular house cleaning and deep cleans.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1714479120969-436c216a3cd4?q=80&w=173&auto=format&fit=crop'
  },
  {
    id: 'garden',
    title: 'Gardening',
    description: 'Lawn mowing, hedge trimming and clearance.',
    iconName: 'Shovel',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'window',
    title: 'Windows',
    description: 'Professional internal and external window cleaning.',
    iconName: 'AppWindow',
    image: 'https://images.unsplash.com/photo-1632927063333-df848f5f916a?fm=jpg&q=60&w=3000'
  },
  {
    id: 'locksmith',
    title: 'Locksmiths',
    description: 'Emergency entry, lock changes, and home security upgrades.',
    iconName: 'Key',
    image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=800'
  }
];

// All services for the dropdown
export const ALL_SERVICES = [...MAIN_SERVICES, ...OTHER_SERVICES];

// Specific job types for the quote form dropdown
export const SERVICE_SUBTYPES: Record<string, string[]> = {
  roofing: [
    'Roof Repair / Maintenance',
    'New Roof Installation',
    'Flat Roof Repair / Replacement',
    'Chimney Work',
    'Guttering, Fascias & Soffits',
    'Other'
  ],
  plumbing: [
    'Emergency Plumbing / Leak',
    'Boiler Service / Repair',
    'New Boiler Installation',
    'Bathroom Installation',
    'Blocked Drains / Toilet',
    'Radiators / Heating',
    'Other'
  ],
  electrical: [
    'Electrical Safety Check (EICR)',
    'Fuse Box / Consumer Unit',
    'Lighting Installation',
    'Rewiring',
    'Socket Installation',
    'EV Charger Installation',
    'Other'
  ],
  builders: [
    'House Extension',
    'Loft Conversion',
    'Garage Conversion',
    'Wall Removal / Internal Alterations',
    'Brickwork / Repointing',
    'New Build Construction',
    'Other'
  ],
  painters: [
    'Interior Painting (Walls/Ceilings)',
    'Exterior Painting',
    'Wallpapering',
    'Door & Skirting Painting',
    'Commercial Decorating',
    'Other'
  ],
  flooring: [
    'Carpet Fitting',
    'Laminate Flooring',
    'Real Wood / Engineered Wood',
    'Luxury Vinyl Tile (LVT)',
    'Floor Tiling',
    'Sanding & Refinishing',
    'Other'
  ],
  cleaning: [
    'Regular Weekly/Fortnightly Clean',
    'One-off Deep Clean',
    'End of Tenancy Clean',
    'Carpet Cleaning',
    'Oven Cleaning'
  ],
  garden: [
    'Lawn Mowing & General Maintenance',
    'Garden Clearance',
    'Hedge Trimming',
    'Patio / Driveway Cleaning',
    'Tree Surgery',
    'Landscaping / Design'
  ],
  window: [
    'External Window Cleaning',
    'Internal & External Cleaning',
    'Conservatory Cleaning',
    'Gutter Cleaning'
  ],
  locksmith: [
    'Emergency Door Opening',
    'Lock Change / Replacement',
    'Window Lock Repair',
    'uPVC Door Repair',
    'Smart Lock Installation',
    'Security Survey'
  ]
};

export const SERVICE_GUIDE_DATA: Record<string, ServicePageData> = {
  roofing: {
    id: 'roofing',
    title: 'Roofing',
    heroTitle: 'Prices & Costs for Roofing in High Wycombe',
    costRange: '£250 - £6,000+',
    costDescription: 'Minor repairs start from £150. Full replacements can range from £5,000 to £12,000 depending on materials and roof size.',
    factors: ['Type of roof (Tile, Slate, Flat)', 'Accessibility', 'Extent of damage', 'Materials used'],
    infoBoxText: 'Roofing costs in High Wycombe vary significantly based on the age of the property and the specific issue.',
    promiseText: 'We connect you with pre-vetted local experts who specialise in expert roof repairs and maintenance.',
    faqs: [
      {
        question: 'Do I need planning permission?',
        answer: 'Usually not for standard replacements, but conservation areas in Wycombe may have restrictions.'
      }
    ]
  },
  plumbing: {
    id: 'plumbing',
    title: 'Plumbing',
    heroTitle: 'Prices & Costs for Plumbing in High Wycombe',
    costRange: '£80 - £450',
    costDescription: 'Standard call-outs typically cost £80-£120 per hour. Boiler services are around £90.',
    factors: ['Emergency vs Scheduled', 'Parts required', 'Accessibility', 'System type'],
    infoBoxText: 'Emergency plumbers often charge a premium for out-of-hours calls in the HP area.',
    promiseText: 'Our network of Gas Safe registered engineers ensures safety and quality work for every plumbing job.',
    faqs: []
  },
  electrical: {
    id: 'electrical',
    title: 'Electrical',
    heroTitle: 'Prices & Costs for Electricians in High Wycombe',
    costRange: '£150 - £800',
    costDescription: 'Minor work like adding a socket costs £100-£150. Consumer unit replacements average £500-£800.',
    factors: ['Wiring condition', 'Certification requirements', 'Number of circuits', 'Wall chasing'],
    infoBoxText: 'Always ensure your electrician provides a Part P certificate for major electrical work.',
    promiseText: 'Safety first. We connect you with NAPIT or NICEIC registered electricians.',
    faqs: []
  },
  builders: {
    id: 'builders',
    title: 'Builders',
    heroTitle: 'Prices & Costs for Building Work in High Wycombe',
    costRange: '£1,500 - £50,000+',
    costDescription: 'Structural wall removals often start from £1,500. Extensions typically cost between £1,800 and £2,500 per square metre in High Wycombe.',
    factors: ['Structural complexity', 'Materials', 'Building control fees', 'Ground conditions'],
    infoBoxText: 'Large projects in Buckinghamshire often require planning permission and architect drawings before construction starts.',
    promiseText: 'From small renovations to large extensions, we match you with reliable local builders who understand Wycombe property types.',
    faqs: [
      {
        question: 'How long does an extension take?',
        answer: 'A standard single-storey extension usually takes 8-12 weeks from foundations to finish.'
      },
      {
        question: 'Do you handle planning permission?',
        answer: 'Most of our builders can recommend local architects or handle the submission of plans to Wycombe District Council.'
      }
    ]
  },
  painters: {
    id: 'painters',
    title: 'Painters & Decorators',
    heroTitle: 'Prices & Costs for Painting in High Wycombe',
    costRange: '£250 - £3,500',
    costDescription: 'Painting a single medium room (walls & ceiling) typically costs £250-£450. Full exterior painting for a 3-bed semi ranges from £1,500 to £2,800.',
    factors: ['Surface preparation needed', 'Paint quality', 'Room height/accessibility', 'Wallpaper stripping'],
    infoBoxText: 'Preparation is 70% of a good paint job. High-quality trade paints used by pros will last much longer than DIY equivalents.',
    promiseText: 'Transform your home with professional decorators who take pride in a flawless finish and clean workspace.',
    faqs: [
      {
        question: 'Is paint included in the quote?',
        answer: 'Usually, decorators will quote for labor and materials separately or provide a total price including high-quality trade paint.'
      }
    ]
  },
  flooring: {
    id: 'flooring',
    title: 'Flooring',
    heroTitle: 'Prices & Costs for Flooring in High Wycombe',
    costRange: '£20 - £90 /sqm',
    costDescription: 'Carpet fitting averages £15-£25 per sqm. High-end engineered wood or tiling can range from £60 to £120 per sqm including subfloor prep.',
    factors: ['Subfloor condition', 'Material type', 'Room shape/waste', 'Furniture removal'],
    infoBoxText: 'Don\'t forget to factor in the cost of underlay and door trimming, which are often charged as extras.',
    promiseText: 'Get the perfect finish underfoot. We connect you with local flooring specialists for carpet, wood, and tile.',
    faqs: [
      {
        question: 'Can you install over existing flooring?',
        answer: 'It depends on the material, but usually, old carpet or tiles must be removed to ensure a level and long-lasting finish.'
      }
    ]
  },
  cleaning: {
    id: 'cleaning',
    title: 'Domestic Cleaning',
    heroTitle: 'Prices & Costs for House Cleaning in High Wycombe',
    costRange: '£16 - £25 /hr',
    costDescription: 'Regular weekly cleans typically range from £16 to £20 per hour.',
    factors: ['Frequency', 'Property size', 'Pets', 'Deep clean requirements'],
    infoBoxText: 'Independent cleaners in Wycombe often use your supplies to keep costs down.',
    promiseText: 'Enjoy a spotless home with trusted, vetted local cleaners.',
    faqs: []
  },
  garden: {
    id: 'garden',
    title: 'Garden Maintenance',
    heroTitle: 'Prices & Costs for Gardeners in High Wycombe',
    costRange: '£20 - £45 /hr',
    costDescription: 'Maintenance like lawn mowing starts from £20/hr. Tree work is quoted as a fixed price.',
    factors: ['Garden size', 'Condition', 'Waste removal', 'Tools needed'],
    infoBoxText: 'Waste removal is often a key cost factor for gardening jobs in Wycombe.',
    promiseText: 'From regular lawn care to full clearances, find local gardeners.',
    faqs: []
  },
  window: {
    id: 'window',
    title: 'Window Cleaning',
    heroTitle: 'Prices & Costs for Window Cleaning in High Wycombe',
    costRange: '£15 - £60',
    costDescription: 'External clean for a 3-bed semi-detached costs £15-£25.',
    factors: ['Number of windows', 'Accessibility', 'Conservatories', 'Frequency'],
    infoBoxText: 'Most modern cleaners use the "Reach and Wash" pure water system.',
    promiseText: 'Get sparkling windows with reliable local window cleaners.',
    faqs: []
  },
  locksmith: {
    id: 'locksmith',
    title: 'Locksmith Services',
    heroTitle: 'Prices & Costs for Locksmiths in High Wycombe',
    costRange: '£75 - £200',
    costDescription: 'Emergency call-outs (gain entry) typically cost £85-£120. Standard Euro cylinder lock replacements start from £75 including parts.',
    factors: ['Time of day (Emergency/Out of hours)', 'Lock standard (BS3621)', 'Number of locks', 'Door type (uPVC vs Timber)'],
    infoBoxText: 'Always check if your insurance policy requires British Standard (BS3621) locks on external doors.',
    promiseText: 'Regain access and secure your home with vetted, local locksmiths available 24/7.',
    faqs: [
      {
        question: 'Is there a call-out charge?',
        answer: 'Most emergency locksmiths charge a call-out fee, especially for out-of-hours work. Ask for a total estimate before booking.'
      },
      {
        question: 'Do you repair uPVC door locks?',
        answer: 'Yes, our specialists deal with jammed mechanisms and gearboxes on uPVC doors daily.'
      }
    ]
  }
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Sarah M.', location: 'Downley - HP13 • Roofing', text: "Sorted the slipped slate straight away. Immense relief.", rating: 5 },
  { id: 't2', name: 'James T.', location: 'Hazlemere - HP15 • Plumbing', text: "Fixed the boiler for a fair price too.", rating: 5 },
  { id: 't3', name: 'Emily R.', location: 'Flackwell Heath - HP10 • Cleaning', text: "The kitchen hasn't looked this clean in years! Highly recommend.", rating: 5 },
];

export const getIconComponent = (name: string) => {
  switch (name) {
    case 'Zap': return Zap;
    case 'Hammer': return Hammer;
    case 'Shovel': return Shovel;
    case 'Home': return Home;
    case 'Wrench': return Wrench;
    case 'Sparkles': return Sparkles;
    case 'Paintbrush': return Paintbrush;
    case 'Layers': return Layers;
    case 'Droplet': return Droplet;
    case 'Key': return Key;
    case 'AppWindow': return AppWindow;
    default: return Wrench;
  }
};
