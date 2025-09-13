# Fin Africa Affordability Calculator

A modern, responsive loan affordability calculator built with Next.js 15, TypeScript, and Tailwind CSS. This application helps users determine their loan eligibility based on their income and monthly deductions, following Fin Africa's design system.

## Features

- **Real-time Calculation**: Instantly calculates loan eligibility based on user input
- **Form Validation**: Comprehensive input validation with error handling
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations during calculations
- **Currency Formatting**: Proper Kenyan Shilling (KES) formatting
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern UI**: Clean, professional design matching Fin Africa's brand

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites
- Bun 1.2.5 or later


### Installation

1. **Clone or download the project**
```
   # If using GitHub
   git clone https://github.com/chris-muiru/fin-affordability-calculator
   cd fin-affordability-calculator
   
   # Or download and extract the ZIP file
```

2. **Install dependencies**
```
   bun install
```

3. **Run the development server**
```
   bun run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```
# Build the application
bun run build

# Start the production server
bun run start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main affordability calculator page
├── components/
│   ├── ui/                  # shadcn/ui components (Button, Card, Input, Label)
├── lib/
│   └── utils.ts             # Utility functions (cn for class merging)
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Usage

### Basic Calculation

1. Enter your **Gross Monthly Income** in KES
2. Enter your **Total Monthly Deductions** (taxes, insurance, existing loans, etc.)
3. Click **"Calculate My Loan Eligibility"**
4. View your results including:
   - Net monthly income
   - Maximum loan amount (50% of net income)
   - Eligibility status
   - Next steps (if eligible)

### Loan Eligibility Criteria

- **Minimum loan amount**: KES 20,000
- **Maximum loan calculation**: 50% of net monthly income
- **Net income**: Gross income minus total deductions

## Customization

### Styling

The application uses Fin Africa's brand colors:
- **Primary Green**: `#00A859`
- **Hover Green**: `#008A4A`
- **Text Colors**: Slate variants for professional appearance

### API Integration

### Form Validation

## Deployment

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about this calculator:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ for Fin Africa
