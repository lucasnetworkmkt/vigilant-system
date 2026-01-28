import React, { useState } from 'react';
import { 
  Flame, 
  ChevronRight, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Instagram, 
  Phone,
  UtensilsCrossed,
  ChefHat,
  Coffee,
  Wine,
  ArrowRight,
  Menu,
  X,
  Quote
} from 'lucide-react';

// --- Data: Menu Items (25 Items) ---
const CATEGORIES = [
  { id: 'destaques', label: 'Destaques', icon: Star },
  { id: 'carnes', label: 'Carnes Nobres', icon: UtensilsCrossed },
  { id: 'massas', label: 'Massas Artesanais', icon: ChefHat },
  { id: 'entradas', label: 'Entradas', icon: Coffee }, // Using Coffee as placeholder for small bites
  { id: 'sobremesas', label: 'Sobremesas', icon: Star },
  { id: 'vinhos', label: 'Vinhos & Drinks', icon: Wine },
];

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

const MENU_ITEMS = [
  // Carnes / Destaques
  {
    id: 1,
    name: "Prime Tomahawk Gold",
    description: "Corte nobre de 800g com osso, finalizado na manteiga de ervas e flor de sal.",
    price: 189.90,
    category: "carnes",
    highlight: true,
    image: "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Bife de Chorizo Angus",
    description: "Suculência extrema, grelhado ao ponto do chef. Acompanha batatas rústicas.",
    price: 89.90,
    category: "carnes",
    highlight: true,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Costela Defumada BBQ",
    description: "Assada lentamente por 12 horas, desmancha no garfo. Molho barbecue artesanal.",
    price: 75.00,
    category: "carnes",
    highlight: false,
    image: "https://img.freepik.com/fotos-premium/costelinha-de-porco-estilo-americano-deliciosas-costelinhas-de-porco-defumadas-com-cobertura-de-molho-barbecue-vista-de-cima_946881-13.jpg"
  },
  {
    id: 4,
    name: "Ancho Premium",
    description: "Corte dianteiro do contrafilé, marmoreio intenso e sabor inigualável.",
    price: 92.00,
    category: "carnes",
    highlight: false,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800"
  },
  // Massas
  {
    id: 5,
    name: "Gnocchi ao Funghi Trufado",
    description: "Massa fresca de batata, molho cremoso de cogumelos selvagens e azeite trufado.",
    price: 68.00,
    category: "massas",
    highlight: true,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Carbonara Autêntica",
    description: "Sem creme de leite. Gema caipira, pecorino romano, guanciale e pimenta negra.",
    price: 62.00,
    category: "massas",
    highlight: true,
    image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Risoto de Camarão",
    description: "Arroz arbóreo, camarões rosa grandes, limão siciliano e parmesão.",
    price: 79.00,
    category: "massas",
    highlight: false,
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Lasagna Bolognese",
    description: "Camadas finas de massa, ragu de carne cozido por 6h e molho bechamel.",
    price: 58.00,
    category: "massas",
    highlight: false,
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&q=80&w=800"
  },
  // Entradas
  {
    id: 9,
    name: "Burrata Caprese",
    description: "Burrata cremosa, tomates confit, pesto de manjericão fresco e torradas.",
    price: 55.00,
    category: "entradas",
    highlight: true,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    name: "Carpaccio Clássico",
    description: "Lâminas finíssimas de carne crua, alcaparras, parmesão e mostarda.",
    price: 48.00,
    category: "entradas",
    highlight: false,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    name: "Bruschetta Pomodoro",
    description: "Pão italiano tostado, tomates frescos, alho e manjericão.",
    price: 32.00,
    category: "entradas",
    highlight: false,
    image: "https://trattorialapasta.com/cms-data/blog/menu/bruschetta-al-pomodoro/image/bruschetta-al-pomodoro.jpg"
  },
  {
    id: 12,
    name: "Dadinhos de Queijo Coalho",
    description: "Crocantes por fora, macios por dentro. Acompanha geleia de pimenta.",
    price: 35.00,
    category: "entradas",
    highlight: false,
    image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&q=80&w=800"
  },
  // Sobremesas
  {
    id: 13,
    name: "Volcán de Dulce de Leche",
    description: "Petit gateau de doce de leite argentino com sorvete de baunilha.",
    price: 32.00,
    category: "sobremesas",
    highlight: true,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    name: "Tiramisu Fuego",
    description: "A clássica receita italiana com um toque de conhaque.",
    price: 28.00,
    category: "sobremesas",
    highlight: false,
    image: "https://desxestal.com/wp-content/uploads/2021/04/desxestal_tiramisu-scaled.jpg"
  },
  {
    id: 15,
    name: "Cheesecake de Frutas Vermelhas",
    description: "Base crocante, creme suave e calda rústica de frutas.",
    price: 29.00,
    category: "sobremesas",
    highlight: false,
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=800"
  },
  // Vinhos
  {
    id: 16,
    name: "Malbec Reserva",
    description: "Vinho tinto encorpado, notas de ameixa e baunilha. Safra especial.",
    price: 140.00,
    category: "vinhos",
    highlight: false,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 17,
    name: "Fuego Signature Drink",
    description: "Gin, infusão de hibisco, tônica e defumação de alecrim.",
    price: 38.00,
    category: "vinhos",
    highlight: true,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800"
  }
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('destaques');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredItems = activeCategory === 'destaques' 
    ? MENU_ITEMS.filter(item => item.highlight)
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-600 selection:text-white pb-20">
      
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-stone-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer z-50">
            <div className="relative">
               <div className="absolute inset-0 bg-orange-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity rounded-full"></div>
               <Flame className="text-orange-500 relative z-10" size={28} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-widest text-white leading-none">FUEGO</span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-orange-500 font-medium">Prime Steakhouse</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider text-stone-400">
            <a href="#menu" className="hover:text-white transition-colors">CARDÁPIO</a>
            <a href="#reservas" className="hover:text-white transition-colors">RESERVAS</a>
            <a href="#experience" className="hover:text-white transition-colors">EXPERIÊNCIA</a>
          </div>

          <button className="hidden md:block bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20">
            RESERVAR
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white z-50">
             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`
          fixed inset-0 bg-stone-950 z-40 flex flex-col justify-start pt-32 items-center gap-8 transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}>
           <a href="#menu" onClick={toggleMobileMenu} className="text-2xl font-serif font-bold text-white hover:text-orange-500">CARDÁPIO</a>
           <a href="#reservas" onClick={toggleMobileMenu} className="text-2xl font-serif font-bold text-white hover:text-orange-500">RESERVAS</a>
           <a href="#experience" onClick={toggleMobileMenu} className="text-2xl font-serif font-bold text-white hover:text-orange-500">EXPERIÊNCIA</a>
           <button onClick={toggleMobileMenu} className="bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest mt-4">
             FAZER RESERVA
           </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2560"
            alt="Steak Background"
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow" 
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0c0a09_100%)]"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 mt-16 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={12} fill="currentColor" />
            Gastronomia Premiada
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            O sabor que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">incendeia</span> os sentidos.
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            No Fuego Prime, unimos a precisão técnica da alta gastronomia com a intensidade do fogo. Uma experiência inesquecível a cada prato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="group bg-white text-stone-950 px-8 py-4 rounded-none border border-white font-bold tracking-wider hover:bg-stone-200 transition-all flex items-center justify-center gap-2">
              VER CARDÁPIO
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#reservas" className="group px-8 py-4 rounded-none border border-white/30 text-white font-bold tracking-wider hover:bg-white/10 transition-all backdrop-blur-sm">
              RESERVAR MESA
            </a>
          </div>
        </div>
      </header>

      {/* NEW SECTION: INFO BAR */}
      <div className="relative z-20 bg-stone-100 border-b-4 border-orange-600 text-stone-900 py-12 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 group hover:-translate-y-1 transition-transform duration-300">
               <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-orange-600 shadow-inner shrink-0">
                 <Clock size={32} strokeWidth={2.5} />
               </div>
               <div className="font-sans text-center md:text-left">
                 <h3 className="font-bold text-2xl text-stone-900 mb-1">Horários</h3>
                 <p className="text-stone-700 font-bold text-lg leading-tight">Seg a Sex: 12:00 às 23:00</p>
                 <p className="text-stone-700 font-bold text-lg leading-tight">Sáb e Dom: 12:30 às 16:30</p>
               </div>
            </div>

            {/* Divider: Horizontal on mobile, Vertical on Desktop */}
            <div className="w-24 h-px bg-stone-300 md:w-px md:h-16 my-4 md:my-0"></div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 group hover:-translate-y-1 transition-transform duration-300">
               <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-orange-600 shadow-inner shrink-0">
                 <MapPin size={32} strokeWidth={2.5} />
               </div>
               <div className="font-sans text-center md:text-left">
                 <h3 className="font-bold text-2xl text-stone-900 mb-1">Localização</h3>
                 <p className="text-stone-700 font-bold text-lg leading-tight">Av. Gastronomia, 1200 - Jardins</p>
                 <p className="text-stone-500 font-semibold text-sm">Estacionamento com Manobrista</p>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. MENU SECTION */}
      <section id="menu" className="py-24 bg-stone-950 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nossas Criações</h2>
            <div className="w-24 h-1 bg-orange-600"></div>
          </div>

          {/* Categories Tabs */}
          <div className="flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar touch-pan-x px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0
                  ${activeCategory === cat.id 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/40' 
                    : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:border-stone-600 hover:text-white'}
                `}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid (Netflix Style Scroll on Mobile, Grid on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {filteredItems.map((item) => (
               <div key={item.id} className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-900/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10">
                 {/* Image */}
                 <div className="h-48 overflow-hidden relative">
                   <img 
                     src={item.image} 
                     alt={item.name} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-80"></div>
                   <div className="absolute bottom-3 left-3">
                     <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                       R$ {item.price.toFixed(2)}
                     </span>
                   </div>
                 </div>
                 
                 {/* Content */}
                 <div className="p-5">
                   <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-orange-400 transition-colors">
                     {item.name}
                   </h3>
                   <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-2">
                     {item.description}
                   </p>
                   <button className="text-orange-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1 group/btn">
                     Adicionar <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. RESERVATION SECTION (MOVED UP) */}
      <section id="reservas" className="py-24 bg-stone-100 text-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <div>
              <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">
                <Calendar size={16} />
                Agendamento Online
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
                Reserve sua <br/> Experiência.
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Garanta sua mesa e desfrute de momentos únicos. Para grupos acima de 8 pessoas, entre em contato diretamente pelo telefone.
              </p>
              
              {/* Phone Contact Block */}
              <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-200 w-fit">
                 <div className="w-12 h-12 bg-orange-600/10 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                    <Phone size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Reservas em Grupo</p>
                    <a href="tel:+5511999999999" className="text-xl font-serif font-bold text-stone-900 hover:text-orange-600 transition-colors">
                      (11) 99999-9999
                    </a>
                 </div>
              </div>

              <div className="text-sm text-stone-500">
                <p>Use o formulário ao lado para selecionar sua data e horário preferidos.</p>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] shadow-2xl border border-stone-200">
              <h3 className="font-serif font-bold text-3xl text-stone-900 mb-8">Solicitar Reserva</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Esta é uma versão de demonstração. O sistema de reservas está disponível na versão completa.'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-stone-800">Data</label>
                     <div className="relative">
                       <input type="date" className="w-full bg-white border border-stone-300 rounded-lg p-3 text-base text-stone-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-stone-800">Horário</label>
                     <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-stone-300 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                       <Clock size={20} className="text-stone-600" />
                       <select className="bg-transparent w-full outline-none text-base text-stone-900">
                         {TIME_SLOTS.map((time) => (
                           <option key={time} value={time}>{time}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-stone-800">Número de Pessoas</label>
                   <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-stone-300 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                     <Users size={20} className="text-stone-600" />
                     <select className="bg-transparent w-full outline-none text-base text-stone-900">
                       <option>1 Pessoa</option>
                       <option>2 Pessoas</option>
                       <option>3 Pessoas</option>
                       <option>4 Pessoas</option>
                       <option>5 Pessoas</option>
                       <option>6 Pessoas</option>
                       <option>7 Pessoas</option>
                       <option>8 Pessoas</option>
                     </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-stone-800">Mesa Preferencial</label>
                   <select className="w-full bg-white border border-stone-300 rounded-lg p-3 text-base text-stone-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                     <option>Salão Principal</option>
                     <option>Varanda</option>
                     <option>Perto da Janela</option>
                     <option>Booth Privativo</option>
                   </select>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-all shadow-xl text-base">
                    CONFIRMAR MESA
                  </button>
                  <p className="text-center text-xs text-stone-500 mt-4">
                    * Sistema de reservas disponível na versão completa.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* NEW SECTION: ABOUT US (MOVED DOWN) */}
      <section id="experience" className="py-24 bg-stone-900 relative">
        {/* Decorative Background Elements Container with Overflow Hidden */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Image Composition REMOVED */}

            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <span className="text-orange-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
                  <ChefHat size={16} />
                  Nossa História
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  A Alma do Fogo. <br/>
                  <span className="text-stone-500">A Arte da Carne.</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-stone-300 font-light leading-relaxed">
                <p>
                  O Fuego Prime nasceu de uma obsessão: dominar o elemento mais primitivo da culinária. 
                  Inspirado nas parrillas argentinas e nos steakhouses nova-iorquinos, criamos um santuário 
                  onde o fogo não é apenas um método de cozimento, mas o ingrediente principal.
                </p>
                
                <div className="border-l-4 border-orange-600 pl-6 py-2 my-6 bg-stone-800/30 rounded-r-lg">
                  <Quote className="text-orange-600 mb-2 opacity-50" size={24} />
                  <p className="font-serif italic text-xl text-white">
                    "Não servimos apenas carne. Servimos tempo, paciência e respeito pelo ingrediente."
                  </p>
                  <p className="text-sm text-orange-400 mt-2 font-bold uppercase tracking-wide">— Chef Alessandro Rossi</p>
                </div>

                <p>
                  Sob o comando do renomado Chef Alessandro Rossi, nossa cozinha prioriza ingredientes locais 
                  de origem controlada e cortes de gado criado solto. Cada prato é uma sinfonia de texturas e sabores defumados, 
                  projetados para despertar memórias e criar novos momentos inesquecíveis.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-8">
                <div>
                   <h4 className="text-3xl font-serif font-bold text-white">15+</h4>
                   <p className="text-xs text-stone-500 uppercase tracking-widest">Anos de Tradição</p>
                </div>
                <div className="w-px h-10 bg-stone-700"></div>
                <div>
                   <h4 className="text-3xl font-serif font-bold text-white">12k</h4>
                   <p className="text-xs text-stone-500 uppercase tracking-widest">Clientes Felizes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-stone-950 pt-20 pb-10 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                 <Flame className="text-orange-600" size={24} fill="currentColor" />
                 <span className="font-serif text-2xl font-bold text-white tracking-widest">FUEGO</span>
              </div>
              <p className="text-stone-500 text-sm tracking-widest uppercase">Prime Steakhouse & Pasta</p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-500 text-xs gap-4 text-center md:text-left">
            <p>&copy; 2024 Fuego Prime. All rights reserved.</p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full bg-orange-600"></span>
              Projeto conceitual desenvolvido para demonstração
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;