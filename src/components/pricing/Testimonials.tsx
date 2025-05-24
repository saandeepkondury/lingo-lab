
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Lingo Lab helped me identify the exact narrative strategies that unicorns used to reach their first $100M. The case studies are pure gold for any founder.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Chen",
    role: "Founder, TechFlow",
  },
  {
    text: "As a VC, I use Lingo Lab to spot emerging narrative trends and identify founders who understand strategic positioning. It's become essential to my deal flow.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Marcus Rodriguez",
    role: "Partner, Venture Capital",
  },
  {
    text: "The platform showed me how to craft a compelling company story that resonated with investors. We raised our Series A in record time.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Priya Patel",
    role: "CEO, DataMind",
  },
  {
    text: "Lingo Lab's insights on market category creation helped me position our startup as the leader in a new space. The narrative frameworks are incredibly powerful.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Kim",
    role: "Founder, CloudSecure",
  },
  {
    text: "The founder interviews revealed strategies I never would have discovered elsewhere. It's like having a masterclass from the most successful entrepreneurs.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Emma Thompson",
    role: "Co-founder, HealthTech",
  },
  {
    text: "I've found three portfolio companies through Lingo Lab by identifying founders who demonstrate strong narrative thinking. The ROI has been exceptional.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Lisa Zhang",
    role: "Investment Director",
  },
  {
    text: "Our company became synonymous with 'sustainable fintech' after implementing the positioning strategies I learned from Lingo Lab's case studies.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "James Wilson",
    role: "Founder, GreenPay",
  },
  {
    text: "The platform helped me understand how to create lingo that our entire industry now uses. We literally shaped the conversation around our market category.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Maya Singh",
    role: "CEO, AIFlow",
  },
  {
    text: "Lingo Lab's trend reports help me stay ahead of narrative shifts in the market. It's invaluable for making informed investment decisions.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Alex Johnson",
    role: "Senior Partner, Growth Equity",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-teal-50/50 to-white py-20 relative">
      <div className="container z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="border border-teal-200 bg-teal-50 text-teal-700 py-1 px-4 rounded-lg text-sm font-medium">
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight mt-5 text-center">
            What our users say
          </h2>
          <p className="text-center mt-5 text-muted-foreground max-w-md">
            See how founders and investors are using Lingo Lab to master strategic narrative.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
