import { portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils/cn";

const CV_HREF = encodeURI(portfolio.contact.cv);
const CV_DOWNLOAD_NAME = "Peter-Awad-Frontend-CV.pdf";

type CvLinkProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function CvLink({ children, className, onClick }: CvLinkProps) {
  return (
    <a
      href={CV_HREF}
      download={CV_DOWNLOAD_NAME}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
