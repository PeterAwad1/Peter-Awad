import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
