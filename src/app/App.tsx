import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Phone, MapPin, Clock, Star, ChevronRight, ChevronLeft,
  Menu, X, Calendar, Shield, Award, Users,
  CheckCircle, Heart, ArrowRight, Instagram, Facebook,
  Mail, AlertTriangle, ChevronDown, Printer, Copy, Check,
  Smile, Zap, Search
} from "lucide-react";

// ─── Clinic Constants ─────────────────────────────────────────────────────────

const CLINIC = {
  name: "Fastident",
  fullName: "Fastident Dental Clinic",
  tagline: "Clear, gentle dental care in Ipaja.",
  address: "Suite 4, All Seasons Plaza, Federal Junction, 1st Avenue, Gowon Estate, Ipaja Ayobo Road, Ipaja, Lagos",
  shortAddress: "Gowon Estate, Ipaja, Lagos",
  phone1: "09063768685",
  phone1Display: "0906 376 8685",
  phone2: "09063898915",
  phone2Display: "0906 389 8915",
  whatsapp: "2349063768685",
  instagram: "https://www.instagram.com/fastident",
  facebook: "https://www.facebook.com/fastident",
  hoursLabel: "Mon to Sat, 8:00 AM to 6:00 PM",
  email: "hello@fastident.com.ng",
};

// ─── Services Data ────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "general", title: "General Dental Care", icon: "general", desc: "Check-ups, X-rays, and preventive care for children and adults.", expect: "A full oral exam, any needed X-rays, and a clear treatment plan.", price: "From ₦5,000", category: "general", featured: true },
  { id: "extractions", title: "Tooth Extractions", icon: "extractions", desc: "Safe removal of damaged, decayed, or impacted teeth.", expect: "Local anaesthesia, careful treatment, and simple aftercare instructions.", price: "From ₦8,000", category: "general", featured: false },
  { id: "cleaning", title: "Professional Teeth Cleaning", icon: "cleaning", desc: "A deep clean to remove plaque, tartar, and surface build-up.", expect: "Scaling, polishing, and advice on keeping your teeth clean at home.", price: "From ₦6,000", category: "preventive", featured: true },
  { id: "whitening", title: "Teeth Whitening", icon: "whitening", desc: "Professional whitening for a brighter smile.", expect: "An assessment first, then in-clinic treatment or take-home guidance.", price: "From ₦25,000", category: "cosmetic", featured: true },
  { id: "replacement", title: "Missing Tooth Replacement", icon: "replacement", desc: "Options to replace one or more missing teeth and restore function.", expect: "A review of the best option for you, whether bridge, denture, or implant.", price: "From ₦80,000", category: "restorative", featured: false },
  { id: "fillings", title: "Tooth Fillings", icon: "fillings", desc: "Tooth-coloured fillings for cavities and small repairs.", expect: "A numbed area if needed, gentle treatment, and a smooth finish.", price: "From ₦7,000", category: "restorative", featured: false },
  { id: "orthodontics", title: "Teeth Alignment & Orthodontics", icon: "orthodontics", desc: "Treatment for crowding, gaps, and bite issues.", expect: "An assessment, impressions, and a realistic treatment timeline.", price: "From ₦150,000", category: "orthodontic", featured: true },
  { id: "odour", title: "Management of Mouth Odour", icon: "odour", desc: "Treatment to find and manage the cause of persistent bad breath.", expect: "A diagnosis visit, cleaning if needed, and follow-up advice.", price: "From ₦8,000", category: "general", featured: false },
  { id: "implants", title: "Dental Implants", icon: "implants", desc: "A fixed replacement option for missing teeth.", expect: "A staged treatment plan with placement, healing time, and final fitting.", price: "From ₦250,000", category: "restorative", featured: false },
  { id: "incision", title: "Incision & Drainage", icon: "incision", desc: "Urgent treatment for dental abscesses and oral infections.", expect: "Same-day attention where possible, pain relief, and follow-up care.", price: "From ₦10,000", category: "emergency", featured: false },
  { id: "scaling", title: "Scaling & Polishing", icon: "scaling", desc: "Removal of tartar and stains around the teeth and gumline.", expect: "Scaling, polishing, and a cleaner, fresher mouth after treatment.", price: "From ₦6,000", category: "preventive", featured: false },
  { id: "fluoride", title: "Fluoride Therapy", icon: "fluoride", desc: "Fluoride application to help protect enamel.", expect: "A quick, painless treatment often recommended for children or sensitive teeth.", price: "From ₦3,000", category: "preventive", featured: false },
  { id: "rootcanal", title: "Root Canal Treatment", icon: "rootcanal", desc: "Treatment to save an infected tooth and reduce pain.", expect: "Local anaesthesia, cleaning of the canal, and sealing of the tooth.", price: "From ₦30,000", category: "restorative", featured: false },
  { id: "bridges", title: "Dental Bridges", icon: "bridges", desc: "A fixed option to close the gap from missing teeth.", expect: "Impressions, temporary support if needed, and final fitting.", price: "From ₦60,000", category: "restorative", featured: false },
  { id: "pfm", title: "Porcelain Fused to Metal Crowns", icon: "pfm", desc: "Strong crowns designed to protect and restore damaged teeth.", expect: "Preparation, impressions, and a permanent crown fitted after review.", price: "From ₦40,000", category: "restorative", featured: false },
  { id: "dentures", title: "Removable Partial Dentures", icon: "dentures", desc: "Custom partial dentures to improve chewing and appearance.", expect: "Impressions, fitting appointments, and adjustments for comfort.", price: "From ₦45,000", category: "restorative", featured: false },
];

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  general: <Heart size={18} className="text-primary" />,
  extractions: <AlertTriangle size={18} className="text-primary" />,
  cleaning: <CheckCircle size={18} className="text-primary" />,
  whitening: <Star size={18} className="text-primary" />,
  replacement: <Smile size={18} className="text-primary" />,
  fillings: <Shield size={18} className="text-primary" />,
  orthodontics: <Users size={18} className="text-primary" />,
  odour: <Zap size={18} className="text-primary" />,
  implants: <Award size={18} className="text-primary" />,
  incision: <AlertTriangle size={18} className="text-primary" />,
  scaling: <CheckCircle size={18} className="text-primary" />,
  fluoride: <Shield size={18} className="text-primary" />,
  rootcanal: <Heart size={18} className="text-primary" />,
  bridges: <CheckCircle size={18} className="text-primary" />,
  pfm: <Award size={18} className="text-primary" />,
  dentures: <Smile size={18} className="text-primary" />,
};

function ServiceIcon({ icon, className = "" }: { icon: string; className?: string }) {
  return (
    <div className={`w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0 ${className}`}>
      {SERVICE_ICON_MAP[icon] ?? <Heart size={18} className="text-primary" />}
    </div>
  );
}

function WhatsAppBrandIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return <WhatsAppIcon className={className} sx={{ fontSize: size }} />;
}

// ─── Testimonials Data ────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { id: 1, name: "Adaobi Chukwu", rating: 5, text: "I was nervous before my appointment, but the team explained everything clearly and made me feel calm. The whitening result looked natural and I was happy with it.", service: "Teeth Whitening", initials: "AC" },
  { id: 2, name: "Emeka Okonkwo", rating: 5, text: "The clinic was clean, the treatment was gentle, and the price was explained before we started. I went in for scaling and polishing and the whole visit was smooth.", service: "Scaling & Polishing", initials: "EO" },
  { id: 3, name: "Funmilayo Adeyemi", rating: 5, text: "I came in with serious pain on a Saturday and they attended to me quickly. The root canal was done the same day and I left feeling much better.", service: "Root Canal Treatment", initials: "FA" },
  { id: 4, name: "Tobi Fashola", rating: 5, text: "The dentist explained my filling in simple terms and the appointment did not feel rushed. I liked how organised and tidy everything was.", service: "Tooth Filling", initials: "TF" },
  { id: 5, name: "Chisom Eze", rating: 5, text: "I went for an orthodontic consultation and got a clear breakdown of my options and costs. It was easy to understand and helped me decide on the next step.", service: "Orthodontics", initials: "CE" },
  { id: 6, name: "Bimpe Oluwafemi", rating: 5, text: "I have been coming here for years because the care is consistent. Appointments start on time, the clinic stays clean, and the staff are easy to talk to.", service: "General Dental Care", initials: "BO" },
];

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const GALLERY = [
  { id: 1, category: "whitening", label: "Teeth Whitening", type: "after", img: "https://images.unsplash.com/photo-1758598304384-1f678eabdd4f?w=600&h=450&fit=crop&auto=format", alt: "Patient after teeth whitening treatment showing bright white smile" },
  { id: 2, category: "whitening", label: "Teeth Whitening", type: "before-after", img: "https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?w=600&h=450&fit=crop&auto=format", alt: "Dramatic smile transformation after professional whitening" },
  { id: 3, category: "clinic", label: "Our Clinic", type: "interior", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=450&fit=crop&auto=format", alt: "Modern dental treatment room at Fastident Dental Clinic" },
  { id: 4, category: "clinic", label: "Our Clinic", type: "interior", img: "https://images.unsplash.com/photo-1782397132123-0166b524d6bc?w=600&h=450&fit=crop&auto=format", alt: "Clean and modern examination room at Fastident" },
  { id: 5, category: "clinic", label: "Reception", type: "interior", img: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=600&h=450&fit=crop&auto=format", alt: "Welcoming reception area at Fastident Dental Clinic" },
  { id: 6, category: "team", label: "Our Team", type: "team", img: "https://images.unsplash.com/photo-1685022036574-12bffde5e2b7?w=600&h=450&fit=crop&auto=format", alt: "Fastident dental team members in the clinic" },
  { id: 7, category: "team", label: "Our Team", type: "team", img: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=600&h=450&fit=crop&auto=format", alt: "Professional medical team at Fastident" },
  { id: 8, category: "alignment", label: "Alignment", type: "after", img: "https://images.unsplash.com/photo-1561742026-3d197ef0fb54?w=600&h=450&fit=crop&auto=format", alt: "Beautiful smile result after orthodontic alignment treatment" },
  { id: 9, category: "equipment", label: "Equipment", type: "equipment", img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=600&h=450&fit=crop&auto=format", alt: "Fastident dentist using modern professional dental equipment" },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "Do you accept walk-in patients?", a: "Yes, we accept walk-ins during working hours, Monday to Saturday, 8AM to 6PM. Booking ahead is still the best way to reduce waiting time, especially for longer treatments. Emergency cases are treated as a priority." },
  { q: "How much do treatments cost?", a: "Prices start from General check-up ₦5,000, Cleaning ₦6,000, Tooth filling ₦7,000, Whitening ₦25,000, Root canal ₦30,000, and Implants ₦250,000. Final cost depends on your needs and will be explained before treatment starts." },
  { q: "Do you accept HMO or insurance?", a: "Yes, we accept selected HMO plans. Please call us on 0906 376 8685 or send a WhatsApp message before your visit to confirm your specific plan is accepted. We are continually expanding our HMO partnerships." },
  { q: "I am very anxious about dental visits. Can you help?", a: "Yes. Dental anxiety is common and we take time to explain each step before treatment starts. If you need a pause during the appointment, we slow down and work at your pace." },
  { q: "What should I expect on my first visit?", a: "Your first visit includes an oral examination, any needed X-rays, and time to discuss your concerns and medical history. Most first appointments take about 45 to 60 minutes. If you take regular medication, bring a list with you." },
  { q: "How do I manage pain after a procedure?", a: "We provide detailed aftercare instructions after every procedure. Most treatments require only standard over-the-counter pain relief (like paracetamol or ibuprofen). We will prescribe medication if necessary and are always reachable by phone or WhatsApp if you have concerns after leaving." },
  { q: "Can I bring my children?", a: "Yes. We welcome patients of all ages, including young children. Many families visit us together, and we make appointments as calm and simple as possible for first-time young patients." },
  { q: "How do I cancel or reschedule my appointment?", a: "Call us on 0906 376 8685 or send a WhatsApp message at least 24 hours before your appointment. We understand that plans change, and we will always try to find you an alternative time that works." },
  { q: "Do you offer family or group packages?", a: "Yes. We offer a Family Care Package for households booking 3 or more members. Ask at reception or mention it when booking." },
];

// ─── Hero Slides ──────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { img: "https://images.unsplash.com/photo-1777444969135-caf869407707?w=1920&h=1080&fit=crop&auto=format", label: "Expert Diagnostics" },
  { img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&h=1080&fit=crop&auto=format", label: "Modern Treatment Rooms" },
  { img: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1920&h=1080&fit=crop&auto=format", label: "Welcoming Environment" },
  { img: "https://images.unsplash.com/photo-1685022036574-12bffde5e2b7?w=1920&h=1080&fit=crop&auto=format", label: "Our Care Team" },
  { img: "https://images.unsplash.com/photo-1782397132123-0166b524d6bc?w=1920&h=1080&fit=crop&auto=format", label: "Clinical Excellence" },
];

// ─── Utility Helpers ─────────────────────────────────────────────────────────

function generateRef(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `FDC-${date}-${rand}`;
}

function validateNigerianPhone(v: string): boolean {
  return /^(0[789][01]\d{8}|(\+234)[789][01]\d{8})$/.test(v.replace(/\s/g, ""));
}

function generateDates(): { date: Date; label: string; shortLabel: string }[] {
  const days: { date: Date; label: string; shortLabel: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < 14) {
    const dow = d.getDay();
    if (dow !== 0) {
      days.push({
        date: new Date(d),
        label: d.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" }),
        shortLabel: d.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const ALL_TIMES = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM"];

function slotsForDate(dateStr: string): { time: string; booked: boolean }[] {
  const seed = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return ALL_TIMES.map((time, i) => ({ time, booked: ((seed + i * 7) % 5 === 0) }));
}

// ─── Small Components ─────────────────────────────────────────────────────────

type BtnVariant = "primary" | "accent" | "outline" | "ghost" | "white";
function Btn({ children, variant = "primary", className = "", onClick, type = "button", disabled = false }: {
  children: React.ReactNode; variant?: BtnVariant; className?: string;
  onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<BtnVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-secondary",
    white: "bg-white text-primary hover:bg-secondary shadow-sm hover:shadow-md",
  };
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"} />
      ))}
    </div>
  );
}

function SectionTitle({ label, title, subtitle, center = false }: { label?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {label && <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">{label}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed" style={{ marginLeft: center ? "auto" : undefined, marginRight: center ? "auto" : undefined }}>{subtitle}</p>}
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center"
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M19 4C13.5 4 10 8 10 13c0 3.5 1.5 6 3 8.5C15 25 16 28 16.5 33a2.5 2.5 0 005 0C22 28 23 25 25 21.5c1.5-2.5 3-5 3-8.5C28 8 24.5 4 19 4z" fill="white" fillOpacity="0.9" />
          </svg>
        </motion.div>
          <div className="text-center">
          <div className="text-white font-bold text-3xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident</div>
            <div className="text-white/60 text-sm font-medium mt-1 tracking-wide">Dental Clinic, Ipaja Lagos</div>
        </div>
        <motion.div
          className="mt-4 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "About", page: "about" },
  { label: "Gallery", page: "gallery" },
  { label: "Testimonials", page: "testimonials" },
  { label: "Contact", page: "contact" },
  { label: "FAQ", page: "faq" },
];

function Header({ page, setPage, openBooking }: {
  page: string; setPage: (p: string) => void; openBooking: (service?: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: string) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-[72px] flex items-center justify-between gap-4">
          <button onClick={() => navigate("home")} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7 2 5 4.5 5 7c0 2 .8 3.5 1.7 5C7.5 13.5 8 15.5 8.3 18a1.7 1.7 0 003.4 0c.3-2.5.8-4.5 1.6-6C14.2 10.5 15 9 15 7c0-2.5-2-5-5-5z" fill="white" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident</span>
              <span className="hidden sm:block text-xs text-muted-foreground">Dental Clinic</span>
            </div>
          </button>

          <nav className="hidden xl:flex items-center gap-1 rounded-full border border-border bg-background/80 p-1">
            {NAV_LINKS.map(l => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${page === l.page ? "text-primary bg-secondary" : "text-foreground/70 hover:text-primary hover:bg-secondary"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="hidden 2xl:flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              <Phone size={14} /> {CLINIC.phone1Display}
            </a>
            <Btn variant="accent" onClick={() => openBooking()} className="hidden sm:inline-flex text-sm px-5 py-2.5 whitespace-nowrap">
              Book Visit
            </Btn>
            <button
              className="xl:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative ml-auto w-full max-w-[320px] h-full bg-white flex flex-col shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-bold text-foreground text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident</span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted"><X size={20} /></button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {NAV_LINKS.map(l => (
                  <button
                    key={l.page}
                    onClick={() => navigate(l.page)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${page === l.page ? "text-primary bg-secondary" : "text-foreground hover:bg-muted"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-border flex flex-col gap-2">
                <Btn variant="accent" onClick={() => { setMobileOpen(false); openBooking(); }} className="w-full justify-center">
                  Book Visit
                </Btn>
                <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="flex items-center justify-center gap-2 py-2.5 text-sm text-primary font-medium">
                  <Phone size={14} /> {CLINIC.phone1Display}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage, openBooking }: { setPage: (p: string) => void; openBooking: () => void }) {
  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7 2 5 4.5 5 7c0 2 .8 3.5 1.7 5C7.5 13.5 8 15.5 8.3 18a1.7 1.7 0 003.4 0c.3-2.5.8-4.5 1.6-6C14.2 10.5 15 9 15 7c0-2.5-2-5-5-5z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Dental care for individuals and families in Ipaja, with clear pricing and a calm, tidy clinic experience.
          </p>
          <div className="flex gap-3">
            <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Instagram size={16} />
            </a>
            <a href={CLINIC.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Facebook size={16} />
            </a>
            <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <WhatsAppBrandIcon size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map(l => (
              <li key={l.page}>
                <button onClick={() => navigate(l.page)} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="flex items-start gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                <Phone size={14} className="mt-0.5 shrink-0 text-accent" /> {CLINIC.phone1Display}
              </a>
            </li>
            <li>
              <a href={`tel:+234${CLINIC.phone2.slice(1)}`} className="flex items-start gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                <Phone size={14} className="mt-0.5 shrink-0 text-accent" /> {CLINIC.phone2Display}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                <span className="mt-0.5 shrink-0 text-accent"><WhatsAppBrandIcon size={16} /></span> WhatsApp Us
              </a>
            </li>
            <li>
              <a href={`mailto:${CLINIC.email}`} className="flex items-start gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                <Mail size={14} className="mt-0.5 shrink-0 text-accent" /> {CLINIC.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-white/60 text-sm">
              <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>{CLINIC.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Opening Hours</h4>
          <table className="text-sm w-full">
            <tbody>
              {[["Monday", "8:00 AM to 6:00 PM"], ["Tuesday", "8:00 AM to 6:00 PM"], ["Wednesday", "8:00 AM to 6:00 PM"], ["Thursday", "8:00 AM to 6:00 PM"], ["Friday", "8:00 AM to 6:00 PM"], ["Saturday", "8:00 AM to 5:00 PM"], ["Sunday", "Closed"]].map(([d, h]) => (
                <tr key={d} className={`border-b border-white/8 ${d === "Sunday" ? "text-white/30" : "text-white/60"}`}>
                  <td className="py-1.5 pr-4 font-medium">{d}</td>
                  <td className="py-1.5">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={openBooking} className="mt-5 w-full py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors cursor-pointer">
            Book Visit
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-white/40 text-xs px-4">
        © {new Date().getFullYear()} Fastident Dental Clinic | Suite 4, All Seasons Plaza, Gowon Estate, Ipaja, Lagos
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Button ─────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${CLINIC.whatsapp}?text=Hello%20Fastident%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-40 flex items-center gap-2.5 bg-[#25D366] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-3 text-sm transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Chat with Fastident on WhatsApp"
    >
      <WhatsAppBrandIcon size={20} className="shrink-0" />
      <span className="hidden sm:block">Chat with Us</span>
    </motion.a>
  );
}

// ─── Emergency Modal ──────────────────────────────────────────────────────────

function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Dental Emergency?</h3>
            <p className="text-sm text-muted-foreground">Call us directly for urgent care.</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-muted"><X size={18} /></button>
        </div>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          For severe pain, dental trauma, a knocked-out tooth, or major swelling, do not wait for an online booking. Call the clinic directly for immediate help.
        </p>
        <div className="flex flex-col gap-2.5">
          <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="flex items-center justify-center gap-2.5 bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-colors text-base">
            <Phone size={18} /> Call {CLINIC.phone1Display}
          </a>
          <a href={`https://wa.me/${CLINIC.whatsapp}?text=EMERGENCY%3A%20I%20need%20urgent%20dental%20care%20now.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1da851] transition-colors text-base">
            <WhatsAppBrandIcon size={18} /> WhatsApp Emergency
          </a>
          <a href={`tel:+234${CLINIC.phone2.slice(1)}`} className="flex items-center justify-center gap-2 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-colors text-sm">
            <Phone size={15} /> Alternate: {CLINIC.phone2Display}
          </a>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Open Monday to Saturday, 8:00 AM to 6:00 PM<br />For after-hours emergencies, WhatsApp is monitored.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Patient Portal Modal ─────────────────────────────────────────────────────

function PatientPortalModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | "found" | "notfound">(null);

  const lookup = () => {
    if (!validateNigerianPhone(phone)) { setError("Enter a valid Nigerian phone number (e.g. 0803 123 4567)"); return; }
    setError("");
    setTimeout(() => setResult("found"), 800);
  };

  const MOCK_APPT = { date: "Wednesday, 9 July 2025", time: "10:00 AM", service: "Scaling & Polishing", ref: "FDC-20250709-3847" };

  return (
    <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Patient Portal</h3>
            <p className="text-sm text-muted-foreground">Look up your upcoming appointment</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X size={18} /></button>
        </div>
        {result === null && (
          <>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Enter the phone number you used to book and we will show your upcoming appointment. No account required.</p>
            <div className="mb-3">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value); setError(""); }}
                placeholder="e.g. 0906 376 8685"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted"
              />
              {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
            </div>
            <Btn variant="primary" onClick={lookup} className="w-full justify-center">
              <Search size={15} /> Look Up Appointment
            </Btn>
          </>
        )}
        {result === "found" && (
          <div>
            <div className="bg-secondary rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 text-primary font-semibold mb-3 text-sm"><CheckCircle size={16} /> Upcoming Appointment Found</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{MOCK_APPT.service}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{MOCK_APPT.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{MOCK_APPT.time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ref</span><span className="font-mono text-xs text-primary">{MOCK_APPT.ref}</span></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">To reschedule or cancel, call {CLINIC.phone1Display} or WhatsApp us with your reference number.</p>
            <div className="flex gap-2">
              <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="flex-1 flex items-center justify-center gap-1.5 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-muted transition-colors"><Phone size={14} /> Call</a>
              <a href={`https://wa.me/${CLINIC.whatsapp}?text=I%20need%20to%20reschedule%20appointment%20${MOCK_APPT.ref}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#1da851] transition-colors"><WhatsAppBrandIcon size={16} /> WhatsApp</a>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

interface BookingState {
  service: string;
  date: string;
  dateLabel: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  isReturning: boolean;
  notes: string;
  consent: boolean;
  ref: string;
}

function BookingModal({ onClose, preService }: { onClose: () => void; preService?: string }) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const dates = generateDates();

  const [data, setData] = useState<BookingState>({
    service: preService || "",
    date: "",
    dateLabel: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    isReturning: false,
    notes: "",
    consent: false,
    ref: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingState, string>>>({});

  const slots = data.date ? slotsForDate(data.date) : [];

  const update = (k: keyof BookingState, v: string | boolean) => {
    setData(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: "" }));
  };

  const validateStep2 = () => {
    if (!data.date) { setErrors({ date: "Please select a date." }); return false; }
    if (!data.time) { setErrors({ time: "Please select a time slot." }); return false; }
    return true;
  };

  const validateStep3 = () => {
    const e: typeof errors = {};
    if (!data.name.trim() || data.name.trim().length < 2) e.name = "Enter your full name.";
    if (!validateNigerianPhone(data.phone)) e.phone = "Enter a valid Nigerian phone number.";
    if (data.email && !/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) e.email = "Enter a valid email address.";
    if (!data.consent) e.consent = "Please agree to the privacy policy to proceed.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !data.service) { setErrors({ service: "Please select a service." }); return; }
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      update("ref", generateRef());
    }
    setStep(s => s + 1);
  };

  const selectedService = SERVICES.find(s => s.id === data.service);

  const copyRef = () => {
    navigator.clipboard.writeText(data.ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printConfirmation = () => window.print();

  return (
    <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step < 4 ? onClose : undefined} />
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        initial={{ scale: 0.93, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
          <div>
            <h3 className="font-bold text-base" style={{ fontFamily: "Outfit, sans-serif" }}>Book Visit</h3>
            <p className="text-xs text-muted-foreground">Step {Math.min(step, 4)} of 4 | {["Select Service", "Choose Date and Time", "Your Details", "Confirmation"][Math.min(step, 4) - 1]}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X size={18} /></button>
        </div>

        {/* Progress */}
        <div className="px-5 sm:px-6 pt-4">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-accent" : "bg-muted"}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">What service are you booking?</p>
              <div className="grid gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { update("service", s.id); setErrors({}); }}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${data.service === s.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40 hover:bg-muted"}`}
                  >
                    <ServiceIcon icon={s.icon} className="w-10 h-10 rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm text-foreground block">{s.title}</span>
                      <span className="text-xs text-muted-foreground">{s.price}</span>
                    </div>
                    {data.service === s.id && <CheckCircle size={16} className="text-primary shrink-0" />}
                  </button>
                ))}
              </div>
              {errors.service && <p className="text-red-600 text-xs mt-2">{errors.service}</p>}
            </div>
          )}

          {/* Step 2: Date + Time */}
          {step === 2 && (
            <div>
              <div className="mb-5">
                <p className="text-sm font-medium text-foreground mb-2">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map(d => {
                    const ds = d.date.toISOString().split("T")[0];
                    return (
                      <button
                        key={ds}
                        onClick={() => { update("date", ds); update("dateLabel", d.label); update("time", ""); }}
                        className={`shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl border-2 text-xs transition-all cursor-pointer ${data.date === ds ? "border-primary bg-secondary text-primary" : "border-border hover:border-primary/40"}`}
                      >
                        <span className="font-semibold">{d.date.toLocaleDateString("en-NG", { weekday: "short" })}</span>
                        <span className="text-muted-foreground">{d.date.getDate()} {d.date.toLocaleDateString("en-NG", { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
              </div>

              {data.date && (
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm font-medium text-foreground">Select Time</p>
                    <span className="text-xs text-accent font-medium">Live availability</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {slots.map(({ time, booked }) => (
                      <button
                        key={time}
                        disabled={booked}
                        onClick={() => update("time", time)}
                        className={`py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer disabled:cursor-not-allowed ${booked ? "bg-muted text-muted-foreground line-through opacity-50" : data.time === time ? "bg-primary text-white shadow-sm" : "border border-border hover:border-primary/60 hover:bg-secondary text-foreground"}`}
                      >
                        {booked ? "Taken" : time}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="text-red-600 text-xs mt-2">{errors.time}</p>}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Full Name *</label>
                <input type="text" value={data.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Adaobi Chukwu" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Phone Number * <span className="font-normal text-muted-foreground">(Nigerian format)</span></label>
                <input type="tel" value={data.phone} onChange={e => update("phone", e.target.value)} placeholder="e.g. 0803 123 4567" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Email Address <span className="font-normal text-muted-foreground">(optional, for confirmation)</span></label>
                <input type="email" value={data.email} onChange={e => update("email", e.target.value)} placeholder="e.g. you@example.com" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Are you a returning patient?</label>
                <div className="flex gap-2">
                  {[["Yes, I have visited before", true], ["No, this is my first visit", false]].map(([label, val]) => (
                    <button key={String(val)} onClick={() => update("isReturning", val as boolean)} className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-medium transition-all cursor-pointer ${data.isReturning === val ? "border-primary bg-secondary text-primary" : "border-border hover:border-primary/40"}`}>
                      {label as string}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Specific concern or note <span className="font-normal text-muted-foreground">(optional)</span></label>
                <textarea value={data.notes} onChange={e => update("notes", e.target.value)} placeholder="e.g. I have a broken tooth on the lower left, sensitive to cold..." rows={3} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted resize-none" />
              </div>
              <div className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-colors cursor-pointer ${errors.consent ? "border-red-300 bg-red-50" : "border-border hover:border-primary/40"}`} onClick={() => update("consent", !data.consent)}>
                <div className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors mt-0.5 ${data.consent ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                  {data.consent && <Check size={12} className="text-white" />}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I consent to Fastident Dental Clinic collecting and processing my personal and health-related information for the purpose of my dental appointment. My data will be kept private, stored securely, and never shared without my permission. <button className="text-primary underline" onClick={e => e.stopPropagation()}>Privacy Policy</button>.
                </p>
              </div>
              {errors.consent && <p className="text-red-600 text-xs">{errors.consent}</p>}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-5 p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle size={24} className="text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">Booking Confirmed</p>
                  <p className="text-xs text-green-600">You will receive a reminder 24 hours before your appointment.</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-5 mb-4 print:border print:border-gray-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <span className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident Dental Clinic</span>
                  <span className="font-mono text-xs text-primary bg-secondary px-2.5 py-1 rounded-full">{data.ref}</span>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Patient</span><span className="font-medium">{data.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{data.phone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selectedService?.title}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{data.dateLabel}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{data.time}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium text-right">Suite 4, All Seasons Plaza,<br />Gowon Estate, Ipaja</span></div>
                </div>
                <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                  Please arrive 5 minutes early. Bring this confirmation if possible.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <button onClick={copyRef} className="flex-1 flex items-center justify-center gap-1.5 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                  {copied ? <><Check size={14} className="text-green-600" /> Copied</> : <><Copy size={14} /> Copy Ref</>}
                </button>
                <button onClick={printConfirmation} className="flex-1 flex items-center justify-center gap-1.5 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                  <Printer size={14} /> Print
                </button>
                <a href={`https://wa.me/${CLINIC.whatsapp}?text=I%20just%20booked%20appointment%20${data.ref}%20at%20Fastident.%20Ref%3A%20${data.ref}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#1da851] transition-colors">
                  <WhatsAppBrandIcon size={16} /> Share
                </a>
              </div>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                To <strong>reschedule or cancel</strong>, call {CLINIC.phone1Display} or WhatsApp us with your reference number at least 24 hours before your appointment.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="px-5 sm:px-6 py-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {step > 1 && <Btn variant="outline" onClick={() => setStep(s => s - 1)} className="px-5">Back</Btn>}
            <Btn variant="accent" onClick={next} className="flex-1 justify-center">
              {step === 3 ? "Confirm Booking" : "Continue"} <ArrowRight size={15} />
            </Btn>
          </div>
        )}
        {step === 4 && (
          <div className="px-5 sm:px-6 py-4 border-t border-border">
            <Btn variant="primary" onClick={onClose} className="w-full justify-center">Done</Btn>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero({ openBooking }: { openBooking: () => void }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => setCurrent(c => (c + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, 5500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, advance]);

  useEffect(() => {
    HERO_SLIDES.forEach(s => { const img = new Image(); img.src = s.img; });
  }, []);

  return (
    <section
      className="relative min-h-[640px] md:min-h-[760px] overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={slide.img} alt={slide.label} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="inline-block bg-accent/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Ipaja, Lagos | Open Mon to Sat
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5 max-w-4xl mx-auto" style={{ fontFamily: "Outfit, sans-serif" }}>
            Dental care you can<br />
            <span className="text-accent">feel good about</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Fastident offers clear pricing, experienced care, and a calm clinic environment for patients in Ipaja and across Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Btn variant="accent" onClick={openBooking} className="text-base px-8 py-4">
              <Calendar size={18} /> Book Visit
            </Btn>
            <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-full px-8 py-4 text-base hover:bg-white/25 transition-colors">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); if (timerRef.current) clearTimeout(timerRef.current); }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 text-white items-center justify-center hover:bg-white/25 transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % HERO_SLIDES.length)} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 text-white items-center justify-center hover:bg-white/25 transition-colors">
        <ChevronRight size={20} />
      </button>
    </section>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────

function TrustBadges() {
  const badges = [
    { icon: <Award size={22} className="text-primary" />, number: "8+", label: "Years in Practice" },
    { icon: <Users size={22} className="text-primary" />, number: "5,000+", label: "Patients Seen" },
    { icon: <Clock size={22} className="text-primary" />, number: "Mon to Sat", label: "Open 6 Days" },
    { icon: <Shield size={22} className="text-primary" />, number: "16+", label: "Dental Services" },
    { icon: <Heart size={22} className="text-primary" />, number: "Patient First", label: "Calm, Clear Care" },
  ];
  return (
    <div className="bg-white border-y border-border py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {badges.map(b => (
            <div key={b.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">{b.icon}</div>
              <div className="font-bold text-xl text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{b.number}</div>
              <div className="text-xs text-muted-foreground leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services Overview Grid ───────────────────────────────────────────────────

function ServicesOverview({ setPage, openBooking }: { setPage: (p: string) => void; openBooking: () => void }) {
  const featured = SERVICES.filter(s => s.featured);
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle label="What We Offer" title="Dental services for everyday needs" subtitle="From routine check-ups to restorative treatment, each service is explained clearly and priced from the start." center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <motion.div
              key={s.id}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => { setPage("services"); window.scrollTo({ top: 0 }); }}
            >
              <ServiceIcon icon={s.icon} className="mb-4" />
              <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{s.price}</span>
                <ChevronRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Btn variant="primary" onClick={() => { setPage("services"); window.scrollTo({ top: 0 }); }}>
            View All Services <ArrowRight size={15} />
          </Btn>
          <Btn variant="outline" onClick={openBooking}>Book Visit</Btn>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUs({ openBooking }: { openBooking: () => void }) {
  const reasons = [
    { icon: <Heart size={20} className="text-accent" />, title: "We Understand Dental Anxiety", body: "Fear of the dentist is common and we take it seriously. Our team moves at your pace, explains every step, and creates a calm, pressure-free environment." },
    { icon: <Shield size={20} className="text-accent" />, title: "Transparent Pricing", body: "Costs are discussed before treatment starts so you know what to expect." },
    { icon: <Zap size={20} className="text-accent" />, title: "Modern Equipment", body: "We use current tools and a straightforward clinical process to keep treatment efficient and comfortable." },
    { icon: <Users size={20} className="text-accent" />, title: "Local, Trusted Care", body: "We serve families in Ipaja and across Lagos with consistent care and practical advice." },
    { icon: <CheckCircle size={20} className="text-accent" />, title: "Strict Hygiene Standards", body: "Our sterilisation and infection control protocols meet clinical best practice. Every instrument is cleaned to the same standard you would expect from a hospital." },
    { icon: <Smile size={20} className="text-accent" />, title: "Care for All Ages", body: "We welcome children, adults, and older patients, with treatment paced to suit the person in the chair." },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Why Patients Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
              Clean, calm, straightforward dental care
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-7">
              We focus on the things that matter most to patients: a clean clinic, clear communication, fair pricing, and gentle treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Btn variant="accent" onClick={openBooking}>Book Your Visit</Btn>
              <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold rounded-full px-6 py-3 text-sm hover:bg-white/10 transition-colors">
                <WhatsAppBrandIcon size={18} /> Ask a Question
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                className="bg-white/8 rounded-2xl p-5 border border-white/10 hover:bg-white/12 transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-3">{r.icon}</div>
                <h4 className="font-semibold text-sm mb-1.5" style={{ fontFamily: "Outfit, sans-serif" }}>{r.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Carousel ────────────────────────────────────────────────────

function TestimonialsCarousel({ setPage }: { setPage: (p: string) => void }) {
  const [idx, setIdx] = useState(0);
  const visible = 1;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle label="Patient Reviews" title="What patients say after visiting" subtitle="A few short reviews from patients who have used the clinic for cleaning, restorative care, and consultations." center />

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                {TESTIMONIALS[idx].initials}
              </div>
              <StarRow rating={TESTIMONIALS[idx].rating} />
              <blockquote className="text-foreground text-base leading-relaxed mt-4 mb-5 italic">
                "{TESTIMONIALS[idx].text}"
              </blockquote>
              <div className="font-semibold text-foreground text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{TESTIMONIALS[idx].name}</div>
              <div className="text-accent text-xs font-medium mt-1">{TESTIMONIALS[idx].service}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`rounded-full transition-all ${i === idx ? "w-5 h-2 bg-accent" : "w-2 h-2 bg-border"}`} />
              ))}
            </div>
            <button onClick={() => setIdx(i => (i + 1) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="text-center mt-8">
            <Btn variant="outline" onClick={() => { setPage("testimonials"); window.scrollTo({ top: 0 }); }}>
              Read All Reviews <ArrowRight size={14} />
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Before / After Gallery ───────────────────────────────────────────────────

function BeforeAfterSection({ setPage }: { setPage: (p: string) => void }) {
  const [active, setActive] = useState(0);
  const CASES = [
    {
      label: "Teeth Whitening",
      before: "https://images.unsplash.com/photo-1561742026-3d197ef0fb54?w=600&h=450&fit=crop&auto=format",
      after: "https://images.unsplash.com/photo-1758598304384-1f678eabdd4f?w=600&h=450&fit=crop&auto=format",
      desc: "Professional whitening, single session",
    },
    {
      label: "Full Smile Refresh",
      before: "https://images.unsplash.com/photo-1561742026-3d197ef0fb54?w=600&h=450&fit=crop&auto=format&sat=-50",
      after: "https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?w=600&h=450&fit=crop&auto=format",
      desc: "Scaling, polishing, and whitening combined",
    },
  ];
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle label="Smile Transformations" title="A closer look at treatment results" subtitle="Examples of whitening and smile improvement work shown in a simple before and after view." center />
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 justify-center mb-6">
            {CASES.map((c, i) => (
              <button key={c.label} onClick={() => { setActive(i); setShowAfter(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${active === i ? "bg-primary text-white" : "bg-card border border-border text-foreground hover:bg-secondary"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-lg">
            <img
              src={showAfter ? CASES[active].after : CASES[active].before}
              alt={showAfter ? "After treatment" : "Before treatment"}
              className="w-full h-64 sm:h-80 object-cover transition-all duration-500"
            />
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${showAfter ? "bg-accent text-white" : "bg-black/50 text-white"}`}>
              {showAfter ? "After" : "Before"}
            </div>
          </div>
          <div className="flex gap-3 mt-4 justify-center">
            <button onClick={() => setShowAfter(false)} className={`flex-1 max-w-[160px] py-2.5 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${!showAfter ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/40"}`}>
              Before
            </button>
            <button onClick={() => setShowAfter(true)} className={`flex-1 max-w-[160px] py-2.5 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${showAfter ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:border-accent/40"}`}>
              After
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">{CASES[active].desc}</p>
          <div className="text-center mt-6">
            <Btn variant="outline" onClick={() => { setPage("gallery"); window.scrollTo({ top: 0 }); }}>View Full Gallery <ArrowRight size={14} /></Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Insurance / HMO Row ──────────────────────────────────────────────────────

function InsuranceRow() {
  const plans = ["NHIS", "Hygeia HMO", "AXA Mansard", "Reliance HMO", "Avon HMO", "Leadway Health"];
  return (
    <section className="bg-white border-y border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Selected HMO Plans Accepted</p>
        <div className="flex flex-wrap justify-center gap-3">
          {plans.map(p => (
            <div key={p} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground/70 bg-muted/50 hover:border-primary/30 hover:text-primary transition-colors">
              {p}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Not sure if your plan is accepted? <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20confirm%20if%20my%20HMO%20plan%20is%20accepted.`} target="_blank" rel="noopener noreferrer" className="text-primary underline">Send us a WhatsApp message</a></p>
      </div>
    </section>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────

function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle label="Find Us" title="Visit the clinic in Gowon Estate" subtitle="Fastident is located at All Seasons Plaza in Ipaja, with easy access for patients coming from nearby parts of Lagos." />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-foreground">Suite 4, All Seasons Plaza</p>
                  <p className="text-sm text-muted-foreground">Federal Junction, 1st Avenue, Gowon Estate<br />Ipaja Ayobo Road, Ipaja, Lagos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{CLINIC.phone1Display}</a>
                  <a href={`tel:+234${CLINIC.phone2.slice(1)}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{CLINIC.phone2Display} (alternate)</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Monday to Friday, 8:00 AM to 6:00 PM</p>
                  <p className="text-sm text-muted-foreground">Saturday, 8:00 AM to 5:00 PM | Sunday Closed</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-7">
              <a href={`https://www.google.com/maps/search/Fastident+Dental+Clinic+Gowon+Estate+Ipaja+Lagos`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors">
                <MapPin size={15} /> Get Directions
              </a>
              <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border text-foreground font-medium rounded-full px-5 py-2.5 text-sm hover:bg-muted transition-colors">
                <WhatsAppBrandIcon size={18} /> Ask for Directions
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-md h-72 md:h-96 bg-muted">
            <iframe
              title="Fastident Dental Clinic Location, Gowon Estate, Ipaja, Lagos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4!2d3.2553!3d6.6205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93be3a7a6f3b%3A0x0!2sGowon%20Estate%2C%20Ipaja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Emergency CTA Strip ──────────────────────────────────────────────────────

function EmergencyStrip({ openEmergency }: { openEmergency: () => void }) {
  return (
    <div className="bg-red-600 text-white py-3 px-4 text-center text-sm">
      <span className="font-medium">Dental emergency? Severe pain or swelling?</span>
      <button onClick={openEmergency} className="underline font-bold hover:text-red-200 transition-colors cursor-pointer ml-1">
        Call for urgent help
      </button>
    </div>
  );
}

// ─── Final CTA Banner ─────────────────────────────────────────────────────────

function CTABanner({ openBooking }: { openBooking: () => void }) {
  return (
    <section className="py-16 md:py-24 bg-accent text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Ready to book your next visit?
          </h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Choose a service, pick a time, and send your details in a few quick steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Btn variant="white" onClick={openBooking} className="text-base px-8 py-4">
              <Calendar size={18} /> Book Visit
            </Btn>
            <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold rounded-full px-8 py-4 text-base hover:bg-white/10 transition-colors">
              <Phone size={18} /> Call {CLINIC.phone1Display}
            </a>
          </div>
          <p className="text-white/60 text-xs mt-5">Family packages available | HMO accepted | Clear pricing</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ setPage, openBooking, openEmergency }: {
  setPage: (p: string) => void; openBooking: () => void; openEmergency: () => void;
}) {
  return (
    <div>
      <EmergencyStrip openEmergency={openEmergency} />
      <Hero openBooking={openBooking} />
      <TrustBadges />
      <ServicesOverview setPage={setPage} openBooking={openBooking} />
      <WhyChooseUs openBooking={openBooking} />
      <TestimonialsCarousel setPage={setPage} />
      <BeforeAfterSection setPage={setPage} />
      <InsuranceRow />
      <MapSection />
      <CTABanner openBooking={openBooking} />
    </div>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────

function ServicesPage({ openBooking }: { openBooking: (service?: string) => void }) {
  const [filter, setFilter] = useState("all");
  const categories = [
    { id: "all", label: "All Services" },
    { id: "general", label: "General" },
    { id: "preventive", label: "Preventive" },
    { id: "cosmetic", label: "Cosmetic" },
    { id: "restorative", label: "Restorative" },
    { id: "orthodontic", label: "Orthodontic" },
    { id: "emergency", label: "Emergency" },
  ];
  const filtered = filter === "all" ? SERVICES : SERVICES.filter(s => s.category === filter);

  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-16 px-4 sm:px-6 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Our Services</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Services and starting prices</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-base">Browse the full service list, see what each treatment covers, and book the one you need.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filter === c.id ? "bg-primary text-white" : "bg-card border border-border text-foreground hover:bg-secondary"}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ServiceIcon icon={s.icon} className="mb-4" />
              <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{s.desc}</p>
              <div className="bg-muted rounded-xl p-3.5 mb-4">
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">What to Expect</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.expect}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-accent">{s.price}</span>
                <Btn variant="accent" onClick={() => openBooking(s.id)} className="text-xs px-4 py-2">
                  Book Service
                </Btn>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-red-800 text-sm mb-1">Dental Emergency?</h4>
            <p className="text-red-700 text-xs leading-relaxed">Severe pain, a knocked-out tooth, or major swelling? Do not wait for an online form. Call the clinic directly for same-day help.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="flex items-center gap-1.5 bg-red-600 text-white font-bold py-2 px-4 rounded-xl text-sm hover:bg-red-700 transition-colors">
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({ openBooking }: { openBooking: () => void }) {
  const team = [
    { name: "Lead Dentist", role: "Clinic Director", img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400&h=400&fit=crop&face&auto=format", bio: "Leads diagnosis, treatment planning, and general patient care across the clinic." },
    { name: "Associate Dentist", role: "Restorative Care", img: "https://images.unsplash.com/photo-1685022036574-12bffde5e2b7?w=400&h=400&fit=crop&face&auto=format", bio: "Handles fillings, crowns, root canal treatment, and other restorative procedures." },
    { name: "Dental Therapist", role: "Cleaning and Preventive Care", img: "https://images.unsplash.com/photo-1685022036532-ea7e3b114578?w=400&h=400&fit=crop&face&auto=format", bio: "Supports routine cleaning, preventive treatment, and patient education for daily oral care." },
  ];

  const standards = [
    { label: "Sterilisation", body: "Every instrument is autoclaved between patients. We use sealed pouches and log every sterilisation cycle." },
    { label: "Single-Use Items", body: "Gloves, masks, suction tips, and saliva ejectors are disposed of after each patient." },
    { label: "Surface Disinfection", body: "Treatment chairs, trays, and all contact surfaces are cleaned and disinfected between every appointment." },
    { label: "Infection Control Training", body: "All team members are trained in infection prevention and control protocols in line with clinical guidelines." },
  ];

  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-16 px-4 sm:px-6 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Our Story</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>A Clinic Built on Trust</h1>
        <p className="text-white/70 max-w-xl mx-auto">Fastident was built to offer reliable dental care in a clean and welcoming setting.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose max-w-none text-muted-foreground leading-relaxed text-base">
          <div className="bg-secondary rounded-2xl p-7 mb-10 border-l-4 border-primary">
            <p className="text-foreground font-medium text-lg leading-relaxed m-0" style={{ fontFamily: "Outfit, sans-serif" }}>
              "We started Fastident to provide dental care that feels clear, fair, and respectful from the first conversation to the final treatment."
            </p>
            <p className="mt-3 text-sm text-muted-foreground m-0">Fastident founding team</p>
          </div>
          <p>Fastident Dental Clinic was founded to serve patients in Gowon Estate and the wider Ipaja area with clean facilities, clear pricing, and careful treatment.</p>
          <p>Over the years, the clinic has cared for children, adults, and older patients returning for both routine and urgent treatment. The focus has stayed the same: explain things well, keep standards high, and treat people with patience.</p>
          <p>That approach still guides every visit today.</p>
        </div>
      </div>

      {/* Team */}
      <div className="bg-muted/50 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label="Our Team" title="Meet the Faces Behind Your Smile" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(m => (
              <div key={m.name} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow">
                <img src={m.img} alt={m.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-base mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{m.name}</h3>
                  <p className="text-accent text-xs font-semibold mb-3">{m.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hygiene Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle label="Hygiene Standards" title="Cleanliness you can check for yourself" subtitle="We keep treatment rooms, surfaces, and instruments clean between every appointment." center />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {standards.map(s => (
            <div key={s.label} className="flex gap-4 bg-card rounded-2xl p-5 border border-border">
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1.5" style={{ fontFamily: "Outfit, sans-serif" }}>{s.label}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Family Package callout */}
        <div className="mt-10 bg-accent/10 border border-accent/30 rounded-2xl p-6 text-center">
          <h4 className="font-bold text-lg text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Family & Referral Packages</h4>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed max-w-xl mx-auto">
            When you refer a friend or book 3 or more family members, you may qualify for our Family Care Package. Ask at reception or mention it when booking.
          </p>
          <Btn variant="accent" onClick={openBooking}>Book for Your Family</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Page ─────────────────────────────────────────────────────────────

function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [zoomed, setZoomed] = useState<typeof GALLERY[0] | null>(null);
  const cats = [
    { id: "all", label: "All" },
    { id: "whitening", label: "Whitening" },
    { id: "alignment", label: "Alignment" },
    { id: "clinic", label: "Clinic" },
    { id: "team", label: "Our Team" },
    { id: "equipment", label: "Equipment" },
  ];
  const filtered = filter === "all" ? GALLERY : GALLERY.filter(g => g.category === filter);

  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-16 px-4 sm:px-6 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Gallery</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>A Look Inside Fastident</h1>
        <p className="text-white/70 max-w-xl mx-auto">Smile transformations, our clinic environment, our equipment, and the team behind your care.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {cats.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filter === c.id ? "bg-primary text-white" : "bg-card border border-border text-foreground hover:bg-secondary"}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((g, i) => (
            <motion.div
              key={g.id}
              className="relative rounded-2xl overflow-hidden bg-muted group cursor-pointer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setZoomed(g)}
            >
              <img src={g.img} alt={g.alt} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Search size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-xs font-semibold">{g.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomed(null)}>
            <motion.img src={zoomed.img} alt={zoomed.alt} className="max-w-2xl w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} />
            <button onClick={() => setZoomed(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Testimonials Page ────────────────────────────────────────────────────────

function TestimonialsPage({ openBooking }: { openBooking: () => void }) {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-16 px-4 sm:px-6 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Patient Reviews</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>What Patients Are Saying</h1>
        <p className="text-white/70 max-w-xl mx-auto">A few comments from patients who have visited the clinic for treatment and routine care.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">{t.initials}</div>
                <div>
                  <div className="font-semibold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{t.name}</div>
                  <div className="text-xs text-accent font-medium">{t.service}</div>
                </div>
              </div>
              <StarRow rating={t.rating} />
              <blockquote className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1 italic">"{t.text}"</blockquote>
            </motion.div>
          ))}
        </div>

        <div className="bg-secondary rounded-2xl p-8 text-center border border-border">
          <Star size={28} className="text-amber-400 mx-auto mb-3 fill-amber-400" />
          <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Visited Fastident?</h3>
          <p className="text-muted-foreground text-sm mb-5">A short review helps other patients know what to expect before booking.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://g.page/r/fastident-dental-clinic/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-primary/90 transition-colors">
              <Star size={15} /> Leave a Google Review
            </a>
            <a href={`https://wa.me/${CLINIC.whatsapp}?text=I%20would%20like%20to%20leave%20a%20review%20for%20Fastident.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-[#1da851] transition-colors">
              <WhatsAppBrandIcon size={17} /> Share via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage({ openBooking }: { openBooking: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!validateNigerianPhone(form.phone)) e.phone = "Enter a valid Nigerian phone number.";
    if (!form.message.trim()) e.message = "Please enter your message.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <div className="bg-primary text-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto py-14 md:py-18 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Get in Touch</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Get in touch with the clinic</h1>
            <p className="text-white/70 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mb-7">Call, send a message, or use WhatsApp if you need directions, pricing, appointment help, or general information.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href={`tel:+234${CLINIC.phone1.slice(1)}`} className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold rounded-full px-6 py-3 text-sm hover:bg-secondary transition-colors">
                <Phone size={16} /> Call {CLINIC.phone1Display}
              </a>
              <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%2C%20I%20need%20help%20with%20an%20appointment.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-6 py-3 text-sm hover:bg-[#1da851] transition-colors">
                <WhatsAppBrandIcon size={18} /> WhatsApp Us
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
              {[
                { title: "Fast response", body: "WhatsApp messages are usually answered during working hours." },
                { title: "Easy directions", body: "Call or message us if you need help finding the clinic." },
                { title: "Booking support", body: "We can guide you to the right service before you book." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-4 text-left">
                  <p className="font-semibold text-sm text-white">{item.title}</p>
                  <p className="text-xs text-white/70 leading-relaxed mt-1.5">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1200&h=900&fit=crop&auto=format"
                alt="Welcoming reception area at Fastident Dental Clinic"
                className="w-full h-[320px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-white/95 text-foreground p-5 shadow-lg backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">Visit the clinic</p>
                <h3 className="mt-2 font-bold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Fastident Dental Clinic</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Suite 4, All Seasons Plaza, Federal Junction, 1st Avenue, Gowon Estate, Ipaja, Lagos.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"><Clock size={13} /> Mon to Sat</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"><Phone size={13} /> {CLINIC.phone1Display}</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-5 -left-5 rounded-2xl bg-white text-foreground p-4 shadow-xl border border-border max-w-[220px]">
              <p className="font-semibold text-sm">Need a quick answer?</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">WhatsApp is the fastest way to ask about pricing, directions, or appointment times.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="font-bold text-xl mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>Contact Information</h2>
          <div className="space-y-5">
            {[
              { icon: <MapPin size={18} className="text-accent" />, label: "Address", content: CLINIC.address },
              { icon: <Phone size={18} className="text-accent" />, label: "Booking Line", content: CLINIC.phone1Display, href: `tel:+234${CLINIC.phone1.slice(1)}` },
              { icon: <Phone size={18} className="text-accent" />, label: "Alternate Line", content: CLINIC.phone2Display, href: `tel:+234${CLINIC.phone2.slice(1)}` },
              { icon: <WhatsAppBrandIcon size={20} className="text-accent" />, label: "WhatsApp", content: "Chat with us instantly", href: `https://wa.me/${CLINIC.whatsapp}` },
              { icon: <Mail size={18} className="text-accent" />, label: "Email", content: CLINIC.email, href: `mailto:${CLINIC.email}` },
              { icon: <Clock size={18} className="text-accent" />, label: "Hours", content: "Mon to Fri 8AM to 6PM | Sat 8AM to 5PM | Sun Closed" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors font-medium">{item.content}</a>
                  ) : (
                    <p className="text-sm text-foreground">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl overflow-hidden border border-border h-52 bg-muted">
            <iframe
              title="Fastident Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4!2d3.2553!3d6.6205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93be3a7a6f3b%3A0x0!2sGowon%20Estate%2C%20Ipaja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&h=600&fit=crop&auto=format"
                alt="Treatment room at Fastident Dental Clinic"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-sm">Clean treatment rooms</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">A tidy clinical space helps patients feel settled before treatment starts.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="https://images.unsplash.com/photo-1685022036574-12bffde5e2b7?w=900&h=600&fit=crop&auto=format"
                alt="Friendly dental team at Fastident Dental Clinic"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-sm">Friendly support</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Our team can help with bookings, questions, and directions before you arrive.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              <Instagram size={15} /> @fastident
            </a>
            <a href={CLINIC.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              <Facebook size={15} /> @fastident
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="bg-card rounded-2xl border border-border p-6">
            {!submitted ? (
              <>
                <h2 className="font-bold text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Send a Message</h2>
                <p className="text-sm text-muted-foreground mb-5">For general questions, not appointment bookings. Want to book? <button onClick={openBooking} className="text-primary underline font-medium cursor-pointer">Use our booking system.</button></p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Full Name *</label>
                    <input type="text" value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(prev => ({ ...prev, name: "" })); }} placeholder="Your full name" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(prev => ({ ...prev, phone: "" })); }} placeholder="e.g. 0803 123 4567" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Email <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Message *</label>
                    <textarea value={form.message} onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(prev => ({ ...prev, message: "" })); }} placeholder="How can we help you?" rows={4} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted resize-none" />
                    {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <div className="rounded-2xl bg-secondary/70 border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">Need a faster reply?</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Use WhatsApp for quick questions about pricing, directions, emergency help, or available times.</p>
                    <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%2C%20I%20have%20a%20question%20for%20Fastident.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-[#25D366] hover:text-[#1da851] transition-colors">
                      <WhatsAppBrandIcon size={18} /> Chat on WhatsApp
                    </a>
                  </div>
                  <Btn variant="accent" onClick={submit} className="w-full justify-center">Send Message <ArrowRight size={15} /></Btn>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Message Received!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">We will get back to you within a few hours during working hours. For faster response, WhatsApp us directly.</p>
                <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-medium py-2.5 px-5 rounded-full text-sm mt-5 hover:bg-[#1da851] transition-colors">
                  <WhatsAppBrandIcon size={17} /> WhatsApp Instead
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────────

function FAQPage({ openBooking }: { openBooking: () => void }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-16 px-4 sm:px-6 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Common Questions</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Frequently Asked Questions</h1>
        <p className="text-white/70 max-w-xl mx-auto">Short answers to the questions patients ask most often.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-3 font-medium text-foreground text-sm cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <div className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}>
                  <ChevronDown size={18} className="text-muted-foreground" />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-secondary rounded-2xl p-7 text-center border border-border">
          <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Still Have Questions?</h3>
          <p className="text-muted-foreground text-sm mb-5">Our team is available on WhatsApp during working hours and will reply to most messages within the hour.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%2C%20I%20have%20a%20question%20about%20Fastident.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-[#1da851] transition-colors">
              <WhatsAppBrandIcon size={17} /> WhatsApp Us
            </a>
            <Btn variant="primary" onClick={openBooking}>Book an Appointment</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  const openBooking = useCallback((service?: string) => {
    setBookingService(service);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    setBookingService(undefined);
  }, []);

  useEffect(() => {
    document.title = "Fastident Dental Clinic | Ipaja, Lagos | Book an Appointment";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Fastident Dental Clinic in Gowon Estate, Ipaja, Lagos. Dental care for all ages, with clear pricing, clean facilities, and online booking.");
    }
  }, []);

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Header page={page} setPage={setPage} openBooking={openBooking} />

          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {page === "home" && <HomePage setPage={setPage} openBooking={openBooking} openEmergency={() => setEmergencyOpen(true)} />}
                {page === "services" && <ServicesPage openBooking={openBooking} />}
                {page === "about" && <AboutPage openBooking={openBooking} />}
                {page === "gallery" && <GalleryPage />}
                {page === "testimonials" && <TestimonialsPage openBooking={openBooking} />}
                {page === "contact" && <ContactPage openBooking={openBooking} />}
                {page === "faq" && <FAQPage openBooking={openBooking} />}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Patient Portal Trigger */}
          {page !== "home" && (
            <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-5 z-30">
              <button
                onClick={() => setPortalOpen(true)}
                className="bg-white border border-border text-foreground text-xs font-medium px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center gap-1.5"
              >
                <Calendar size={12} /> My Appointment
              </button>
            </div>
          )}

          <Footer setPage={setPage} openBooking={openBooking} />
          <WhatsAppButton />

          <AnimatePresence>
            {bookingOpen && <BookingModal key="booking" onClose={closeBooking} preService={bookingService} />}
            {emergencyOpen && <EmergencyModal key="emergency" onClose={() => setEmergencyOpen(false)} />}
            {portalOpen && <PatientPortalModal key="portal" onClose={() => setPortalOpen(false)} />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
