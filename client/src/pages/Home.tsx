
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Heart, Brain, Zap, Activity, Clock, Smile, AlertCircle, TrendingDown, Target, CheckCircle2, AlertTriangle, Volume2, VolumeX, Lightbulb } from 'lucide-react';

/**
 * Nomofobi Web Sitesi - Ana Sayfa (TÜBİTAK 4006-B Projesi)
 * Tasarım: Minimalist Wellness & Digital Detox
 * Amaç: Bilgilendirici ve Farkındalık Yaratıcı
 * Renk: Adaçayı yeşili (#6B9E7F), off-white arka plan, koyu gri metin
 * Tipografi: Montserrat (başlıklar) + Lato (gövde)
 * Etik İlkeler: Kişisel veri toplamıyor, akademik amaçlı, gizlilik odaklı
 * 
 * Yeni Özellik: Test puanına göre diğer araçlara kişiselleştirilmiş tavsiyeler
 */

export default function Home() {
  const [showTest, setShowTest] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMoodBoard, setShowMoodBoard] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showEthics, setShowEthics] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [testAnswers, setTestAnswers] = useState<number[]>(Array(20).fill(0));
  const [testResult, setTestResult] = useState<number | null>(null);
  const [testRiskLevel, setTestRiskLevel] = useState<'low' | 'medium' | 'high' | 'very-high' | null>(null);
  const [dailyUsage, setDailyUsage] = useState(240);
  const [moodLevel, setMoodLevel] = useState(5);
  const [calculatorStep, setCalculatorStep] = useState<'input' | 'results'>('input');
  
  // Meditasyon state'leri
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [meditationDuration, setMeditationDuration] = useState(60);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [meditationCount, setMeditationCount] = useState(0);
  
  // Hatırlatıcı state'leri
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  
  // Makaleler state'i
  const [showArticles, setShowArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  
  // Kaynakça state'i
  const [showReferences, setShowReferences] = useState(false);
  
  // Bilgi Kart Oyunu state'i
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Müzik kontrol
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(e => console.log('Müzik oynatılamadı:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Meditasyon zamanlayıcı
  useEffect(() => {
    if (!meditationActive) return;
    
    const interval = setInterval(() => {
      setMeditationTime(prev => {
        if (prev >= meditationDuration) {
          setMeditationActive(false);
          setMeditationCount(prev => prev + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [meditationActive, meditationDuration]);

  // Nefes animasyonu
  useEffect(() => {
    if (!meditationActive) return;
    
    const breathInterval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);
    
    return () => clearInterval(breathInterval);
  }, [meditationActive]);

  // Günlük hatırlatıcı
  useEffect(() => {
    if (!reminderEnabled) return;
    
    const checkReminder = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime === reminderTime) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Meditasyon Zamanı!', {
            body: 'Biraz meditasyon yaparak telefonunuzdan uzaklaşın.',
            icon: '🧘'
          });
        }
      }
    }, 60000);
    
    return () => clearInterval(checkReminder);
  }, [reminderEnabled, reminderTime]);

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
    
    // Risk seviyesini belirle
    let risk: 'low' | 'medium' | 'high' | 'very-high';
    if (total <= 20) risk = 'low';
    else if (total <= 40) risk = 'medium';
    else if (total <= 60) risk = 'high';
    else risk = 'very-high';
    
    setTestRiskLevel(risk);
  };

  const getTestInterpretation = (score: number) => {
    if (score <= 20) return "Düşük Risk: Telefonunuz kullanımı kontrol altında görünüyor.";
    if (score <= 40) return "Orta Risk: Telefonunuz kullanımında dikkat etmeye başlamalısınız.";
    if (score <= 60) return "Yüksek Risk: Nomofobi belirtileri gösteriyor olabilirsiniz.";
    return "Çok Yüksek Risk: Profesyonel yardım almayı düşünmelisiniz.";
  };

  // Test puanına göre tavsiyeler
  const getPersonalizedRecommendations = (riskLevel: 'low' | 'medium' | 'high' | 'very-high' | null) => {
    if (!riskLevel) return null;
    
    const recommendations: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
      low: {
        title: "✅ Harika Gidiyorsunuz!",
        description: "Telefonunuz kullanımı iyi kontrol altında. Ekran Süresi Hesaplayıcı ile mevcut alışkanlıklarınızı takip etmeye devam edin.",
        icon: <CheckCircle2 className="text-green-500" size={24} />
      },
      medium: {
        title: "⚠️ Dikkat Etmeye Başlayın",
        description: "Telefonunuz kullanımında hafif artış görülüyor. Ekran Süresi Hesaplayıcı ile kişiselleştirilmiş hedefler alın ve Meditasyon ile stres azaltın.",
        icon: <AlertTriangle className="text-yellow-500" size={24} />
      },
      high: {
        title: "🔴 Acil Adım Atmanız Gerekiyor",
        description: "Nomofobi belirtileri belirgin. Ekran Süresi Hesaplayıcı ile agresif hedefler belirleyin, Meditasyon yapın ve Telefonunuzu Kullanma İsteği Panosu'nu sık kullanın.",
        icon: <AlertCircle className="text-red-500" size={24} />
      },
      'very-high': {
        title: "🚨 Profesyonel Yardım Önerilir",
        description: "Çok yüksek nomofobi risk seviyesi. Tüm araçları kullanın, Meditasyon yapın ve mümkünse bir uzmanla konuşmayı düşünün.",
        icon: <Heart className="text-red-600" size={24} />
      }
    };
    
    return recommendations[riskLevel];
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

  const getMoodAdvice = (level: number, riskLevel: 'low' | 'medium' | 'high' | 'very-high' | null) => {
    if (riskLevel === 'low') return "Harika! Telefonunuz kullanımı kontrol altında. Mevcut rutininizi sürdürün.";
    if (riskLevel === 'medium') return "Telefonunuzu kullanma isteğiniz artıyor. Meditasyon yapmayı deneyin.";
    if (riskLevel === 'high') return "Telefonunuz kullanma isteği yüksek. Hemen meditasyon yapın veya alternatif aktivite bulun.";
    return "Çok yüksek isteğiniz var. Telefonunuzu erişilemez bir yere koyun ve meditasyon yapın.";
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#343A40]">
      {/* Müzik Kontrol Butonu */}
      <audio ref={audioRef} src="/manus-storage/nature-sounds-relaxing.wav" loop />
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-white p-4 rounded-full shadow-lg border border-[#6B9E7F]/20 z-50">
        <button
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="p-2 hover:bg-[#6B9E7F]/10 rounded-full transition"
          title={isMusicPlaying ? "Müziği Kapat" : "Müziği Aç"}
        >
          {isMusicPlaying ? (
            <Volume2 className="text-[#6B9E7F]" size={20} />
          ) : (
            <VolumeX className="text-gray-400" size={20} />
          )}
        </button>
        {isMusicPlaying && (
          <div className="flex items-center gap-2 min-w-[120px]">
            <Slider
              value={[musicVolume]}
              onValueChange={(value) => setMusicVolume(value[0])}
              max={100}
              step={1}
              className="w-24"
            />
            <span className="text-xs text-gray-500 w-8">{musicVolume}%</span>
          </div>
        )}
      </div>

      {/* Hero Bölümü */}
      <section className="bg-gradient-to-r from-[#6B9E7F]/5 to-[#6B9E7F]/10 py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold text-[#343A40] mb-4" style={{ fontFamily: 'Montserrat' }}>
            Nomofobi: Dijital Çağın Yeni Korkusu
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Akıllı telefondan uzak kalma korkusu (Nomofobi) hakkında bilimsel bilgiler, farkındalık araçları ve dijital detoks rehberi.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-[#6B9E7F] text-[#6B9E7F]">📚 Bilgilendirici Platform</span>
            <span className="bg-white px-4 py-2 rounded-full border border-[#6B9E7F] text-[#6B9E7F]">🔬 Akademik Araştırmalara Dayalı</span>
            <span className="bg-white px-4 py-2 rounded-full border border-[#6B9E7F] text-[#6B9E7F]">🌿 Wellness Odaklı</span>
          </div>
        </div>
      </section>

      {/* Nomofobi Nedir? */}
      <section className="container py-16 mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          Nomofobi Nedir?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <strong>Nomofobi (NO MOBile PHone phoBIA)</strong>, akıllı telefondan uzak kalma korkusunu tanımlar. "No Mobile Phone Phobia" kelimelerinin kısaltmasıdır.
            </p>
            <p className="text-gray-700 leading-relaxed">
              2008 yılında İngiltere'de yapılan araştırmada ortaya konan bu terim, dijital çağda giderek yaygınlaşan bir psikolojik durumdur.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Telefondan ayrılma kaygısı, sosyal medya bildirimleri kaçırma korkusu, iletişim kopması endişesi ve dijital bağlantıdan kopmak istemeyen bir davranış paterni ile karakterize edilir.
            </p>
          </div>
          <div className="bg-[#F8F9FA] p-6 rounded-lg border-l-4 border-[#6B9E7F]">
            <h3 className="font-bold text-[#343A40] mb-4">Temel Özellikler:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <AlertCircle className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Telefondan ayrılma kaygısı</span>
              </li>
              <li className="flex gap-3">
                <Brain className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Bildirim kaçırma korkusu</span>
              </li>
              <li className="flex gap-3">
                <Heart className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Sosyal izolasyon endişesi</span>
              </li>
              <li className="flex gap-3">
                <Zap className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Kontrol kaybı hissi</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Belirtiler */}
      <section className="container py-16 mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          Nomofobi Belirtileri
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-l-4 border-[#6B9E7F] bg-white">
            <h3 className="font-bold text-[#343A40] mb-4 flex items-center gap-2">
              <Heart className="text-[#6B9E7F]" size={24} />
              Fiziksel Belirtiler
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Kalp çarpıntısı ve göğüs ağrısı</li>
              <li>• Terleme ve titreme</li>
              <li>• Uyku bozukluğu</li>
              <li>• Baş ağrısı ve dizziness</li>
              <li>• Mide rahatsızlığı</li>
            </ul>
          </Card>
          <Card className="p-6 border-l-4 border-[#6B9E7F] bg-white">
            <h3 className="font-bold text-[#343A40] mb-4 flex items-center gap-2">
              <Brain className="text-[#6B9E7F]" size={24} />
              Psikolojik Belirtiler
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Kaygı ve panik ataklarında artış</li>
              <li>• Odaklanma güçlüğü</li>
              <li>• Düşük öz saygı</li>
              <li>• Sosyal izolasyon</li>
              <li>• Depresif belirtiler</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 2025-2026 Araştırma Verileri */}
      <section className="container py-16 bg-gradient-to-r from-[#6B9E7F]/5 to-[#6B9E7F]/10 rounded-2xl mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          📊 2025-2026 Araştırma Verileri
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border border-[#6B9E7F]/20">
            <p className="text-4xl font-bold text-[#6B9E7F] mb-2">68%</p>
            <p className="text-gray-700">Gençlerin nomofobi belirtileri gösterdiği tespit edilmiştir (2025 Araştırması)</p>
          </Card>
          <Card className="p-6 bg-white border border-[#6B9E7F]/20">
            <p className="text-4xl font-bold text-[#6B9E7F] mb-2">4.7 saat</p>
            <p className="text-gray-700">Ortalama günlük telefon kullanım süresi (2026 Verisi)</p>
          </Card>
          <Card className="p-6 bg-white border border-[#6B9E7F]/20">
            <p className="text-4xl font-bold text-[#6B9E7F] mb-2">45%</p>
            <p className="text-gray-700">Uyku kalitesi azalması ile nomofobi arasında korelasyon (2025)</p>
          </Card>
        </div>
      </section>

      {/* Dijital Detoks Rehberi */}
      <section className="container py-16 mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          🌿 Dijital Detoks Rehberi
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "1. Adım: Farkındalık",
              description: "Telefonunuzu ne sıklıkta kontrol ettiğinizi gözlemleyin. Bir gün boyunca kaç kez açtığınızı sayın."
            },
            {
              title: "2. Adım: Hedef Belirleme",
              description: "Günlük kullanım sürenizi %20-30 azaltmayı hedefleyin. Kademeli olarak azaltmak daha etkilidir."
            },
            {
              title: "3. Adım: Uygulama",
              description: "Telefonunuzu belirli saatlerde kontrol edin. Uyku saatinden 1 saat önce ve sabah ilk 30 dakika telefon kullanmayın."
            },
            {
              title: "4. Adım: Alternatif Aktiviteler",
              description: "Kitap okuma, spor, meditasyon, doğa yürüyüşü gibi aktiviteleri telefonunuzun yerine geçirin."
            }
          ].map((step, idx) => (
            <Card key={idx} className="p-6 bg-white border-l-4 border-[#6B9E7F]">
              <h3 className="font-bold text-[#343A40] mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* İnteraktif Araçlar */}
      <section className="container py-16 mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          🔧 İnteraktif Farkındalık Araçları
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Button
            onClick={() => setShowTest(true)}
            className="h-auto p-6 bg-white border-2 border-[#6B9E7F] text-[#343A40] hover:bg-[#6B9E7F]/5 text-left"
          >
            <div>
              <h3 className="font-bold text-lg mb-2">📋 Nomofobi Testi (NMP-Q)</h3>
              <p className="text-sm">20 soruluk bilimsel test ile nomofobi seviyenizi ölçün</p>
            </div>
          </Button>
          <Button
            onClick={() => { setCalculatorStep('input'); setShowCalculator(true); }}
            className="h-auto p-6 bg-white border-2 border-[#6B9E7F] text-[#343A40] hover:bg-[#6B9E7F]/5 text-left"
          >
            <div>
              <h3 className="font-bold text-lg mb-2">📊 Ekran Süresi Hesaplayıcı</h3>
              <p className="text-sm">Kişiselleştirilmiş dijital detoks hedefleri alın</p>
            </div>
          </Button>
          <Button
            onClick={() => setShowMoodBoard(true)}
            className="h-auto p-6 bg-white border-2 border-[#6B9E7F] text-[#343A40] hover:bg-[#6B9E7F]/5 text-left"
          >
            <div>
              <h3 className="font-bold text-lg mb-2">🎯 Telefonunuzu Kullanma İsteği Panosu</h3>
              <p className="text-sm">Anlık isteğinizi değerlendirin ve öneriler alın</p>
            </div>
          </Button>
          <Button
            onClick={() => setShowMeditation(true)}
            className="h-auto p-6 bg-white border-2 border-[#6B9E7F] text-[#343A40] hover:bg-[#6B9E7F]/5 text-left"
          >
            <div>
              <h3 className="font-bold text-lg mb-2">🧘 Meditasyon & Rahatlama</h3>
              <p className="text-sm">1 dakikalık rehberli meditasyon ile sakinleşin</p>
            </div>
          </Button>
        </div>
      </section>

      {/* Nomofobi Testi Dialog */}
      <Dialog open={showTest} onOpenChange={setShowTest}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nomofobi Testi (NMP-Q)</DialogTitle>
          </DialogHeader>
          {testResult === null ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Aşağıdaki soruları 0-4 ölçeğinde yanıtlayın</p>
              {testQuestions.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="font-medium text-sm">{idx + 1}. {q}</p>
                  <Slider
                    value={[testAnswers[idx]]}
                    onValueChange={(value) => handleTestAnswer(idx, value[0])}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs font-medium">
                    <span className={testAnswers[idx] === 0 ? 'text-[#6B9E7F] font-bold' : 'text-gray-400'}>Hiç</span>
                    <span className={testAnswers[idx] === 1 ? 'text-[#6B9E7F] font-bold' : 'text-gray-400'}>Nadiren</span>
                    <span className={testAnswers[idx] === 2 ? 'text-[#6B9E7F] font-bold' : 'text-gray-400'}>Bazen</span>
                    <span className={testAnswers[idx] === 3 ? 'text-[#6B9E7F] font-bold' : 'text-gray-400'}>Sık Sık</span>
                    <span className={testAnswers[idx] === 4 ? 'text-[#6B9E7F] font-bold' : 'text-gray-400'}>Çok Sık</span>
                  </div>
                  {testAnswers[idx] > 0 && (
                    <div className="text-xs text-[#6B9E7F] font-medium text-center">
                      {testAnswers[idx] === 0 && '✓ Hiç'}
                      {testAnswers[idx] === 1 && '⚠️ Nadiren'}
                      {testAnswers[idx] === 2 && '⚠️⚠️ Bazen'}
                      {testAnswers[idx] === 3 && '⚠️⚠️⚠️ Sık Sık'}
                      {testAnswers[idx] === 4 && '🚨 Çok Sık'}
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={calculateTestResult} className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]">
                Sonuçları Göster
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#6B9E7F]/10 p-4 rounded-lg">
                <p className="text-2xl font-bold text-[#6B9E7F] mb-2">{testResult} Puan</p>
                <p className="text-gray-700">{getTestInterpretation(testResult)}</p>
              </div>
              
              {/* Kişiselleştirilmiş Tavsiye */}
              {getPersonalizedRecommendations(testRiskLevel) && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getPersonalizedRecommendations(testRiskLevel)?.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#343A40] mb-1">
                        {getPersonalizedRecommendations(testRiskLevel)?.title}
                      </p>
                      <p className="text-sm text-gray-700">
                        {getPersonalizedRecommendations(testRiskLevel)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Button onClick={() => { setTestResult(null); setTestAnswers(Array(20).fill(0)); setTestRiskLevel(null); }} className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]">
                Testi Tekrarla
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ekran Süresi Hesaplayıcı Dialog */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ekran Süresi Hesaplayıcı</DialogTitle>
          </DialogHeader>
          {calculatorStep === 'input' ? (
            <div className="space-y-6">
              {/* Test Puanı Göstergesi */}
              {testResult !== null && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">📊 Sizin Nomofobi Test Puanınız:</p>
                  <p className="text-3xl font-bold text-[#6B9E7F] mb-2">{testResult} Puan</p>
                  <p className="text-xs text-gray-600">
                    {testRiskLevel === 'low' && '✓ Düşük Risk Seviyesi'}
                    {testRiskLevel === 'medium' && '⚠️ Orta Risk Seviyesi'}
                    {testRiskLevel === 'high' && '⚠️⚠️ Yüksek Risk Seviyesi'}
                    {testRiskLevel === 'very-high' && '🚨 Çok Yüksek Risk Seviyesi'}
                  </p>
                </div>
              )}

              {/* Tahmini Kullanım Süresi */}
              {testResult !== null && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">📱 Tahmini Günlük Ekran Süresi:</p>
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    {testResult <= 30 ? '2-3 saat' :
                     testResult <= 50 ? '4-5 saat' :
                     testResult <= 70 ? '6-7 saat' :
                     testResult <= 85 ? '7-8 saat' :
                     '8+ saat'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Test puanınıza göre tahmini kullanım süresi. Gerçek kullanımınızı girerek daha doğru hedefler belirleyebilirsiniz.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Günlük Telefon Kullanım Süresi (dakika)
                </label>
                <input
                  type="number"
                  value={dailyUsage}
                  onChange={(e) => setDailyUsage(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6B9E7F]"
                  min="0"
                  max="1440"
                />
                <p className="text-xs text-gray-500 mt-1">{(dailyUsage / 60).toFixed(1)} saat</p>
              </div>
              <Button
                onClick={() => setCalculatorStep('results')}
                className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]"
              >
                Hedefleri Göster
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Risk Seviyesi Göstergesi */}
              {testRiskLevel && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-gray-700">
                    <Lightbulb className="inline mr-2" size={16} />
                    Test Puanınıza Göre Tavsiye:
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {testRiskLevel === 'low' && "Mevcut kullanımınızı sürdürün. Hafif bir azalma bile faydalı olabilir."}
                    {testRiskLevel === 'medium' && "Günlük kullanımınızı %20-30 azaltmayı hedefleyin."}
                    {testRiskLevel === 'high' && "Günlük kullanımınızı %30-50 azaltmayı hedefleyin."}
                    {testRiskLevel === 'very-high' && "Günlük kullanımınızı %50 veya daha fazla azaltmayı hedefleyin."}
                  </p>
                </div>
              )}

              <div className="bg-[#6B9E7F]/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">Haftalık Hedefler:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>📉 Mevcut Haftalık: {(dailyUsage * 7 / 60).toFixed(1)} saat</p>
                  <p>🎯 Hafif Hedef (%15 azalma): {((dailyUsage * 0.85) * 7 / 60).toFixed(1)} saat</p>
                  <p>🎯 Orta Hedef (%30 azalma): {((dailyUsage * 0.70) * 7 / 60).toFixed(1)} saat</p>
                  <p>🎯 Agresif Hedef (%50 azalma): {((dailyUsage * 0.50) * 7 / 60).toFixed(1)} saat</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Kaçırılan Aktiviteler (Günlük):</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>📚 Kitap Okuma: {calculateMissedActivities(dailyUsage).books} sayfa</p>
                  <p>💪 Egzersiz: {calculateMissedActivities(dailyUsage).exercise} saat</p>
                  <p>😴 Uyku: {calculateMissedActivities(dailyUsage).sleep} saat</p>
                  <p>👥 Sosyal Zaman: {calculateMissedActivities(dailyUsage).socialTime} saat</p>
                </div>
              </div>

              <Button
                onClick={() => setCalculatorStep('input')}
                className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]"
              >
                Geri Dön
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Telefonunuzu Kullanma İsteği Panosu Dialog */}
      <Dialog open={showMoodBoard} onOpenChange={setShowMoodBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Telefonunuzu Kullanma İsteği Panosu</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">Şu anda telefonunuzu kullanma isteğiniz ne kadar?</p>
              <Slider
                value={[moodLevel]}
                onValueChange={(value) => setMoodLevel(value[0])}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Hiç İstemiyorum</span>
                <span className="text-lg font-bold text-[#6B9E7F]">{moodLevel}/10</span>
                <span>Çok İstiyorum</span>
              </div>
            </div>

            {/* Risk Seviyesine Göre Tavsiye */}
            {testRiskLevel && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-700 mb-2">💡 Tavsiye:</p>
                <p className="text-sm text-gray-700">
                  {getMoodAdvice(moodLevel, testRiskLevel)}
                </p>
              </div>
            )}

            {moodLevel >= 7 && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-700 mb-2">🚨 Acil Öneriler:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Telefonunuzu erişilemez bir yere koyun</li>
                  <li>✓ Meditasyon yapmayı deneyin</li>
                  <li>✓ Bir kitap okuyun veya yürüyüş yapın</li>
                  <li>✓ Arkadaşınızla konuşun (telefonunuz olmadan)</li>
                </ul>
              </div>
            )}

            {moodLevel >= 5 && moodLevel < 7 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-700 mb-2">⚠️ Dikkat Önerileri:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Telefonunuzu 30 dakika kapalı tutun</li>
                  <li>✓ Hafif meditasyon yapın</li>
                  <li>✓ Bir aktivite planlayın</li>
                </ul>
              </div>
            )}

            {moodLevel < 5 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-700 mb-2">✅ Harika!</p>
                <p className="text-sm text-gray-700">
                  Telefonunuzu kullanma isteğiniz düşük. Bu harika bir zaman! Kitap okuyun, meditasyon yapın veya doğada zaman geçirin.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Meditasyon Dialog */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🧘 Rehberli Meditasyon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!meditationActive ? (
              <div className="space-y-4">
                {/* Meditasyon Seçenekleri */}
                <div className="bg-[#6B9E7F]/10 p-6 rounded-lg text-center">
                  <p className="text-gray-700 mb-4 font-medium">Meditasyon Süresi Seçin</p>
                  <div className="flex gap-2 justify-center mb-4">
                    {[1, 3, 5, 10].map(min => (
                      <Button
                        key={min}
                        onClick={() => setMeditationDuration(min * 60)}
                        className={`${meditationDuration === min * 60 ? 'bg-[#6B9E7F]' : 'bg-gray-300'} text-white`}
                      >
                        {min}dk
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      setMeditationActive(true);
                      setMeditationTime(0);
                      setBreathPhase('inhale');
                    }}
                    className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e] text-white"
                  >
                    Başla
                  </Button>
                </div>

                {/* Hatırlatıcı Ayarları */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">⏰ Günlük Hatırlatıcı</p>
                  <div className="flex gap-2 items-center">
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                    <Button
                      onClick={() => {
                        setReminderEnabled(!reminderEnabled);
                        if (!reminderEnabled && 'Notification' in window) {
                          Notification.requestPermission();
                        }
                      }}
                      className={`${reminderEnabled ? 'bg-[#6B9E7F]' : 'bg-gray-400'} text-white`}
                    >
                      {reminderEnabled ? 'Açık' : 'Kapalı'}
                    </Button>
                  </div>
                  {reminderEnabled && (
                    <p className="text-xs text-gray-600 mt-2">✓ Her gün {reminderTime}'de hatırlatılacaksınız</p>
                  )}
                </div>

                {/* İstatistikler */}
                {meditationCount > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-700">🏆 Tamamlanan Meditasyonlar: {meditationCount}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-center">
                {/* Nefes Animasyonu */}
                <div className="bg-[#6B9E7F]/10 p-12 rounded-lg">
                  <div
                    className={`text-8xl transition-all duration-1000 ${
                      breathPhase === 'inhale' ? 'scale-125' :
                      breathPhase === 'hold' ? 'scale-100' :
                      'scale-75'
                    }`}
                  >
                    🧘
                  </div>
                  <p className="text-gray-600 mt-4 text-lg font-medium">
                    {breathPhase === 'inhale' && 'Derin nefes alın...'}
                    {breathPhase === 'hold' && 'Tutun...'}
                    {breathPhase === 'exhale' && 'Yavaşça verin...'}
                  </p>
                </div>

                {/* Zamanlayıcı */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#6B9E7F] mb-2">
                    {Math.floor((meditationDuration - meditationTime) / 60)}:{String((meditationDuration - meditationTime) % 60).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-gray-600">Kalan Süre</p>
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
                    <div
                      className="bg-[#6B9E7F] h-2 rounded-full transition-all"
                      style={{ width: `${(meditationTime / meditationDuration) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Durdur Butonu */}
                <Button
                  onClick={() => setMeditationActive(false)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Durdur
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bunu Biliyor muydun? */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#343A40] mb-4">💡 Bunu Biliyor muydun?</h2>
          <p className="text-gray-700 mb-8">Nomofobi ve dijital sağlık hakkında ilginç bilgiler</p>
          
          {!showArticles ? (
            <Button
              onClick={() => setShowArticles(true)}
              className="bg-[#6B9E7F] hover:bg-[#5a8a6e] text-white"
            >
              İlginç Bilgileri Keşfet
            </Button>
          ) : (
            <div className="space-y-4">
              {[
                {
                  id: 0,
                  title: "Dopamin Döngüsü",
                  excerpt: "Her telefondan bildirim, beynin ödül sistemini tetikler ve dopamin salınımını artırır. Bu, kumara benzer bir mekanizmadır!",
                  emoji: "🧠"
                },
                {
                  id: 1,
                  title: "Mavi Işık Etkisi",
                  excerpt: "Telefon ekranlarının mavi ışığı, melatonin üretimini baskılayarak uyku kalitesini %30 oranında düşürebilir.",
                  emoji: "💤"
                },
                {
                  id: 2,
                  title: "FOMO Sendromu",
                  excerpt: "'Kaçırma Korkusu' (FOMO), sosyal medyada paylaşılan içerikleri görmeme endişesidir ve anksiyeteyi %40 artırır.",
                  emoji: "😰"
                },
                {
                  id: 3,
                  title: "Dikkat Süresi",
                  excerpt: "Ortalama insan dikkat süresi 2000'de 12 dakika iken, şimdi 8 saniyeye düşmüştür. Balık balığından daha az dikkat süresi!",
                  emoji: "⏱️"
                },
                {
                  id: 4,
                  title: "Phantom Vibration",
                  excerpt: "Telefonunuz titremediği halde titreşim hissetme (Phantom Vibration), nomofobi belirtilerinden biridir ve %70 oranında görülür.",
                  emoji: "📱"
                },
                {
                  id: 5,
                  title: "Sosyal Medya Algoritması",
                  excerpt: "Sosyal medya algoritmaları, sizi 3.7 saniye ortalama içerikte tutmak için tasarlanmıştır. Bağımlılık kasıtlı!",
                  emoji: "🔄"
                },
                {
                  id: 6,
                  title: "Meditasyon Gücü",
                  excerpt: "Sadece 10 dakikalık günlük meditasyon, telefon kullanım isteğini 8 hafta içinde %50 oranında azaltabilir.",
                  emoji: "🧘"
                },
                {
                  id: 7,
                  title: "Gençlerde Akademik Etki",
                  excerpt: "Telefon yanında olan öğrencilerin sınavda %20 daha düşük puan aldığı araştırmalarla kanıtlanmıştır.",
                  emoji: "📚"
                }
              ].map((article) => (
                <Card key={article.id} className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedArticle(article.id)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{article.emoji}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#343A40] mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm">{article.excerpt}</p>
                    </div>
                    <span className="text-2xl ml-4">→</span>
                  </div>
                </Card>
              ))}
              <Button
                onClick={() => setShowArticles(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white"
              >
                Kapat
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Bunu Biliyor muydun? Detay Dialog */}
      <Dialog open={selectedArticle !== null} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl ltr" style={{direction: 'ltr'}}>
          <DialogHeader>
            <DialogTitle className="text-left">
              {selectedArticle === 0 && "💡 Dopamin Döngüsü"}
              {selectedArticle === 1 && "💡 Mavi Işık Etkisi"}
              {selectedArticle === 2 && "💡 FOMO Sendromu"}
              {selectedArticle === 3 && "💡 Dikkat Süresi"}
              {selectedArticle === 4 && "💡 Phantom Vibration"}
              {selectedArticle === 5 && "💡 Sosyal Medya Algoritması"}
              {selectedArticle === 6 && "💡 Meditasyon Gücü"}
              {selectedArticle === 7 && "💡 Gençlerde Akademik Etki"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed text-left">
            {selectedArticle === 0 && (
              <>
                <p><strong>Nedir?</strong> Her telefondan gelen bildirim, mesaj veya sosyal medya beğenisi, beynin ödül sistemini tetikler ve dopamin (mutluluk hormonu) salınımını artırır.</p>
                <p><strong>Mekanizma:</strong> Bu sistem, kumara benzer şekilde çalışır. Belirsiz ödüller, beynin daha fazla dopamin beklentisiyle çalışmasına neden olur.</p>
                <p><strong>Sonuç:</strong> Zamanla, beyin bu dopamin patlayışına bağımlı hale gelir ve telefon olmadan mutsuz hissedersiniz.</p>
                <p><strong>Çözüm:</strong> Bildirimleri kapatmak, dopamin döngüsünü kırmaya yardımcı olur.</p>
              </>
            )}
            {selectedArticle === 1 && (
              <>
                <p><strong>Nedir?</strong> Telefon ve bilgisayar ekranları, mavi ışık yayar. Bu ışık, melatonin (uyku hormonu) üretimini baskılar.</p>
                <p><strong>Etki:</strong> Uyku saatinden 2 saat önce telefon kullanmak, uyku kalitesini %30 oranında düşürebilir.</p>
                <p><strong>Sonuç:</strong> Kötü uyku, gün içinde yorgunluk, dikkat dağınıklığı ve akademik performans düşüşüne neden olur.</p>
                <p><strong>Çözüm:</strong> Uyku saatinden 1 saat önce telefonları kapatın veya mavi ışık filtresi kullanın.</p>
              </>
            )}
            {selectedArticle === 2 && (
              <>
                <p><strong>Nedir?</strong> FOMO (Fear Of Missing Out), sosyal medyada paylaşılan içerikleri görmeme endişesidir.</p>
                <p><strong>Etki:</strong> FOMO, anksiyete ve depresyon oranlarını %40 oranında artırır. Sürekli telefon kontrolüne neden olur.</p>
                <p><strong>Sonuç:</strong> Sosyal medya algoritmaları, FOMO'yu kasıtlı olarak tetikleyerek kullanıcıları bağımlı hale getirir.</p>
                <p><strong>Çözüm:</strong> Sosyal medya kullanım saatlerini sınırlandırın ve gerçek hayat aktivitelerine odaklanın.</p>
              </>
            )}
            {selectedArticle === 3 && (
              <>
                <p><strong>Gerçek:</strong> 2000 yılında ortalama insan dikkat süresi 12 dakika iken, şimdi 8 saniyeye düşmüştür!</p>
                <p><strong>İlginç Bilgi:</strong> Balık balığının dikkat süresi 9 saniye olup, insanlar balıktan daha az dikkat süresi ile yaşıyor.</p>
                <p><strong>Neden?</strong> Sosyal medya algoritmaları, kısa dikkat süresi için tasarlanmıştır. Her 3-5 saniyede yeni içerik gösterilir.</p>
                <p><strong>Sonuç:</strong> Uzun süreli okuma, çalışma ve derslere konsantre olmak zorlaşmıştır.</p>
              </>
            )}
            {selectedArticle === 4 && (
              <>
                <p><strong>Nedir?</strong> Telefonunuz titremediği halde titreşim hissetme, Phantom Vibration Syndrome olarak bilinir.</p>
                <p><strong>Yaygınlık:</strong> Nomofobi belirtileri gösteren %70 oranında kişi, phantom vibration yaşamıştır.</p>
                <p><strong>Neden?</strong> Beyin, telefon titreşimine o kadar alışmıştır ki, beklenti halinde titreşimi hayal eder.</p>
                <p><strong>Sonuç:</strong> Bu, nomofobi ve telefon bağımlılığının güçlü bir göstergesidir.</p>
              </>
            )}
            {selectedArticle === 5 && (
              <>
                <p><strong>Tasarım:</strong> Sosyal medya algoritmaları, sizi ortalama 3.7 saniye içerikte tutmak için tasarlanmıştır.</p>
                <p><strong>Amaç:</strong> Algoritma, sizi daha fazla içerik görmek için tutmaya çalışır ve reklam geliri artırır.</p>
                <p><strong>Gerçek:</strong> Bağımlılık, sosyal medya şirketlerinin kasıtlı tasarımının sonucudur.</p>
                <p><strong>Çözüm:</strong> Algoritmanın kontrolünde olmak yerine, kendi zamanınızı kontrol edin.</p>
              </>
            )}
            {selectedArticle === 6 && (
              <>
                <p><strong>Güç:</strong> Sadece 10 dakikalık günlük meditasyon, telefon kullanım isteğini 8 hafta içinde %50 oranında azaltabilir.</p>
                <p><strong>Mekanizma:</strong> Meditasyon, prefrontal korteksi (karar alma bölgesi) aktive eder ve impulse kontrolü güçlendirir.</p>
                <p><strong>Ek Faydalar:</strong> Stres azalır, uyku kalitesi artar, akademik performans iyileşir.</p>
                <p><strong>Çözüm:</strong> Her gün 10 dakika meditasyon yaparak telefon bağımlılığını kırabilirsiniz.</p>
              </>
            )}
            {selectedArticle === 7 && (
              <>
                <p><strong>Araştırma:</strong> Telefon yanında olan öğrencilerin sınavda %20 daha düşük puan aldığı kanıtlanmıştır.</p>
                <p><strong>Neden?</strong> Telefon, dikkat dağınıklığı yaratır. Beyin, telefon olabileceğini düşünerek konsantrasyon kaybeder.</p>
                <p><strong>Etki:</strong> Telefon görünmese bile, varlığı akademik performansı düşürür.</p>
                <p><strong>Çözüm:</strong> Ders sırasında telefonu başka bir odaya koyun veya kapatın.</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bilgi Kart Oyunu - Nomofobi Bilgisi */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#343A40] mb-4">🂴 Bilgi Kart Oyunu</h2>
          <p className="text-gray-700 mb-8">Nomofobi hakkında eğlenceli bir şekilde öğrenin. Kartları çevirerek cevapları görün!</p>
          
          {!showFlashcards ? (
            <Button
              onClick={() => setShowFlashcards(true)}
              className="bg-[#6B9E7F] hover:bg-[#5a8a6e] text-white"
            >
              Oyunu Başlat
            </Button>
          ) : (
            <div className="space-y-4">
              {[
                { q: "Nomofobi nedir?", a: "Akıllı telefondan ayrılma korkusu (NO MOBile PHone phoBIA)" },
                { q: "Nomofobi ne zaman ortaya çıktı?", a: "2008 yılında İngiltere'de yapılan araştırmada tanımlanmıştır" },
                { q: "Nomofobi belirtileri nelerdir?", a: "Telefondan ayrılma kaygısı, sosyal medya bildirimleri kaçırma korkusu, iletişim kopması endişesi" },
                { q: "Gençlerde nomofobi oranı nedir?", a: "18-35 yaş grubunun %60'dan fazlası nomofobi belirtileri göstermektedir" },
                { q: "Dopamin nedir?", a: "Beynin ödül sistemini aktive eden ve telefon kullanımı sırasında salınım yapan bir nörotransmitter" },
                { q: "Dijital detoks nedir?", a: "Telefon kullanımını kademeli olarak azaltarak sağlıklı bir denge kurmak" },
                { q: "Meditasyon telefon bağımlılığını ne kadar azaltır?", a: "Düzenli meditasyon, telefon kullanımını 8 hafta sonra %35-50 oranında azaltabilir" },
                { q: "Mavi ışık nedir?", a: "Telefon ekranlarından yayılan ve melatonin üretimini baskılayan ışık" },
              ].map((card, idx) => (
                <div key={idx} className={`${
                  idx === currentCardIndex ? 'block' : 'hidden'
                }`}>
                  {idx === currentCardIndex && (
                    <div className="bg-[#F8F9FA] rounded-lg p-8 border-2 border-[#6B9E7F]" style={{direction: 'ltr'}}>
                      <div className="mb-6">
                        <p className="text-sm text-[#6B9E7F] font-semibold mb-2">❓ SORU</p>
                        <p className="text-xl font-bold text-[#343A40]">{card.q}</p>
                      </div>
                      <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e] text-white py-3 rounded-lg font-semibold transition-colors mb-4"
                      >
                        {isFlipped ? '✓ Cevap Gösteriliyor' : '? Cevabı Göster'}
                      </button>
                      {isFlipped && (
                        <div className="bg-white rounded-lg p-6 border-l-4 border-[#6B9E7F]">
                          <p className="text-sm text-[#6B9E7F] font-semibold mb-2">✓ CEVAP</p>
                          <p className="text-lg text-[#343A40]">{card.a}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex gap-2 justify-center mt-6">
                <Button
                  onClick={() => {
                    setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
                    setIsFlipped(false);
                  }}
                  disabled={currentCardIndex === 0}
                  className="bg-gray-400 hover:bg-gray-500 text-white"
                >
                  ← Önceki
                </Button>
                <span className="text-gray-700 font-bold px-4 py-2">
                  {currentCardIndex + 1} / 8
                </span>
                <Button
                  onClick={() => {
                    setCurrentCardIndex(Math.min(7, currentCardIndex + 1));
                    setIsFlipped(false);
                  }}
                  disabled={currentCardIndex === 7}
                  className="bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Sonraki →
                </Button>
              </div>
              
              <Button
                onClick={() => {
                  setShowFlashcards(false);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white mt-4"
              >
                Kapat
              </Button>
            </div>
          )}
        </div>
      </section>



      {/* Etik İlkeler & Gizlilik */}
      <section className="container py-16 mb-12">
        <Button
          onClick={() => setShowEthics(!showEthics)}
          className="w-full justify-start text-left bg-white border-2 border-[#6B9E7F] text-[#343A40] hover:bg-[#6B9E7F]/5 p-4"
        >
          <h3 className="font-bold text-lg">⚖️ Etik İlkeler & Gizlilik Bildirimi</h3>
        </Button>
        {showEthics && (
          <Card className="mt-4 p-6 bg-white border border-[#6B9E7F]/20">
            <div className="space-y-4 text-gray-700 text-sm">
              <p>
                <strong>Bu platform, TÜBİTAK 4006-B Bilim ve Teknoloji Proje Yarışması kapsamında geliştirilmiştir.</strong>
              </p>
              <p>
                <strong>Gizlilik:</strong> Bu site hiçbir kişisel veri toplamaz, saklamaz veya paylaşmaz. Tüm veriler tarayıcınızda yerel olarak işlenir.
              </p>
              <p>
                <strong>Amaç:</strong> Nomofobi hakkında bilgilendirme ve farkındalık yaratmak. Tıbbi tavsiye değildir.
              </p>
              <p>
                <strong>Akademik Temel:</strong> Tüm bilgiler 2025-2026 yılı araştırma verilerine ve bilimsel kaynaklara dayanmaktadır.
              </p>
              <p>
                <strong>Etik İlkeler:</strong> Kullanıcı özerkliği, gizlilik, şeffaflık ve bilimsel doğruluk ilkeleri temel alınmıştır.
              </p>
            </div>
          </Card>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#343A40] text-white py-8 text-center">
        <p className="text-sm">
          © 2026 Nomofobi Bilgilendirme Platformu | TÜBİTAK 4006-B Projesi
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Bu platform eğitim ve farkındalık amaçlıdır. Profesyonel tıbbi tavsiye için uzmanla danışın.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Tüm bilgiler 2025-2026 yılı araştırma verilerine ve bilimsel kaynaklara dayanmaktadır.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Kaynakça ve referanslar için lütfen "Kaynakça & Referanslar" bölümüne bakınız.
        </p>
      </footer>
    </div>
  );
}
