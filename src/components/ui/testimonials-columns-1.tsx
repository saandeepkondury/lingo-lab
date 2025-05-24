
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}

export const TestimonialsColumn = ({ testimonials, className, duration = 15 }: TestimonialsColumnProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <div key={index} className="flex flex-col gap-6">
            {testimonials.map((testimonial, testimonialIndex) => (
              <div
                key={testimonialIndex}
                className="bg-card dark:bg-card border border-border/50 dark:border-teal-800/30 shadow-sm hover:shadow-md dark:hover:shadow-teal-900/20 transition-shadow p-6 rounded-xl max-w-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-200 dark:ring-teal-700"
                  />
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
