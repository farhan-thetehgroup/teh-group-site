import WhatsAppButton from "./WhatsAppButton";
import Hero from "./sections/Hero";
import About from "./sections/About";
import OurClients from "./sections/OurClients";
import BrandProducts from "./sections/BrandProducts";
import PastEvents from "./sections/PastEvents";
import WhyPartner from "./sections/WhyPartner";
import Contact from "./sections/Contact";
import Team from "./sections/Team";
import Footer from "./sections/Footer";
import OurService from "./sections/OurService";
import Testimonials from "./sections/Testimonials";
// import ClientTestimonials from "./sections/ClientTestimonials";
import UpcomingEvents from "./sections/UpcomingEvents";
import RegionalPresence from "./sections/RegionalPresence";

const sectionList = [
  { label: "Hero", Component: Hero, lazy: false },
  { label: "About", Component: About, lazy: true },
  { label: "Our Clients", Component: OurClients, lazy: true },
  { label: "Our Services", Component: OurService, lazy: true },
  // { label: "Client Testimonials", Component: ClientTestimonials, lazy: true },
  { label: "Brand Products", Component: BrandProducts, lazy: true },
  { label: "Past Events", Component: PastEvents, lazy: true },
  { label: "Why Partner", Component: WhyPartner, lazy: true },
  { label: "Regional Presence", Component: RegionalPresence, lazy: true },
  { label: "Testimonials", Component: Testimonials, lazy: true },
  { label: "Upcoming Events", Component: UpcomingEvents, lazy: true },
  { label: "Team", Component: Team, lazy: true },
  { label: "Contact", Component: Contact, lazy: true },
  { label: "Footer", Component: Footer, lazy: true },
];

const MainWebsite = () => {
  return (
    <>
      <main className="bg-black text-white overflow-x-hidden">
        {sectionList.map(({ label, Component, lazy }) => (
          <Component />
        ))}
      </main>
      <WhatsAppButton />
    </>
  );
};

export default MainWebsite;
