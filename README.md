# AO Gym - Modern Fitness Website

A fast, modern, and fully responsive gym website built with vanilla HTML, CSS, and JavaScript. Features beautiful animations, dark/light mode toggle, interactive program selection, and comprehensive membership management.

## 🌟 Features

### Design & User Experience
- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Modern Glassmorphism UI** - Beautiful visual effects and smooth animations
- **WCAG AA Accessibility** - Keyboard navigation, screen reader support, and high contrast mode
- **Smooth Animations** - GSAP-powered scroll animations and micro-interactions

### Functionality
- **Interactive Program Filtering** - Filter fitness programs by category
- **Plan Queue System** - Add programs to cart with quantity management
- **Form Validation** - Real-time validation for membership and contact forms
- **Toast Notifications** - User-friendly feedback system
- **Scroll Progress Bar** - Visual indication of page scroll progress
- **Active Navigation** - Automatic highlighting based on scroll position

### Performance & SEO
- **Optimized Loading** - Preloaded fonts and efficient CSS/JS structure
- **SEO Optimized** - Meta tags, Open Graph, sitemap.xml, and robots.txt
- **Progressive Enhancement** - Works without JavaScript for core functionality
- **Reduced Motion Support** - Respects user accessibility preferences

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or Download** the project files to your local machine
2. **Open the project** in your preferred code editor
3. **Serve the files** using a local web server:

#### Option 1: Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option 2: Using Node.js (if installed)
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server
```

#### Option 3: Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

4. **Open your browser** and navigate to `http://localhost:8000` (or the port shown)

## 📁 Project Structure

```
AO-Gym/
├── index.html              # Main HTML file
├── styles.css              # Core CSS styles and design system
├── styles-extended.css     # Additional component styles
├── script.js               # JavaScript functionality
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Web crawler instructions
└── README.md              # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: `#C87B3A` (Caramel/Energy)
- **Primary Hover**: `#A7632E`
- **Background (Dark)**: `#0B0A09`
- **Surface (Dark)**: `#171311` / `#1F1A17`
- **Text Primary (Dark)**: `#ECE7E1`
- **Text Muted (Dark)**: `#B7A99A`
- **Accent**: `#7C3F00` (Espresso/Burnt)

### Typography
- **Headings**: Poppins (700/600)
- **Body Text**: Inter (400/500)
- **Monospace**: JetBrains Mono (optional)

### Spacing & Layout
- **Container Max Width**: 1200px
- **Section Padding**: 5rem vertical
- **Border Radius**: 16px (cards), 9999px (pills)

## 🛠️ Customization

### Updating Content

#### Programs
Edit the `programs` array in `script.js`:
```javascript
const programs = [
    {
        id: 1,
        title: "Your Program Name",
        category: "strength", // strength, cardio, crossfit, yoga, personal
        description: "Program description...",
        duration: "60 min",
        level: "Beginner", // Beginner, Intermediate, Advanced, All Levels
        price: 45,
        sessions: 12
    }
    // Add more programs...
];
```

#### Trainers
Edit the `trainers` array in `script.js`:
```javascript
const trainers = [
    {
        id: 1,
        name: "Trainer Name",
        specialty: "Specialization",
        experience: "X years",
        bio: "Trainer biography...",
        initials: "TN" // Used for avatar display
    }
    // Add more trainers...
];
```

#### Contact Information
Update contact details in `index.html` within the contact section.

#### Membership Plans
Modify pricing cards in `index.html` within the membership section.

### Styling Changes

#### Colors
Update CSS custom properties in `styles.css`:
```css
:root {
    --primary: #your-color;
    --primary-hover: #your-hover-color;
    /* Update other colors as needed */
}
```

#### Fonts
Change font imports in `index.html` and update CSS variables:
```css
:root {
    --font-heading: 'Your-Font', sans-serif;
    --font-body: 'Your-Font', sans-serif;
}
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments
3. Configure custom domain if needed

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Traditional Web Hosting
1. Upload all files to your web server via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Update the sitemap.xml with your actual domain

## 🔧 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Mobile-first CSS approach
- Touch-friendly button sizes (minimum 44px)
- Optimized mobile navigation
- Responsive typography scaling
- Mobile-specific plan queue behavior

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizing
2. **Minify Files**: Minify CSS and JavaScript for production
3. **Enable Compression**: Use gzip compression on your server
4. **Cache Headers**: Set appropriate cache headers for static assets
5. **CDN**: Consider using a CDN for faster global delivery

## 🔍 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured data markup ready
- XML sitemap
- Robots.txt file
- Fast loading times
- Mobile-friendly design

## 🎯 Analytics Integration

To add Google Analytics:
1. Get your GA4 tracking ID
2. Add the tracking script to `index.html` before closing `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- **Email**: info@aogym.com
- **Phone**: +252 61 234 5678
- **Location**: Mogadishu, Somalia

## 🔄 Version History

- **v1.0.0** - Initial release with full functionality
  - Dark/Light mode toggle
  - Responsive design
  - Interactive program filtering
  - Plan queue system
  - Form validation
  - GSAP animations
  - SEO optimization

---

**Built with ❤️ for AO Gym by Ahmed Osman**
