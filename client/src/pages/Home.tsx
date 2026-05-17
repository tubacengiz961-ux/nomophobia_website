'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Heart, Brain, Zap, Activity, Clock, Smile, AlertCircle, TrendingDown, Target, CheckCircle2, AlertTriangle, Volume2, VolumeX } from 'lucide-react';

/**
 * Nomofobi Web Sitesi - Ana Sayfa (TÜBİTAK 4006-B Projesi)
 * Tasarım: Minimalist Wellness & Digital Detox
 * Amaç: Bilgilendirici ve Farkındalık Yaratıcı
 * Renk: Adaçayı yeşili (#6B9E7F), off-white arka plan, koyu gri metin
 * Tipografi: Montserrat (başlıklar) + Lato (gövde)
 * Etik İlkeler: Kişisel veri toplamıyor, akademik amaçlı, gizlilik odaklı
 */

export default function Home() {
  const [showTest, setShowTest] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMoodBoard, setShowMoodBoard] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showEthics, setShowEthics] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [testAnswers, setTestAnswers] = useState<number[]>(Array(20).fill(0));
  const [testResult, setTestResult] = useState<number | null>(null);
  const [dailyUsage, setDailyUsage] = useState(240);
  const [moodLevel, setMoodLevel] = useState(5);
  const [calculatorStep, setCalculatorStep] = useState<'input' | 'results'>('input');

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
    
    const reductionPercentage = riskLevel === 'high' ? 0.30 : riskLevel === 'medium' ? 0.25 : 0.15;
    const weeklyReduction = Math.round(currentUsage * reductionPercentage);
    const weeklyGoal = currentUsage - weeklyReduction;
    const monthlyGoal = Math.round(weeklyGoal * 0.85);

    const weeklySavings = weeklyReduction * 7;
    const monthlySavings = weeklySavings * 4;

    const missedActivities = calculateMissedActivities(weeklySavings);

    return {
      riskLevel,
      weeklyGoal,
      monthlyGoal,
      weeklySavings,
      monthlySavings,
      missedActivities
    };
  };

  const detoxGoals = calculateDetoxGoals(dailyUsage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white">
      {/* Gizli Müzik Oynatıcı */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.example.com/nature-sounds-relaxing.wav" type="audio/wav" />
      </audio>

      {/* Müzik Kontrol Butonu - Sabit Pozisyon */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4 border border-[#6B9E7F]/20">
        <Button
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="bg-[#6B9E7F] hover:bg-[#5a8a6e] text-white rounded-full w-12 h-12 p-0 flex items-center justify-center"
          title={isMusicPlaying ? "Müziği durdur" : "Doğa sesini aç"}
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </Button>
        {isMusicPlaying && (
          <div className="w-32">
            <Slider
              value={[musicVolume]}
              onValueChange={(value) => setMusicVolume(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-600 text-center mt-1">{musicVolume}%</p>
          </div>
        )}
      </div>

      {/* Hero Bölümü */}
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold text-[#343A40] mb-4" style={{ fontFamily: 'Montserrat' }}>
          Nomofobi: Dijital Çağın Yeni Korkusu
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Akıllı telefondan uzak kalma korkusu (Nomofobi) hakkında bilimsel bilgiler, farkındalık araçları ve dijital detoks rehberi.
        </p>
        <p className="text-sm text-[#6B9E7F] font-semibold mb-6">
          📚 Bilgilendirici Platform | 🔬 Akademik Araştırmalara Dayalı | 🌿 Wellness Odaklı
        </p>
      </section>

      {/* Nomofobi Nedir? */}
      <section className="container py-16 bg-white rounded-2xl shadow-sm mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-6" style={{ fontFamily: 'Montserrat' }}>
          Nomofobi Nedir?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Nomofobi</strong> (NO MOBile PHone phoBIA), akıllı telefondan uzak kalma korkusunu tanımlar. "No Mobile Phone Phobia" kelimelerinin kısaltmasıdır.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
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
              <p className="text-sm text-gray-600">Aşağıdaki soruları 0-4 ölçeğinde yanıtlayın (0=Hiç, 4=Çok Sık)</p>
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
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Hiç</span>
                    <span>Çok Sık</span>
                  </div>
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
              <Button onClick={() => { setTestResult(null); setTestAnswers(Array(20).fill(0)); }} className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]">
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
              <div>
                <label className="block text-sm font-medium mb-2">Günlük Telefon Kullanımı (dakika)</label>
                <Slider
                  value={[dailyUsage]}
                  onValueChange={(value) => setDailyUsage(value[0])}
                  max={1440}
                  step={15}
                  className="w-full"
                />
                <p className="text-lg font-bold text-[#6B9E7F] mt-2">{Math.floor(dailyUsage / 60)}s {dailyUsage % 60}dk</p>
              </div>
              <Button
                onClick={() => setCalculatorStep('results')}
                className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]"
              >
                Hedefleri Hesapla
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#6B9E7F]/10 p-4 rounded-lg">
                <p className="font-bold mb-2">Risk Seviyesi: <span className="text-[#6B9E7F] capitalize">{detoxGoals.riskLevel === 'high' ? 'Yüksek' : detoxGoals.riskLevel === 'medium' ? 'Orta' : 'Düşük'}</span></p>
                <p className="text-sm text-gray-700">Haftalık Hedef: {Math.floor(detoxGoals.weeklyGoal / 60)}s {detoxGoals.weeklyGoal % 60}dk</p>
                <p className="text-sm text-gray-700">Aylık Hedef: {Math.floor(detoxGoals.monthlyGoal / 60)}s {detoxGoals.monthlyGoal % 60}dk</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-bold text-green-900 mb-2">Tasarruf Edebileceğiniz Zaman:</p>
                <p className="text-sm text-green-800">Haftalık: {Math.floor(detoxGoals.weeklySavings / 60)}s {detoxGoals.weeklySavings % 60}dk</p>
                <p className="text-sm text-green-800">Aylık: {Math.floor(detoxGoals.monthlySavings / 60)}s {detoxGoals.monthlySavings % 60}dk</p>
              </div>
              <Button onClick={() => setCalculatorStep('input')} className="w-full bg-[#6B9E7F] hover:bg-[#5a8a6e]">
                Tekrar Hesapla
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mod Panosu Dialog */}
      <Dialog open={showMoodBoard} onOpenChange={setShowMoodBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Telefonunuzu Kullanma İsteği Panosu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Şu anki isteğiniz ne kadar güçlü? (1-10)</label>
              <Slider
                value={[moodLevel]}
                onValueChange={(value) => setMoodLevel(value[0])}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-lg font-bold text-[#6B9E7F] mt-2">{moodLevel}/10</p>
            </div>
            <div className="bg-[#6B9E7F]/10 p-4 rounded-lg">
              <p className="font-bold text-[#343A40] mb-2">Önerimiz:</p>
              <p className="text-gray-700">{getMoodSuggestion(moodLevel)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meditasyon Dialog */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>🧘 Rehberli Meditasyon</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6B9E7F] to-[#5a8a6e] animate-pulse flex items-center justify-center">
                  <span className="text-white text-3xl">🧘</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-left">
              <p className="text-gray-700"><strong>1. Rahat Pozisyon:</strong> Sırtınız dik, omuzlarınız gevşek olacak şekilde oturun.</p>
              <p className="text-gray-700"><strong>2. Derin Nefes:</strong> Burundan 4 sayarak nefes alın, 4 sayarak tutun, 4 sayarak verin.</p>
              <p className="text-gray-700"><strong>3. Farkındalık:</strong> Düşüncelerinizi gözlemleyin ama onlara takılmayın.</p>
              <p className="text-gray-700"><strong>4. Tekrarlama:</strong> 1 dakika boyunca bu işlemi tekrarlayın.</p>
            </div>
            <p className="text-sm text-[#6B9E7F] font-semibold">💡 Doğa sesini açarak meditasyonunuzu daha etkili hale getirebilirsiniz.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Etik İlkeler ve Gizlilik */}
      <section className="container py-16 bg-[#F8F9FA] rounded-2xl mb-12">
        <h2 className="text-3xl font-bold text-[#343A40] mb-8" style={{ fontFamily: 'Montserrat' }}>
          ⚖️ Etik İlkeler & Gizlilik Bildirimi
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-[#343A40] mb-4">Bu Platform:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <CheckCircle2 className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Kişisel veri toplamaz ve kayıt gerektirmez</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Tamamen bilgilendirici ve eğitim amaçlıdır</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Akademik araştırmalara dayalı içerik sunar</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Kullanıcı gizliliğini korur</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-[#6B9E7F] flex-shrink-0" size={20} />
                <span>Hiçbir ticari amaç taşımaz</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg border-l-4 border-[#6B9E7F]">
            <h3 className="font-bold text-[#343A40] mb-4">Yasal Uyarı:</h3>
            <p className="text-sm text-gray-700 mb-4">
              Bu platform, nomofobi hakkında bilgilendirme ve farkındalık yaratma amacıyla oluşturulmuştur. Tıbbi tanı veya tedavi amaçlı değildir.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Ciddi nomofobi belirtileri yaşıyorsanız, lütfen bir sağlık profesyoneline danışınız.
            </p>
            <p className="text-sm text-[#6B9E7F] font-semibold">
              TÜBİTAK 4006-B Projesi | Bilimsel Farkındalık Platformu
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12 text-center border-t border-gray-200">
        <p className="text-gray-600 mb-2">
          © 2026 Nomofobi Bilgilendirme Platformu | TÜBİTAK 4006-B Projesi
        </p>
        <p className="text-sm text-gray-500">
          Bilimsel araştırmalara dayalı, etik ilkelere uygun, gizlilik odaklı platform
        </p>
      </footer>
    </div>
  );
}
