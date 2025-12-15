import { useState } from "react";
import PrivacyPolicyModal from "../PrivacyPolicyModal";
import TermsAndConditionsModal from "../TermsAndConditionsModal";

const Footer = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const linkColumns = [
    {
      title: "PRODUCTS",
      lists: [
        {
          name: "AI Nexus",
          link: "https://ai-nexus.thetehgroup.com",
        },
        {
          name: "NexusClub",
          link: "https://nexusclub.thetehgroup.com",
        },
        {
          name: "Nexus APAC",
          link: "https://nexus-apac.com",
        },
        {
          name: "TechFest",
          link: "https://techfest.hk",
        },
      ],
    },
    {
      title: "SERVICES",
      lists: [
        {
          name: "Lead Generation",
          link: "#",
        },
        {
          name: "Community Building",
          link: "#",
        },
        {
          name: "Event Management",
          link: "#",
        },
        {
          name: "Appointment Setting",
          link: "#",
        },
      ],
    },
    {
      title: "LOCATIONS",
      lists: [
        {
          name: "Hong Kong",
          link: "#",
        },
        {
          name: "Malaysia",
          link: "#",
        },
        {
          name: "Philippines",
          link: "#",
        },
        {
          name: "Indonesia",
          link: "#",
        },
        {
          name: "China",
          link: "#",
        }
      ],
    },
    {
      title: "CONTACT",
      lists: [
        {
          name: "Email",
          link: "mailto:hello@thetehgroup.com?subject=Ask%20About%20Teh%20Group&body=Hello%20The%20Teh%20Group%Team,%0D%0A%0D%0AI%20would%20like%20to%20ask%20for%20more%20information%20regarding%20your%20services.%0D%0A%0D%0AThank%20you.",
        },
        {
          name: "WhatsApp",
          link: "https://wa.me/85268019775?text=Hello%20The%20Teh%20Group%Team,%0A%0AI%20would%20like%20to%20ask%20for%20more%20information%20regarding%20your%20services.%0A%0AThank%20you.",
        },
      ],
    },
  ];

  const offices = [
    {
      name: "Indonesia",
      company: "PT TRIUMP EMINENT HUB",
      address: "Jalan Mampang Prpt. Raya Nomor 100 5, Desa/Kelurahan Tegal Parang, Kec. Mampang Prapatan, Kota Adm. Jakarta Selatan, Provinsi DKI Jakarta",
    },
    {
      name: "Hong Kong",
      company: "TRIUMP EMINENT HUB Sdn Bhd",
      address: "Room 2508, 25th Floor, Tower One Lippo Centre, No.89 Queensway, Hong Kong",
    },
    {
      name: "Malaysia",
      company: "TRIUMP EMINENT HUB Sdn Bhd",
      address: "Menara 1, Jalan Bangsar, KL Eco City, 59200 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/teh-group",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/tehgroupofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-blue-500/20 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-gray-200">
      {/* Galaxy/Andromeda Animation Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Stars Layer */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(150)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>

        {/* Galaxy Spiral Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] animate-galaxy-rotate">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.4)_0%,_rgba(59,130,246,0.3)_25%,_rgba(139,92,246,0.2)_50%,_transparent_70%)]" />
          </div>
        </div>

        {/* Nebula Clouds */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-[100px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-[90px] animate-pulse-slow" />
        </div>

        {/* Shooting Stars */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute h-[2px] w-16 bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star"
              style={{
                top: Math.random() * 80 + 10 + '%',
                left: -100 + 'px',
                animationDelay: Math.random() * 10 + 's',
                animationDuration: Math.random() * 2 + 1 + 's',
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Enhanced Multi-layer Glow Effect */}
              <div className="absolute -inset-8 rounded-full blur-3xl bg-[radial-gradient(circle,_rgba(16,185,129,0.9),_rgba(59,130,246,0.6),_rgba(139,92,246,0.4),_transparent_70%)] animate-pulse-glow" />
              <div className="absolute -inset-6 rounded-full blur-2xl bg-[radial-gradient(circle,_rgba(16,185,129,0.8),_rgba(59,130,246,0.5),_transparent_60%)] animate-pulse-glow-delayed" />
              <div className="absolute -inset-4 rounded-full blur-xl bg-[radial-gradient(circle,_rgba(16,185,129,1),_rgba(59,130,246,0.7),_transparent_50%)]" />

              {/* Logo Container with Enhanced Shadow */}
              <div className="float-logo relative w-24 h-24 rounded-full bg-slate-950/60 border-2 border-emerald-400/50 shadow-[0_0_60px_rgba(16,185,129,0.9),0_0_100px_rgba(59,130,246,0.6),0_0_140px_rgba(139,92,246,0.4)] flex items-center justify-center">
                <img
                  src="/images/brand-logo/teh-3d.webp"
                  alt="TEH Group logo"
                  className="drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  loading="lazy"
                />
              </div>
            </div>
            <span className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              TEH Group
            </span>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-slate-200/80 leading-relaxed">
            Connecting enterprises with verified decision-makers and creating strategic opportunities that fuel commercial performance across Asia Pacific.
          </p>
        </div>

        {/* Offices Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h4 className="text-2xl font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 mb-2">
              OFFICES
            </h4>
            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.name}
                className="relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20">
                {/* Glass card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <div className="space-y-3 relative z-10">
                  <div className="font-bold text-white text-lg mb-1">
                    {office.name}
                  </div>
                  <div className="text-sm text-emerald-300/90 font-medium">
                    {office.company}
                  </div>
                  <div className="text-sm text-slate-300/80 leading-relaxed pt-2 border-t border-white/10">
                    {office.address}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {linkColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-emerald-400 text-lg tracking-[0.25em]">
                {column.title}
              </h4>
              <ul className="space-y-3 text-sm text-slate-200/80">
                {column.lists.map((object) => (
                  <li key={object.name}>
                    <a
                      href={object.link}
                      className="block text-left transition-colors duration-300 hover:text-white">
                      {object.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/70 transition-colors duration-300 text-slate-200/80 hover:text-white"
                aria-label={social.name}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </button>
              <span className="text-slate-500">|</span>
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
                Terms & Conditions
              </button>
            </div>
            <div className="text-xs uppercase tracking-[0.1em] text-slate-400">
              © 2025 TEH Group. All rights reserved. Created with ❤
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
