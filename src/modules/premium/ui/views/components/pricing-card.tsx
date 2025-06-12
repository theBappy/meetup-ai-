import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

const pricingCardVariants = cva(
  "rounded-xl p-4 sm:p-5 md:p-6 w-full transition-all duration-300", // Responsive padding
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        highlighted: "bg-gradient-to-br from-[#0000ff] to-[#15283c] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary text-white",
      highlighted: "fill-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-700",
      highlighted: "text-neutral-300",
    },
  },
});

const pricingCardBadgeVariants = cva("text-black text-xs font-normal px-2 py-1 rounded", {
  variants: {
    variant: {
      default: "bg-primary/20",
      highlighted: "bg-[#F5B797]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
  variant,
}: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className, "border shadow-md")}>
      <div className="flex flex-col sm:flex-row items-start sm:items-end sm:justify-between gap-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-semibold text-lg sm:text-xl md:text-2xl">{title}</h6>
            {badge ? (
              <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                {badge}
              </Badge>
            ) : null}
          </div>
          {description && (
            <p className={cn("text-sm", pricingCardSecondaryVariants({ variant }))}>
              {description}
            </p>
          )}
        </div>
        <div className="flex items-end gap-x-1 shrink-0">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>
          <span className={cn("text-sm sm:text-base", pricingCardSecondaryVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>

      <div className="py-4 sm:py-6">
        <Separator className="opacity-10 text-[#5d6b68]" />
      </div>

      <Button
        className="w-full text-sm sm:text-base"
        size="lg"
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
      >
        {buttonText}
      </Button>

      <div className="flex flex-col gap-y-3 mt-6">
        <p className="font-semibold text-sm sm:text-base uppercase">Features</p>
        <ul className={cn("flex flex-col gap-y-2.5", pricingCardSecondaryVariants({ variant }))}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5 text-sm sm:text-base">
              <CircleCheckIcon className={cn(pricingCardIconVariants({ variant }))} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
