# Moeketsi Junior Sillo - Personal Portfolio 🌐

This is my professional portfolio, showcasing my skills as a full-stack software developer. Built with **Next.js** and deployed on **Vercel**, it features a modern, responsive design with a contact form and resume download, demonstrating my expertise in creating user-centric web applications.

---

## 🚀 Project Overview

This portfolio highlights my technical abilities and professional journey. It’s designed for performance, accessibility, and visual appeal, serving as a platform to connect with potential employers and clients.

### 🔑 Key Features

- ✅ **Responsive Design**: Adapts to all devices using Tailwind CSS for a seamless user experience.  
- ✅ **Contact Form**: Sends messages to my email via Formspree, with a confirmation message for clarity.  
- ✅ **Resume Download**: Allows one-click access to my CV (PDF) using client-side JavaScript.  
- ✅ **Dynamic Animations**: Features smooth transitions with Framer Motion for an engaging interface.  
- ✅ **SEO-Optimized**: Leverages Next.js App Router for server-side rendering and search visibility.

---

## 📸 Screenshot

**Home page** showcasing my introduction, resume download, and responsive design.

> Screenshot file: ![Screenshot 2025-01-20 at 00 54 48](https://github.com/user-attachments/assets/a083b76e-2906-4a07-8cc6-1fcfffa38567)


---

## 🛠️ Technology Stack

- **Framework**: Next.js 15.1.5 (App Router)  
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Animations**: Framer Motion  
- **Form Handling**: [Formspree](https://formspree.io/f/xnndrwlw)  
- **Icons**: React Icons  
- **Deployment**: Vercel  
- **Version Control**: Git, GitHub  

---

## 🔧 Setup and Installation

### Prerequisites

- Node.js (v18 or higher)  
- npm (v9 or higher) or yarn  
- Formspree account *(optional for local testing, required for contact form submissions)*

### Local Development

Clone the repository:

```bash
git clone https://github.com/JuniorSillo/My-Personal-Portfolio.git
cd My-Personal-Portfolio
````

Install dependencies:

```bash
npm install
```

Configure Formspree:
The contact form uses [Formspree](https://formspree.io/f/xnndrwlw). Log in to Formspree to link submissions to `sillojunior8@gmail.com`.
*No environment variables are needed.*

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to:
([live demo](https://my-personal-portfolio-phi-five.vercel.app/))

---

## 🚀 Vercel Deployment

### Push to GitHub:

```bash
git push origin main
```

### Import to Vercel:

Log in to Vercel and import the GitHub repo:
`github.com/JuniorSillo/My-Personal-Portfolio`

### Configure settings:

* **Framework Preset**: Next.js
* **Root Directory**: `./`
* **Build Command**: `npm run build`
* **Output Directory**: `.next`

Deploy the app and test the contact form at your Vercel app URL.
Example: `https://your-vercel-app.vercel.app`

---

## 📖 Usage

* **Home Page**: Introduces my skills and offers a "Download CV" button for `Sillo_resume.pdf`.
* **Contact Page**: Submit name, email, phone, service, and message via Formspree with a 3-second confirmation.
* **Navigation**: Switch between Home, Contact, and other pages using the navbar.
* **Responsive Design**: Works across desktop, tablet, and mobile.

---

## 📂 Project Structure

```
My-Personal-Portfolio/
├── app/
│   ├── contact/
│   │   └── page.jsx           # Contact form with Formspree
│   ├── page.jsx               # Home page with resume download
│   └── layout.jsx             # Root layout
├── public/
│   └── Sillo_resume.pdf       # Resume file
├── components/
│   ├── Photo.jsx              # Profile photo
│   ├── Social.jsx             # Social media links
│   ├── Stats.jsx              # Statistics
│   └── ui/                    # UI components (Button, Input, Select, Textarea)
├── screenshots/
│   └── portfolio-home.png     # Portfolio screenshot
├── package.json               # Dependencies and scripts
└── README.md                  # This documentation
```

---

## 🤝 Contributing

To contribute:

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push to GitHub:

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

> Follow coding standards and include tests where relevant.

---

## 📫 Contact

I’m open to collaboration or freelance opportunities:

* **Email**: [sillojunior8@gmail.com](mailto:sillojunior8@gmail.com)
* **Phone**: (+27) 799 9930
* **Location**: Bloemfontein, South Africa
* **GitHub**: [JuniorSillo](https://github.com/JuniorSillo)

Use the contact form or email me directly.

---

## 📜 License

Licensed under the **MIT License**.
See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

* Built to showcase my full-stack development skills.
* Thanks to **Next.js**, **Tailwind CSS**, and **Formspree** for their robust tools.
