import { HeroBg } from "../components/landing/HeroBg";
import { DashboardPreview } from "../components/landing/DashboardPreview";
import { FeaturesSection } from "../components/landing/FeaturesSection";

import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { WorkflowSection } from "../components/landing/WorkflowSection";
import { Footer } from "../components/layout/Footer";

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