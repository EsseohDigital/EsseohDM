import React, { ReactNode } from 'react';

// Domain Entities
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping string name to icon component
  popular?: boolean;
}

export interface ServicePageData {
  id: string;
  title: string;
  heroTitle: string;
  costRange: string;
  costDescription: string;
  factors: string[];
  infoBoxText: string;
  promiseText: string;
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface NavItem {
  label: string;
  href: string;
}

// Form Types
export interface ContactFormState {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

export interface FormStatus {
  success: boolean;
  message: string | null;
}

// UI Component Props
export interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: 'white' | 'gray' | 'brand';
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
}