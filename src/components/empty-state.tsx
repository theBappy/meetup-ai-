
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({ title, description, image="/empty.svg" }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image src={image} alt="empty-logo" width={240} height={240} />
        <div className="flex flex-col max-w-md mx-auto gap-y-6 text-center">
            <h6 className="text-lg font-medium">{title}</h6>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
  );
};
