import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  MapPin, 
  Compass, 
  Upload, 
  Home,
  Star,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Hem",
      url: createPageUrl("Hem"),
      icon: Home,
    },
    {
      title: "Monument",
      url: createPageUrl("Monument"),
      icon: MapPin,
    },
    {
      title: "Ladda upp",
      url: createPageUrl("LaddaUppGuide"),
      icon: Upload,
    },
    {
      title: "Min profil",
      url: createPageUrl("MinProfil"),
      icon: User,
    }
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 md:flex">
      {/* Desktop Sidebar */}
      <aside className="w-72 min-h-screen bg-white/80 backdrop-blur-lg border-r border-blue-100 shadow-xl hidden md:flex flex-col">
        <div className="p-6 border-b border-blue-100">
          <Link to={createPageUrl("Hem")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Toury
              </h2>
              <p className="text-sm text-blue-600/70 font-medium">Din personliga guide</p>
            </div>
          </Link>
        </div>
        
        <nav className="p-6 flex-1">
          <div className="space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive(item.url)
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                    : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:translate-x-1'
                }`}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-semibold">{item.title === 'Ladda upp guide' ? 'Ladda upp' : item.title}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-6">
          <div className="text-center mb-6">
            <Link to={createPageUrl("Policy")} className="text-sm text-gray-500 hover:text-blue-600 transition">
              Integritetspolicy
            </Link>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Toury Premium</span>
            </div>
            <p className="text-xs text-blue-600 mb-3">Få tillgång till exklusiva guider och offline-läge</p>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xs">
              Uppgradera
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-auto pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t border-blue-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-50">
        <nav className="flex justify-around items-center h-full max-w-md mx-auto">
            {navigationItems.map((item) => (
                <Link
                    key={item.title}
                    to={item.url}
                    className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-all duration-200 w-20 ${
                        isActive(item.url)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-500 hover:text-blue-500'
                    }`}
                >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xs font-medium">{item.title}</span>
                </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}