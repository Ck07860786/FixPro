import { HeroBg } from "../backgrounds/HeroBg";
import { DashboardPreview } from "../landing/DashboardPreview";
import { FeaturesSection } from "../landing/FeaturesSection";
import { Footer } from "../landing/Footer";
import { Header } from "../landing/Header";
import { HeroSection } from "../landing/HeroSection";
import { ServicesSection } from "../landing/ServicesSection";
import { WorkflowSection } from "../landing/WorkflowSection";

const Home =()=>{
    return(
        
         <div className="min-h-screen bg-[#eef1f5] text-slate-900">
              <Header />
        
              <main className="mx-auto max-w-[1280px] px-4 pb-14 md:px-6">
              
                <div className="relative">
                  <HeroBg/>
                  <HeroSection />
                  <DashboardPreview />
                </div>
        
                <FeaturesSection />
                <ServicesSection />
                <WorkflowSection />
              </main>
        
              <Footer />
            </div>
        
    )

}

export default Home;