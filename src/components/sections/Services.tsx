import { CalendarCheck, CreditCard, ShoppingBag, SquareParking, Wifi, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site";
import { cn } from "@/lib/cn";

type ServiceId = (typeof services.items)[number]["id"];

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  booking: CalendarCheck,
  takeaway: ShoppingBag,
  payment: CreditCard,
  wifi: Wifi,
  parking: SquareParking,
};

export function Services() {
  return (
    <section id="services" className="section border-y border-white/[0.06] bg-ink-900/50">
      <div className="container-page">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} align="center" />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-6 lg:grid-cols-5">
          {services.items.map((service, i) => {
            const Icon = SERVICE_ICONS[service.id];

            return (
              <Reveal
                key={service.id}
                delay={i * 0.07}
                className={cn(i < 2 ? "sm:col-span-3" : "sm:col-span-2", "lg:col-span-1")}
              >
                {/* lg:px-4 keeps «Бронирование» on one line in the five narrow columns. */}
                <div className="glass lift flex h-full items-start gap-4 rounded-2xl p-5 sm:flex-col sm:items-center sm:text-center lg:px-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-ice">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-snug font-semibold text-white">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-balance text-haze">{service.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
