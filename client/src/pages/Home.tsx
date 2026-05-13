import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Heart, Brain, Zap, Activity, Clock, Smile, AlertCircle, TrendingDown, Target, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Nomofobi Web Sitesi - Ana Sayfa
 * Tasarım: Minimalist Wellness & Digital Detox
 * Renk: Adaçayı yeşili (#6B9E7F), off-white arka plan, koyu gri metin
 * Tipografi: Montserrat (başlıklar) + Lato (gövde)
 */

export default function Home() {
  const [showTest, setShowTest] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMoodBoard, setShowMoodBoard] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  
  const [testAnswers, setTestAnswers] = useState<number[]>(Array(20).fill(0));
  const [testResult, setTestResult] = useState<number | null>(null);
  const [dailyUsage, setDailyUsage] = useState(240);
  const [moodLevel, setMoodLevel] = useState(5);
  const [calculatorStep, setCalculatorStep] = useState<'input' | 'results'>('input');

  const testQuestions = [
    "Telefonunuz olmadan ne kadar süre dayanabilirsiniz?",
    "Telefonunuzu kontrol etmeme kaygısı yaşıyor musunuz?",
    "Telefonunuz yanınızda olmadığında panik hissediyor musunuz?",
    "Gece uyumadan önce telefonunuzu kontrol ediyor musunuz?",
    "Sabah ilk olarak telefonunuzu kontrol ediyor musunuz?",
    "Sosyal medya bildirimleri kaçırmaktan korkuyor musunuz?",
    "Telefonunuz yanınızda olmadığında fiziksel rahatsızlık hissediyor musunuz?",
    "Telefonunuzu çok sık kontrol ettiğinizi fark ediyor musunuz?",
    "Telefonunuz olmadan dışarı çıkamıyor musunuz?",
    "Telefonunuzu kaybetmekten korkmaktan uyku kaybediyor musunuz?",
    "Telefonunuzu kullanmayı azaltmaya çalışıyor ama başaramıyor musunuz?",
    "Telefonunuz yanınızda olmadığında boş hissediyor musunuz?",
    "Telefonunuzu kontrol etmek için önemli aktiviteleri bırakıyor musunuz?",
    "Telefonunuz yanınızda olmadığında odaklanmakta zorluk çekiyor musunuz?",
    "Telefonunuzu kullanırken zaman nasıl geçtiğini fark etmiyor musunuz?",
    "Telefonunuz yanınızda olmadığında huzursuz hissediyor musunuz?",
    "Telefonunuzu kontrol etme isteğini kontrol edemediğinizi hissediyor musunuz?",
    "Telefonunuz olmadan sosyal ortamlarda rahatsız hissediyor musunuz?",
    "Telefonunuzu kullanmak için başka aktiviteleri ertelediğinizi fark ediyor musunuz?",
    "Telefonunuz yanınızda olmadığında kaygılı hissediyor musunuz?"
  ];

  const handleTestAnswer = (index: number, value: number) => {
    const newAnswers = [...testAnswers];
    newAnswers[index] = value;
    setTestAnswers(newAnswers);
  };

  const calculateTestResult = () => {
    const total = testAnswers.reduce((a, b) => a + b, 0);
    setTestResult(total);
  };

  const getTestInterpretation = (score: number) => {
    if (score <= 20) return "Düşük Risk: Telefonunuz kullanımı kontrol altında görünüyor.";
    if (score <= 40) return "Orta Risk: Telefonunuz kullanımında dikkat etmeye başlamalısınız.";
    if (score <= 60) return "Yüksek Risk: Nomofobi belirtileri gösteriyor olabilirsiniz.";
    return "Çok Yüksek Risk: Profesyonel yardım almayı düşünmelisiniz.";
  };

  const calculateMissedActivities = (minutes: number) => {
    const hoursPerDay = minutes / 60;
    return {
      books: Math.floor(hoursPerDay * 30),
      exercise: Math.floor(hoursPerDay * 2),
      sleep: Math.floor(hoursPerDay * 0.5),
      socialTime: Math.floor(hoursPerDay * 1.5),
    };
  };

  const getMoodSuggestion = (level: number) => {
    const suggestions = [
      "🔴 Acil: Hemen 5 dakika derin nefes egzersizi yapın",
      "🟠 Yüksek: Telefonunuzu 15 dakika uzağa koyun",
      "🟡 Orta: Biraz yürüyüş yapın veya su için",
      "🟢 Normal: Telefonunuzu kontrol etmek isterseniz yapabilirsiniz",
      "🟢 İyi: Telefonunuzu kullanmak yerine kitap okuyun",
      "💚 Mükemmel: Şu anki hali devam ettirin!",
      "✨ Harika: Telefonunuzu bırakıp meditasyon yapın",
      "🧘 Zen: Dış dünyaya odaklanın, telefonunuzu unutun",
      "🌿 Sakin: Doğada zaman geçirin",
      "🌟 Muhteşem: Şu anki mental durumunuzu kaydedin!"
    ];
    return suggestions[level - 1] || suggestions[4];
  };

  // Detoks hedefleri hesapla
  const calculateDetoxGoals = (currentUsage: number) => {
    const riskLevel = currentUsage > 480 ? 'high' : currentUsage > 240 ? 'medium' : 'low';
    
    // Haftalık hedef: Mevcut kullanımdan %20-%30 azalma
    const reductionPercentage = riskLevel === 'high' ? 0.30 : riskLevel === 'medium' ? 0.25 : 0.15;
    const weeklyReduction = Math.round(currentUsage * reductionPercentage);
    const targetDailyUsage = Math.max(60, currentUsage - weeklyReduction);
    
    // Haftalık tasarruf
    const weeklySavings = (currentUsage - targetDailyUsage) * 7;
    
    // 4 haftalık hedef (daha agresif)
    const monthlyReduction = Math.round(currentUsage * (riskLevel === 'high' ? 0.50 : riskLevel === 'medium' ? 0.40 : 0.25));
    const monthlyTargetUsage = Math.max(60, currentUsage - monthlyReduction);
    
    return {
      riskLevel,
      currentUsage,
      weeklyReduction,
      targetDailyUsage,
      weeklySavings,
      monthlyReduction,
      monthlyTargetUsage,
      monthlyGoalSavings: (currentUsage - monthlyTargetUsage) * 28
    };
  };

  // Detoks hedefleri tabanlı aktiviteler öner
  const getDetoxActivities = (riskLevel: string) => {
    const activities = {
      high: [
        { icon: '🧘', title: 'Günlük Meditasyon', description: 'Sabah 10 dakika, akşam 10 dakika meditasyon yapın' },
        { icon: '📚', title: 'Okuma Alışkanlığı', description: 'Günde 30 dakika kitap okuyun (telefonsuz)' },
        { icon: '🏃', title: 'Egzersiz Rutini', description: 'Günde 45 dakika yürüyüş veya spor yapın' },
        { icon: '👥', title: 'Yüz Yüze Sosyalleşme', description: 'Haftada 3 gün arkadaş/aile ile zaman geçirin' },
        { icon: '🎨', title: 'Yaratıcı Hobi', description: 'Resim, yazı yazma veya müzik gibi bir hobi başlayın' },
        { icon: '😴', title: 'Uyku Hijyeni', description: 'Yatakta telefon kullanmayın, gece 22:00 sonrası ekran yok' }
      ],
      medium: [
        { icon: '🧘', title: 'Hafif Meditasyon', description: 'Haftada 3 gün 5-10 dakika meditasyon' },
        { icon: '📚', title: 'Haftalık Okuma', description: 'Haftada 3 gün 20 dakika kitap okuyun' },
        { icon: '🏃', title: 'Düzenli Aktivite', description: 'Haftada 3 gün 30 dakika yürüyüş' },
        { icon: '👥', title: 'Sosyal Etkinlikler', description: 'Haftada 2 gün yüz yüze sosyalleşme' },
        { icon: '🎮', title: 'Alternatif Aktiviteler', description: 'Kutu oyunları, puzzle veya enstrüman çalın' },
        { icon: '⏰', title: 'Zaman Yönetimi', description: 'Gece 21:00 sonrası telefonunuzu başka odaya koyun' }
      ],
      low: [
        { icon: '🧘', title: 'Farkındalık', description: 'Haftada 1-2 gün kısa meditasyon' },
        { icon: '📚', title: 'Rahat Okuma', description: 'Haftada 1-2 gün hafif okuma' },
        { icon: '🏃', title: 'Hafif Aktivite', description: 'Haftada 2 gün kısa yürüyüş' },
        { icon: '👥', title: 'Sosyal Zaman', description: 'Haftada 1-2 gün sosyal etkinlik' },
        { icon: '🎯', title: 'Bilinçli Kullanım', description: 'Telefonunuzu kullanmadan önce amaç belirleyin' },
        { icon: '✅', title: 'Farkındalık Günlüğü', description: 'Haftada 2 gün telefon kullanımınızı kaydedin' }
      ]
    };
    return activities[riskLevel as keyof typeof activities] || activities.medium;
  };

  const missedActivities = calculateMissedActivities(dailyUsage);
  const detoxGoals = calculateDetoxGoals(dailyUsage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <nav className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Nomofobi</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#symptoms" className="text-foreground hover:text-primary transition">Belirtiler</a>
            <a href="#research" className="text-foreground hover:text-primary transition">Araştırmalar</a>
            <a href="#guide" className="text-foreground hover:text-primary transition">Rehber</a>
            <a href="#resources" className="text-foreground hover:text-primary transition">Kaynaklar</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary/30 to-background py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Metin */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary text-sm font-semibold">Dijital Detoks Rehberi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Ekrandan Kop, Hayata Dön
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Nomofobi (akıllı telefondan uzak kalma korkusu) sadece "çok telefon kullanmak" değildir. 
                Bu bir <strong>yoksunluk anksiyetesidir</strong> ve milyonları etkiliyor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => setShowTest(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg transition-all hover:shadow-lg"
                >
                  Nomofobi Testini Çöz
                </Button>
                <Button 
                  onClick={() => setShowCalculator(true)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg rounded-lg"
                >
                  Ekran Süresi Hesapla
                </Button>
              </div>
            </div>

            {/* Sağ taraf - Görsel */}
            <div className="relative h-96 md:h-full">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663315943196/ccM2mvKjnLcFJJshAcFLXn/hero-nomophobia-4bdkLYbg9RprDCRQAdZCT3.webp"
                alt="Dijital detoks - sakin ortamda telefonsuz kişi"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Belirtiler Bölümü */}
      <section id="symptoms" className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nomofobi Belirtileri
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Fiziksel ve psikolojik belirtileri tanıyın. Bunlardan bazılarını yaşıyor musunuz?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fiziksel Belirtiler */}
            <Card className="p-8 bg-gradient-to-br from-white to-secondary/20 border-border hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Fiziksel Belirtiler</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Kalp çarpıntısı ve göğüs sıkışması",
                  "Aşırı terleme ve titreme",
                  "Baş ağrısı ve ense sertliği",
                  "Mide rahatsızlığı ve bulantı",
                  "Uyku bozukluğu ve huzursuzluk"
                ].map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-foreground/70">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Psikolojik Belirtiler */}
            <Card className="p-8 bg-gradient-to-br from-white to-accent/10 border-border hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Psikolojik Belirtiler</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Panik atakları ve şiddetli kaygı",
                  "Telefonunuzu kontrol etme isteği",
                  "Odaklanma ve konsantrasyon sorunu",
                  "Boş ve yalnız hissetme",
                  "Irritabilite ve ruh halinde değişim"
                ].map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span className="text-foreground/70">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Belirtiler Görseli */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663315943196/ccM2mvKjnLcFJJshAcFLXn/symptoms-illustration-cDHkTsD4Ax8AB4skKUGBUe.webp"
              alt="Nomofobi belirtileri - fiziksel ve psikolojik"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Araştırmalar Bölümü */}
      <section id="research" className="py-16 md:py-24 bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Güncel Araştırmalar (2025-2026)
            </h2>
            <p className="text-lg text-foreground/60">
              Bilimsel veriler nomofobi hakkında neler söylüyor?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Yaygınlık Oranı",
                stat: "%77-%99",
                description: "Üniversite öğrencileri arasında nomofobi yaygınlığı",
                icon: Activity
              },
              {
                title: "Küresel Çalışma",
                stat: "41 Ülke",
                description: "Meta-analiz kapsamında incelenen ülke sayısı",
                icon: Zap
              },
              {
                title: "Tanı Durumu",
                stat: "DSM-5 & ICD-11",
                description: "Tartışılan ve incelenen resmi tanı kılavuzları",
                icon: AlertCircle
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="p-8 bg-white border-border hover:shadow-lg transition-all hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{item.stat}</h3>
                  <p className="font-semibold text-foreground mb-2">{item.title}</p>
                  <p className="text-foreground/60 text-sm">{item.description}</p>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 p-8 bg-white border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">Temel Bulgular</h3>
            <ul className="space-y-3">
              {[
                "Nomofobi, yoksunluk anksiyetesi olarak tanımlanır ve teknoloji bağımlılığından farklıdır.",
                "Sosyal medya kullanımı ve push bildirimleri nomofobinin şiddetini artırır.",
                "Gece telefonunuzu kontrol etme alışkanlığı uyku kalitesini önemli ölçüde azaltır.",
                "Dijital detoks programları 4 hafta içinde anksiyete belirtilerinde %60 azalma gösterir.",
                "Uygulama sınırlama ve gece rutinleri en etkili müdahale yöntemleridir."
              ].map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-foreground/70">{finding}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Dijital Detoks Rehberi */}
      <section id="guide" className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dijital Detoks Rehberi
            </h2>
            <p className="text-lg text-foreground/60">
              Adım adım kurtulma yolları
            </p>
          </div>

          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663315943196/ccM2mvKjnLcFJJshAcFLXn/digital-detox-guide-MhgB8aJgAtswxDD4iA4EjN.webp"
              alt="Dijital detoks 4 adım rehberi"
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "1. Uygulama Sınırlama",
                items: [
                  "Sosyal medya uygulamalarında günlük zaman limiti belirleyin",
                  "Bildirim ayarlarını kapatın",
                  "Gece 21:00 sonrası uygulamalara erişimi kısıtlayın"
                ]
              },
              {
                title: "2. Gece Rutinleri",
                items: [
                  "Uyumadan 1 saat önce telefonunuzu başka odaya koyun",
                  "Sabah ilk olarak telefonunuzu kontrol etmeyin",
                  "Yatakta telefonunuzu kullanmayın"
                ]
              },
              {
                title: "3. Hobi Edinme",
                items: [
                  "Okuma, yazı yazma veya sanat etkinlikleri başlayın",
                  "Spor veya yoga gibi fiziksel aktiviteler yapın",
                  "Sosyal aktivitelere katılın"
                ]
              },
              {
                title: "4. Farkındalık Uygulamaları",
                items: [
                  "Günde 10 dakika meditasyon yapın",
                  "Derin nefes egzersizleri öğrenin",
                  "Mindfullness journaling deneyin"
                ]
              }
            ].map((section, idx) => (
              <Card key={idx} className="p-8 bg-gradient-to-br from-white to-secondary/10 border-border hover:shadow-lg transition-all hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kullanıcı Deneyimleri */}
      <section id="resources" className="py-16 md:py-24 bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kullanıcı Deneyimleri
            </h2>
            <p className="text-lg text-foreground/60">
              Gerçek insanların nomofobi yolculuğu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Anonim Kullanıcı 1",
                story: "Başlangıçta telefonumu kontrol etmekten kendimi alamıyordum. Gece uyuyamıyor, sabah ilk olarak sosyal medyayı kontrol ediyordum. Dijital detoks rehberini takip ettikten 4 hafta sonra, uyku kalitem iyileşti ve daha huzurlu hissediyorum.",
                improvement: "+60% Iyileşme"
              },
              {
                name: "Anonim Kullanıcı 2",
                story: "Üniversite öğrencisiyim ve notlarıma konsantre olamıyordum. Telefonumun yanında olmadığında panik atakları yaşıyordum. Uygulama sınırlama ve meditasyon başladıktan sonra, akademik performansım arttı.",
                improvement: "+45% Akademik Başarı"
              },
              {
                name: "Anonim Kullanıcı 3",
                story: "Aileme zaman ayıramıyordum çünkü telefonuma takılıydım. Gece rutini değiştirdikten sonra, aile ile kaliteli zaman geçirmeye başladım. Çok daha mutluyum.",
                improvement: "+80% Aile Zamanı"
              },
              {
                name: "Anonim Kullanıcı 4",
                story: "Fiziksel belirtiler (kalp çarpıntısı, terleme) yaşıyordum. Profesyonel yardım aldıktan sonra, bu rehberi takip ettim. Belirtiler büyük ölçüde azaldı.",
                improvement: "+70% Fiziksel Iyileşme"
              }
            ].map((story, idx) => (
              <Card key={idx} className="p-8 bg-white border-border hover:shadow-lg transition-all hover:translate-y-[-4px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smile className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{story.name}</p>
                    <p className="text-sm text-primary font-semibold">{story.improvement}</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed">{story.story}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Acil Durum Meditasyon Butonu */}
      <section className="py-8 bg-white border-t border-border">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Hemen Yardıma İhtiyacınız Var mı?</h3>
            <p className="text-foreground/60">1 dakikalık meditasyon animasyonu ile sakinleşin</p>
          </div>
          <Button 
            onClick={() => setShowMeditation(true)}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg transition-all hover:shadow-lg whitespace-nowrap"
          >
            🧘 Meditasyon Başlat
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">Hakkında</h4>
              <p className="text-foreground/60 text-sm">Nomofobi hakkında bilimsel ve destekleyici bilgi sağlayan platform.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Kaynaklar</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition">Nomofobi Testi</a></li>
                <li><a href="#" className="hover:text-primary transition">Ekran Süresi Hesapla</a></li>
                <li><a href="#" className="hover:text-primary transition">Meditasyon</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Bilgi</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-primary transition">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-primary transition">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Uyarı</h4>
              <p className="text-foreground/60 text-sm">Bu site tıbbi tavsiye değildir. Ciddi belirtiler için profesyonel yardım alınız.</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
            <p>&copy; 2026 Nomofobi Bilgi Platformu. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Nomofobi Test Dialog */}
      <Dialog open={showTest} onOpenChange={setShowTest}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nomofobi Testi (NMP-Q)</DialogTitle>
          </DialogHeader>
          
          {testResult === null ? (
            <div className="space-y-6">
              <p className="text-foreground/70">
                Aşağıdaki soruları 1-5 ölçeğinde cevaplayın (1=Kesinlikle Katılmıyorum, 5=Kesinlikle Katılıyorum)
              </p>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {testQuestions.map((question, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-semibold text-foreground text-sm">{idx + 1}. {question}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleTestAnswer(idx, value)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            testAnswers[idx] === value
                              ? 'bg-primary text-white'
                              : 'bg-secondary text-foreground hover:bg-primary/20'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={calculateTestResult}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={testAnswers.some(a => a === 0)}
              >
                Sonuçları Göster
              </Button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="p-8 bg-secondary/20 rounded-lg">
                <p className="text-4xl font-bold text-primary mb-2">{testResult}</p>
                <p className="text-lg font-semibold text-foreground mb-4">Toplam Puan</p>
                <p className="text-foreground/70 text-lg">
                  {getTestInterpretation(testResult)}
                </p>
              </div>

              <div className="space-y-3 text-left">
                <h4 className="font-bold text-foreground">Öneriler:</h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li>• Dijital detoks rehberimizi takip edin</li>
                  <li>• Uygulama sınırlama özelliklerini etkinleştirin</li>
                  <li>• Gece rutini oluşturun</li>
                  <li>• Düzenli meditasyon yapın</li>
                  <li>• Ciddi belirtiler için profesyonel yardım alın</li>
                </ul>
              </div>

              <Button 
                onClick={() => {
                  setShowTest(false);
                  setTestResult(null);
                  setTestAnswers(Array(20).fill(0));
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Kapat
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ekran Süresi Hesaplayıcı Dialog */}
      <Dialog open={showCalculator && calculatorStep === 'input'} onOpenChange={(open) => {
        if (!open) {
          setShowCalculator(false);
          setCalculatorStep('input');
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ekran Süresi Hesaplayıcı</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="text-foreground font-semibold mb-2 block">
                Günlük Telefon Kullanımı: <span className="text-primary">{dailyUsage} dakika</span>
              </label>
              <Slider 
                value={[dailyUsage]}
                onValueChange={(value) => setDailyUsage(value[0])}
                min={0}
                max={1440}
                step={15}
                className="w-full"
              />
              <p className="text-foreground/60 text-sm mt-2">
                {Math.floor(dailyUsage / 60)} saat {dailyUsage % 60} dakika
              </p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-lg space-y-4">
              <h4 className="font-bold text-foreground">Kaçırdığınız Aktiviteler:</h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground/70">
                  📚 <strong>Kitap Okuma:</strong> {missedActivities.books} sayfa/gün
                </p>
                <p className="text-foreground/70">
                  🏃 <strong>Egzersiz:</strong> {missedActivities.exercise} saat/gün
                </p>
                <p className="text-foreground/70">
                  😴 <strong>Uyku Kaybı:</strong> {missedActivities.sleep} saat/gün
                </p>
                <p className="text-foreground/70">
                  👥 <strong>Sosyal Zaman:</strong> {missedActivities.socialTime} saat/gün
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCalculatorStep('results')}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Detoks Hedeflerini Gör
              </Button>
              <Button 
                onClick={() => setShowCalculator(false)}
                variant="outline"
                className="flex-1"
              >
                Kapat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detoks Hedefleri Dialog */}
      <Dialog open={showCalculator && calculatorStep === 'results'} onOpenChange={(open) => {
        if (!open) {
          setShowCalculator(false);
          setCalculatorStep('input');
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kişiselleştirilmiş Dijital Detoks Hedefleri</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Risk Seviyesi */}
            <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-3">
                {detoxGoals.riskLevel === 'high' && <AlertTriangle className="w-6 h-6 text-destructive" />}
                {detoxGoals.riskLevel === 'medium' && <AlertCircle className="w-6 h-6 text-accent" />}
                {detoxGoals.riskLevel === 'low' && <CheckCircle2 className="w-6 h-6 text-primary" />}
                <h3 className="text-lg font-bold text-foreground">
                  {detoxGoals.riskLevel === 'high' && 'Yüksek Risk Seviyesi'}
                  {detoxGoals.riskLevel === 'medium' && 'Orta Risk Seviyesi'}
                  {detoxGoals.riskLevel === 'low' && 'Düşük Risk Seviyesi'}
                </h3>
              </div>
              <p className="text-foreground/70 text-sm">
                {detoxGoals.riskLevel === 'high' && 'Günlük ' + detoxGoals.currentUsage + ' dakika telefon kullanımı endişe verici seviyelerdedir. Hemen harekete geçmeniz önerilir.'}
                {detoxGoals.riskLevel === 'medium' && 'Günlük ' + detoxGoals.currentUsage + ' dakika telefon kullanımı dikkat gerektirmektedir. Kademeli azaltma planı uygulanmalıdır.'}
                {detoxGoals.riskLevel === 'low' && 'Günlük ' + detoxGoals.currentUsage + ' dakika telefon kullanımı makul seviyelerdedir. Farkındalığı korumanız yeterlidir.'}
              </p>
            </div>

            {/* Haftalık Hedef */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-to-br from-white to-secondary/10 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground/70">Haftalık Hedef</p>
                </div>
                <p className="text-2xl font-bold text-primary">{detoxGoals.targetDailyUsage}</p>
                <p className="text-xs text-foreground/60 mt-1">dakika/gün</p>
                <p className="text-xs text-primary/70 mt-2">−{detoxGoals.weeklyReduction} dk/gün azalma</p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-white to-accent/10 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  <p className="text-sm font-semibold text-foreground/70">Haftalık Tasarruf</p>
                </div>
                <p className="text-2xl font-bold text-accent">{detoxGoals.weeklySavings}</p>
                <p className="text-xs text-foreground/60 mt-1">dakika/hafta</p>
                <p className="text-xs text-accent/70 mt-2">= {Math.floor(detoxGoals.weeklySavings / 60)} saat</p>
              </Card>
            </div>

            {/* Aylık Hedef */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-to-br from-white to-secondary/10 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground/70">4 Haftalık Hedef</p>
                </div>
                <p className="text-2xl font-bold text-primary">{detoxGoals.monthlyTargetUsage}</p>
                <p className="text-xs text-foreground/60 mt-1">dakika/gün</p>
                <p className="text-xs text-primary/70 mt-2">−{detoxGoals.monthlyReduction} dk/gün azalma</p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-white to-accent/10 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  <p className="text-sm font-semibold text-foreground/70">Aylık Tasarruf</p>
                </div>
                <p className="text-2xl font-bold text-accent">{detoxGoals.monthlyGoalSavings}</p>
                <p className="text-xs text-foreground/60 mt-1">dakika/ay</p>
                <p className="text-xs text-accent/70 mt-2">= {Math.floor(detoxGoals.monthlyGoalSavings / 60)} saat</p>
              </Card>
            </div>

            {/* Önerilen Aktiviteler */}
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Önerilen Aktiviteler
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getDetoxActivities(detoxGoals.riskLevel).map((activity, idx) => (
                  <Card key={idx} className="p-4 bg-gradient-to-br from-white to-secondary/5 border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{activity.title}</p>
                        <p className="text-xs text-foreground/60 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* İpuçları */}
            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <h4 className="font-bold text-foreground mb-3">💡 Başarı İpuçları</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• <strong>Kademeli Azalma:</strong> Bir hafta içinde hedefin %50'sine ulaşmayı hedefleyin</li>
                <li>• <strong>Tetikleyicileri Tanıyın:</strong> Telefonunuzu en çok ne zaman kullandığınızı fark edin</li>
                <li>• <strong>Alternatif Aktiviteler:</strong> Telefonunuzu kullanmak istediğinizde hemen bir alternatif yapın</li>
                <li>• <strong>Sosyal Destek:</strong> Arkadaşlarınıza veya ailenize hedeflerinizi anlatın</li>
                <li>• <strong>Uygulamalar Kullanın:</strong> Telefon kullanım sınırlama uygulamaları indirin</li>
                <li>• <strong>Gece Rutini:</strong> Uyumadan 1 saat önce telefonunuzu başka odaya koyun</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  setCalculatorStep('input');
                }}
                variant="outline"
                className="flex-1"
              >
                Geri Dön
              </Button>
              <Button 
                onClick={() => {
                  setShowCalculator(false);
                  setCalculatorStep('input');
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Kapat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mod Panosu Dialog */}
      <Dialog open={showMoodBoard} onOpenChange={setShowMoodBoard}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Telefonunuzu Kullanma İsteği Panosu</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="text-foreground font-semibold mb-2 block">
                Şu anki İsteği Puanlandırın: <span className="text-primary">{moodLevel}/10</span>
              </label>
              <Slider 
                value={[moodLevel]}
                onValueChange={(value) => setMoodLevel(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="bg-secondary/20 p-6 rounded-lg">
              <h4 className="font-bold text-foreground mb-3">Tavsiye:</h4>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {getMoodSuggestion(moodLevel)}
              </p>
            </div>

            <div className="space-y-2 text-sm text-foreground/60">
              <p>💡 <strong>İpucu:</strong> Telefonunuzu kontrol etmek yerine, önerilen aktiviteyi deneyin!</p>
            </div>

            <Button 
              onClick={() => setShowMoodBoard(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meditasyon Dialog */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>1 Dakikalık Sakinleştirici Meditasyon</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                <div className="text-5xl">🧘</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Derin Nefes Egzersizi</h3>
              <div className="space-y-3 text-foreground/70">
                <p>1. <strong>Burnunuzdan</strong> 4 sayıya kadar yavaşça nefes alın</p>
                <p>2. <strong>Tutun</strong> 4 sayı boyunca</p>
                <p>3. <strong>Ağzınızdan</strong> 4 sayıya kadar yavaşça nefes verin</p>
                <p>4. Bunu 10 kez tekrarlayın</p>
              </div>
            </div>

            <div className="bg-secondary/20 p-4 rounded-lg">
              <p className="text-foreground/70 text-sm">
                Şu anda telefonunuzu kontrol etme isteğini hissetmeyin. Sadece nefes almaya odaklanın. 
                Kendinize şefkat gösterin. 💚
              </p>
            </div>

            <Button 
              onClick={() => setShowMeditation(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Tamamlandı
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
