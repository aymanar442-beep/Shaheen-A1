import React, { useState, useEffect, useRef, useMemo } from 'react';
import SHAHEEN_IMAGES from '../assets/images';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Award,
  DollarSign,
  Activity,
  Heart,
  TrendingUp,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Video,
  Download,
  Shield,
  Layers,
  Clock,
  HardDrive,
  Users,
  Compass,
  AlertTriangle,
  Flame,
  Check,
  Zap,
  Mic,
  Settings,
  Maximize,
  Minimize
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface SovereignVideoStudioProps {
  currentLang: 'en' | 'ar';
  onNavigateTab?: (tab: string) => void;
}

// 6 Master Cinematic Scenes (Total = 170 Seconds = 2 Minutes 50 Seconds / 2.90 min)
interface StudioScene {
  id: number;
  durationSeconds: number; // Duration in seconds
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  scriptAr: string;
  scriptEn: string;
  screenActionAr: string;
  screenActionEn: string;
  soundFxType: 'whoosh' | 'heartbeat' | 'radar' | 'alarm' | 'chime' | 'falcon';
  image: string;
}

export const studioScenes: StudioScene[] = [
  {
    id: 1,
    durationSeconds: 25,
    titleAr: 'مدخل السيادة ورسالة شاهين الإنسانية',
    titleEn: 'The Sovereign Awakening & Moral Creed',
    subtitleAr: 'المبادئ الأخلاقية الراسخة التي تحكم المنظومة',
    subtitleEn: 'The foundational humanitarian charter of Shaheen',
    badgeAr: 'المشهد 1 (0:00 - 0:25)',
    badgeEn: 'Scene 1 (0:00 - 0:25)',
    scriptAr: 'مرحباً بكم. أنا لا أعرض عليكم ساعة ذكية عادية لتنضم إلى رفوف الإكسسوارات الاستهلاكية، بل أقدم لكم «مشروع شاهين A1».. منظومة أمان سيادية استباقية صُممت لحماية الأطفال والحيوانات، بدون أي تسريب للبيانات خارج جهاز المستخدم، وأرباحها مكرسة لتمويل التعليم والطبابة مجاناً. في شاهين كل من يسكن تحت هذه السماء وجبت علينا حمايته.',
    scriptEn: 'Welcome. I am not presenting a consumer gadget for lifestyle shelves. I present Shaheen Project A1: a sovereign, anticipatory defense ecosystem built to protect children and companion animals, with zero cloud data leakage, and operating profits dedicated to free education and healthcare.',
    screenActionAr: 'استعراض شعار صقر شاهين السيبراني وعقيدة الحماية الإنسانية',
    screenActionEn: 'Unveiling Cybernetic Falcon Emblem & Sovereign Creed',
    soundFxType: 'falcon',
    image: SHAHEEN_IMAGES.falconEmblem
  },
  {
    id: 2,
    durationSeconds: 30,
    titleAr: 'ثنائية العتاد واقتصاديات التصنيع الفائقة',
    titleEn: 'Dual-Device Hardware & 77.9% Margin Unit Economics',
    subtitleAr: 'ساعة أمان الأطفال + قلادة تتبع الرفقاء',
    subtitleEn: 'Kids Safety Watch + Companion Pet Tag',
    badgeAr: 'المشهد 2 (0:25 - 0:55)',
    badgeEn: 'Scene 2 (0:25 - 0:55)',
    scriptAr: 'المنظومة تتكون من جهازين عتاديين فائقين: ساعة أمان الأطفال الذكية بسعر بيع مائة وتسعة وعشرين دولار وتكلفة تصنيع ثمانية وعشرين دولار ونصف، وقلادة تتبع الرفقاء والحيوانات بسعر تسعة وثمانين دولار وتكلفة ثمانية عشر دولاراً. هامش ربح عتادي استثنائي يتجاوز سبعة وسبعين بالمائة مع اشتراك شهري متكرر لشبكة الأمان.',
    scriptEn: 'The ecosystem comprises two sovereign hardware devices: The Kids Safety Watch retailing at $129 with a $28.50 BOM cost, and the Companion Pet Tag retailing at $89 with an $18.20 BOM cost. Delivering a 77.9% gross hardware margin paired with recurring monthly safety mesh subscriptions.',
    screenActionAr: 'تفكيك العتاد وهيكل التكلفة ومقارنة الأسعار',
    screenActionEn: 'Hardware BOM breakdown and pricing structure',
    soundFxType: 'radar',
    image: SHAHEEN_IMAGES.kidsWatch
  },
  {
    id: 3,
    durationSeconds: 35,
    titleAr: 'الاستجابة العصبية اللحظية ومحاكاة الطوارئ الحية',
    titleEn: 'Sub-200ms Autonomic Reflex & S-DELTA Live Defense',
    subtitleAr: 'استشعار نزع الساعة، السقوط، والصرير الصوتي محلياً',
    subtitleEn: 'Off-wrist wrench, fall kinetic impact, and acoustic cry telemetry',
    badgeAr: 'المشهد 3 (0:55 - 01:30)',
    badgeEn: 'Scene 3 (0:55 - 01:30)',
    scriptAr: 'انظروا إلى المحاكي الميداني الحي: عندما تُنزع الساعة عن يد الطفل، أو يتعرض لارتطام عنيف أو صدمة عصبية، خوارزمية دلتا إس-دلتا لا تنتظر سحابة ولا خوادم، بل تقرأ المؤشرات العصبية والحركية والصوتية محلياً على الشريحة وتبث إنذار النجدة في أقل من مائتي جزء من الثانية مع فلترة تامة للإنذارات الكاذبة.',
    scriptEn: 'Observe the live field simulator: when the watch is wrenched off a child, or a violent kinetic impact occurs, the S-DELTA neural kernel operates locally on-device without cloud lag, triggering emergency beacons in under 200 milliseconds while eliminating false alarms.',
    screenActionAr: 'تشغيل محاكي نزع الساعة والسقوط 4.8G واستشعار الصراخ فورياً',
    screenActionEn: 'Live trigger of off-wrist sensor, 4.8G fall impact, and decibel detector',
    soundFxType: 'alarm',
    image: SHAHEEN_IMAGES.petCollar
  },
  {
    id: 4,
    durationSeconds: 30,
    titleAr: 'الحصانة الراديوية خارج التغطية وتفوقنا على عمالقة التقنية',
    titleEn: 'Offline Sub-GHz Mesh & The Silicon Valley Moat',
    subtitleAr: 'شبكة P2P راديوية مستقلة وبطارية 45 يوماً',
    subtitleEn: 'Decentralized Sub-GHz radio relay and 45-day battery autonomy',
    badgeAr: 'المشهد 4 (01:30 - 02:00)',
    badgeEn: 'Scene 4 (01:30 - 02:00)',
    scriptAr: 'لماذا تعجز أبل وسامسونج عن منافستنا؟ لأن أجهزتهم تنهار تماماً عند انقطاع شبكات الهاتف وتتاجر ببيانات الأطفال. شاهين يملك شبكة تتابع راديوية لامركزية بترددات تحت الجيجاهرتز، وبطارية تناوب تدوم خمسة وأربعين يوماً، وحصانة رقمية مطلقة محلياً على العتاد بنسبة مائة بالمائة.',
    scriptEn: 'Why can Big Tech not replicate Shaheen? Because Apple Watch and AirTags fail completely when cellular towers go dark and their business model relies on cloud monetization. Shaheen operates on an autonomous Sub-GHz P2P mesh relay with 45-day battery longevity.',
    screenActionAr: 'مصفوفة المقارنة التنافسية ومحاكاة شبكة Mesh الراديوية',
    screenActionEn: 'Head-to-head competitive matrix and P2P mesh propagation',
    soundFxType: 'whoosh',
    image: SHAHEEN_IMAGES.mobileAppMesh
  },
  {
    id: 5,
    durationSeconds: 30,
    titleAr: 'دراسة الجدوى والعائد الاستثماري التفاعلي المليوني',
    titleEn: 'Financial Projections, ARR & 10x+ Seed Exit Multiple',
    subtitleAr: 'اقتناص سوق 8.4 مليار دولار بنموذج SaaS متكرر',
    subtitleEn: 'Capturing $8.4B TAM with sticky recurring SaaS ARR',
    badgeAr: 'المشهد 5 (02:00 - 02:30)',
    badgeEn: 'Scene 5 (02:00 - 02:30)',
    scriptAr: 'نحن نقتنص سوقاً عالمياً بقيمة ثمانية مليارات وأربعمائة مليون دولار. وكما ترون في مخطط النمو المالي ثلاثي السنوات، التدفقات النقدية التراكمية تتجاوز عشرات الملايين، واستثماركم الأولي البالغ مليونين ونصف دولار يحقق عائداً مضاعفاً يفوق عشرة أضعاف قيمته في ثلاث سنوات.',
    scriptEn: 'We target an $8.4B global TAM. As shown in our dynamic 3-year Recharts growth model, cumulative cash inflows exceed tens of millions, projecting a 10x+ return multiple on a $2.5M seed round.',
    screenActionAr: 'تحريك مؤشرات المبيعات وعرض منحنى الإيرادات التراكمية والأرباح',
    screenActionEn: 'Dynamic Recharts 3-year revenue curve, ARR, and valuation multiples',
    soundFxType: 'chime',
    image: SHAHEEN_IMAGES.investorDeckSlide
  },
  {
    id: 6,
    durationSeconds: 20,
    titleAr: 'ورقة الشروط السيادية الملزمة والختام الند بالند',
    titleEn: 'Sovereign Term Sheet & Peer-to-Peer Contractual Close',
    subtitleAr: 'البنود الخمسة الإلزامية غير القابلة للتفاوض',
    subtitleEn: 'The 5 non-negotiable bilateral corporate covenants',
    badgeAr: 'المشهد 6 (02:30 - 02:50)',
    badgeEn: 'Scene 6 (02:30 - 02:50)',
    scriptAr: 'شروط الشراكة غير قابلة للتفاوض: خمسون ألف دولار دفعة اتفاق شفهي غير مستردة، مائة وخمسون ألف دولار دفعة توقيع، ثلاث سنوات تتولون فيها كافة أعباء التشغيل ثم ينتقل التنفيذ بالكامل لشركتي، وحصة الأرباح من منتج A1 فقط، والتعامل مؤسسي الند بالند شركة مقابل شركة. إن كنتم جاهزين، أهلاً بكم في شاهين.',
    scriptEn: 'Our terms are non-negotiable: $50,000 non-refundable LOI fee, $150,000 contract signing fee, a 3-year operational execution window followed by full handover to the founder company, profit share on A1 only, and strictly corporate-to-corporate parity. Welcome to Shaheen.',
    screenActionAr: 'عرض ورقة الشروط الخمسة وختم الاعتماد وتوقيع المؤسس',
    screenActionEn: 'Official 5-clause sovereign covenant and executive signature seal',
    soundFxType: 'falcon',
    image: SHAHEEN_IMAGES.devicesShowcase
  }
];

// Audio Synthesizer using Web Audio API
class SovereignAudioEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playRadarBeep() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (_) {}
  }

  playHeartbeat() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.15].forEach((offset) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now + offset);
        osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.1);
        gain.gain.setValueAtTime(0.4, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.12);
      });
    } catch (_) {}
  }

  playAlarm() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1000, now + 0.15);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_) {}
  }

  playWhoosh() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (_) {}
  }

  playSuccessChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.4);
      });
    } catch (_) {}
  }

  playFalconSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.35);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (_) {}
  }
}

const audioEngine = new SovereignAudioEngine();

export default function SovereignVideoStudio({ currentLang }: SovereignVideoStudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [elapsedTotalSeconds, setElapsedTotalSeconds] = useState(0);
  const [elapsedSceneSeconds, setElapsedSceneSeconds] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSoundFxEnabled, setIsSoundFxEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Live Simulation Interactive States during video playback
  const [simWatchOffWrist, setSimWatchOffWrist] = useState(false);
  const [simImpactGs, setSimImpactGs] = useState(1.0);
  const [simDecibels, setSimDecibels] = useState(45);
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const totalDurationSeconds = 170; // 2:50 minutes

  // Load browser speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        if (currentLang === 'ar') {
          const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices[0];
          setSelectedVoice(arVoice || null);
        } else {
          const enVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
          setSelectedVoice(enVoice || null);
        }
      };

      updateVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, [currentLang]);

  // Audio Canvas visualizer animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle tactical radar circular rings
      ctx.strokeStyle = isPlaying ? 'rgba(22, 143, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const centerX = w / 2;
      const centerY = h / 2;
      [40, 90, 150, 220].forEach(r => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw active sweeping radar line when playing
      if (isPlaying) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(phase * 0.03);
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(240, 0);
        ctx.stroke();
        ctx.restore();
      }

      // Draw audio waveform bars at bottom
      const bars = 48;
      const barWidth = w / bars;
      for (let i = 0; i < bars; i++) {
        const freq = Math.sin(phase * 0.1 + i * 0.25) * (isPlaying ? 28 : 6);
        const barHeight = Math.abs(freq) + 4;
        const grad = ctx.createLinearGradient(0, h - barHeight, 0, h);
        grad.addColorStop(0, '#00d2ff');
        grad.addColorStop(1, 'rgba(22, 143, 255, 0.1)');
        ctx.fillStyle = grad;
        ctx.fillRect(i * barWidth, h - barHeight - 10, barWidth - 2, barHeight);
      }

      phase++;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Handle Scene audio play and speech synthesis
  const speakCurrentScene = (sceneIndex: number) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending speech

    const scene = studioScenes[sceneIndex];
    const textToSpeak = currentLang === 'ar' ? scene.scriptAr : scene.scriptEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = speechRate;
    utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  // Play Scene Sound FX
  const playSceneFx = (sceneIndex: number) => {
    if (!isSoundFxEnabled) return;
    const scene = studioScenes[sceneIndex];
    switch (scene.soundFxType) {
      case 'falcon':
        audioEngine.playFalconSound();
        break;
      case 'radar':
        audioEngine.playRadarBeep();
        break;
      case 'alarm':
        audioEngine.playAlarm();
        break;
      case 'whoosh':
        audioEngine.playWhoosh();
        break;
      case 'chime':
        audioEngine.playSuccessChime();
        break;
      case 'heartbeat':
        audioEngine.playHeartbeat();
        break;
    }
  };

  // Automated scene simulation events trigger
  useEffect(() => {
    if (currentSceneIndex === 2) {
      // Scene 3: Autonomic defense triggers
      const t1 = setTimeout(() => {
        setSimWatchOffWrist(true);
        setSimImpactGs(4.8);
        setSimDecibels(96);
        if (isSoundFxEnabled) audioEngine.playAlarm();
      }, 3000);
      const t2 = setTimeout(() => {
        setSimWatchOffWrist(false);
        setSimImpactGs(1.1);
        setSimDecibels(48);
      }, 18000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [currentSceneIndex, isSoundFxEnabled]);

  // Master Clock & Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedTotalSeconds(prev => {
          if (prev >= totalDurationSeconds) {
            setIsPlaying(false);
            if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
            return totalDurationSeconds;
          }
          return prev + 1;
        });

        setElapsedSceneSeconds(prev => {
          const currentScene = studioScenes[currentSceneIndex];
          if (prev + 1 >= currentScene.durationSeconds) {
            // Advance to next scene
            if (currentSceneIndex + 1 < studioScenes.length) {
              const nextIdx = currentSceneIndex + 1;
              setCurrentSceneIndex(nextIdx);
              playSceneFx(nextIdx);
              speakCurrentScene(nextIdx);
              return 0;
            } else {
              setIsPlaying(false);
              return prev;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIndex, isSoundFxEnabled, isVoiceEnabled, selectedVoice, speechRate, currentLang]);

  // Master Play / Pause Toggle
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playSceneFx(currentSceneIndex);
      speakCurrentScene(currentSceneIndex);
    } else {
      setIsPlaying(false);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    }
  };

  // Jump to specific scene
  const jumpToScene = (idx: number) => {
    let targetTotal = 0;
    for (let i = 0; i < idx; i++) {
      targetTotal += studioScenes[i].durationSeconds;
    }
    setCurrentSceneIndex(idx);
    setElapsedTotalSeconds(targetTotal);
    setElapsedSceneSeconds(0);
    playSceneFx(idx);
    if (isPlaying) {
      speakCurrentScene(idx);
    }
  };

  // Reset Video Presentation
  const handleReset = () => {
    setIsPlaying(false);
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    setCurrentSceneIndex(0);
    setElapsedTotalSeconds(0);
    setElapsedSceneSeconds(0);
    setSimWatchOffWrist(false);
    setSimImpactGs(1.0);
    setSimDecibels(45);
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Screen & Video Recording
  const startScreenRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        alert(currentLang === 'ar' ? 'متصفحك لا يدعم تسجيل الشاشة المباشر. يرجى استخدام Chrome أو Edge.' : 'Display capture not supported in this browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' } as any,
        audio: true
      });

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setIsRecordingScreen(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecordingScreen(true);

      handleReset();
      setTimeout(() => {
        setIsPlaying(true);
        playSceneFx(0);
        speakCurrentScene(0);
      }, 500);
    } catch (err) {
      console.error('Screen record error:', err);
      setIsRecordingScreen(false);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecordingScreen(false);
  };

  const activeScene = studioScenes[currentSceneIndex];
  const progressPercent = (elapsedTotalSeconds / totalDurationSeconds) * 100;

  const formatMinutesSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Dynamic Recharts Data for Scene 5
  const dynamicChartData = [
    { year: currentLang === 'ar' ? 'سنة 1' : 'Year 1', hwRev: 2.58, saasArr: 0.60, totalRev: 3.18, profit: 2.54 },
    { year: currentLang === 'ar' ? 'سنة 2' : 'Year 2', hwRev: 4.51, saasArr: 1.62, totalRev: 6.13, profit: 4.97 },
    { year: currentLang === 'ar' ? 'سنة 3' : 'Year 3', hwRev: 5.80, saasArr: 2.99, totalRev: 8.79, profit: 7.21 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* 4K CINEMATIC VIDEO PLAYER CHASSIS */}
      <div
        ref={videoContainerRef}
        className="relative bg-slate-950 rounded-3xl border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden flex flex-col justify-between"
      >
        {/* VIDEO TOP STATUS BAR & WATERMARK */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between z-20 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400 shadow-[0_0_15px_#f59e0b] bg-black">
              <img
                src={SHAHEEN_IMAGES.falconEmblem}
                alt="Falcon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs font-mono font-black text-amber-400 flex items-center gap-2">
                <span>SHAHEEN PROJECT A1</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">
                  4K 60FPS SOVEREIGN CINEMATIC
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {currentLang === 'ar' ? activeScene.titleAr : activeScene.titleEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isRecordingScreen ? (
              <button
                onClick={startScreenRecording}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>{currentLang === 'ar' ? 'تسجيل الفيديو 🎥' : 'Record MP4/WebM'}</span>
              </button>
            ) : (
              <button
                onClick={stopScreenRecording}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <span>{currentLang === 'ar' ? 'حفظ الفيديو ⏹' : 'Stop & Save'}</span>
              </button>
            )}

            {recordedVideoUrl && (
              <a
                href={recordedVideoUrl}
                download="Shaheen_A1_Investor_Pitch.webm"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-500/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'تحميل الفيديو' : 'Download'}</span>
              </a>
            )}

            <button
              onClick={toggleFullscreen}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 16:9 MAIN CINEMATIC SCREEN STAGE */}
        <div className="relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
          {/* Animated Background Canvas Layer */}
          <canvas
            ref={canvasRef}
            width={900}
            height={480}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 z-0"
          />

          {/* Scene 1: Awakening */}
          {currentSceneIndex === 0 && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl animate-fadeIn">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-black">
                  CHAPTER 01: THE MORAL CHARTER
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  {currentLang === 'ar' ? 'منظومة الأمان السيادية الاستباقية' : 'Sovereign Anticipatory Safety Ecosystem'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif italic border-r-4 border-amber-400 pr-3">
                  &quot;{currentLang === 'ar' ? 'في شاهين كل من يسكن تحت هذه السماء وجبت علينا حمايته، وأرباح هذا المشروع كُرست لتمويل التعليم والطبابة مجاناً.' : 'In Shaheen, everyone who dwells under this sky is our duty to protect, with profits dedicated to free education and healthcare.'}&quot;
                </p>
                <div className="text-xs font-mono text-cyan-400">Founder & Mastermind: Eng. Ayman Al-Araishi</div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.6)] group">
                  <img
                    src={SHAHEEN_IMAGES.falconEmblem}
                    alt="Emblem"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono font-bold text-amber-300">100% LOCAL SILICON KERNEL</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scene 2: Dual Hardware */}
          {currentSceneIndex === 1 && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fadeIn">
              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-cyan-500/50 space-y-3 backdrop-blur-md">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyan-400 font-bold">KIDS WRISTLET WATCH</span>
                  <span className="text-emerald-400 font-bold">77.9% HARDWARE MARGIN</span>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-700">
                  <img src={SHAHEEN_IMAGES.kidsWatch} alt="Watch" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">BOM</div>
                    <div className="font-bold text-white">$28.50</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Retail</div>
                    <div className="font-bold text-cyan-300">$129.00</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">SaaS</div>
                    <div className="font-bold text-amber-300">$4.99/mo</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-purple-500/50 space-y-3 backdrop-blur-md">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-purple-400 font-bold">COMPANION PET COLLAR</span>
                  <span className="text-emerald-400 font-bold">79.5% HARDWARE MARGIN</span>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-700">
                  <img src={SHAHEEN_IMAGES.petCollar} alt="Collar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">BOM</div>
                    <div className="font-bold text-white">$18.20</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Retail</div>
                    <div className="font-bold text-purple-300">$89.00</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">SaaS</div>
                    <div className="font-bold text-amber-300">$4.99/mo</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scene 3: Autonomic Reflex */}
          {currentSceneIndex === 2 && (
            <div className="relative z-10 w-full max-w-4xl space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-5 rounded-2xl border transition-all ${simWatchOffWrist ? 'bg-rose-950/80 border-rose-500 shadow-rose-500/30' : 'bg-[#020617]/90 border-slate-800'}`}>
                  <div className="text-xs font-mono text-slate-400">Off-Wrist Reflex Telemetry</div>
                  <div className={`text-2xl font-black font-mono mt-1 ${simWatchOffWrist ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    {simWatchOffWrist ? '🚨 OFF-WRIST EMERGENCY!' : '🔒 SECURE ON WRIST'}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">Latency: &lt; 0.01ms (Zero Cloud)</div>
                </div>

                <div className="p-5 rounded-2xl border bg-[#020617]/90 border-slate-800">
                  <div className="text-xs font-mono text-slate-400">Kinetic Impact Sensor</div>
                  <div className="text-2xl font-black font-mono text-amber-400 mt-1">{simImpactGs.toFixed(1)} G-Force</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">S-KFD 6-Axis Algorithmic Filter</div>
                </div>

                <div className="p-5 rounded-2xl border bg-[#020617]/90 border-slate-800">
                  <div className="text-xs font-mono text-slate-400">Neural Cry Spectrum</div>
                  <div className="text-2xl font-black font-mono text-purple-400 mt-1">{simDecibels} dB (S-NDS)</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">Acoustic Distress Classifier</div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-rose-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Patent Specification: S-DELTA v4.0 (Sub-200ms Autonomic Galvanic Skin Protection)</span>
                </div>
                <span className="text-emerald-400 font-bold">100% ON-DEVICE FILTER</span>
              </div>
            </div>
          )}

          {/* Scene 4: Offline Radio Mesh */}
          {currentSceneIndex === 3 && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fadeIn">
              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-cyan-500/50 space-y-4">
                <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>S-WCM SUB-GHZ DECENTRALIZED MESH</span>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-700">
                  <img src={SHAHEEN_IMAGES.mobileAppMesh} alt="Mesh" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Range: <strong>1,500+ Meters P2P</strong></span>
                  <span>Battery: <strong>45 Days (S-BR32)</strong></span>
                </div>
              </div>

              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400">DEFEATING APPLE WATCH & AIRTAG:</div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                    <span>When cell towers fail:</span>
                    <span className="text-emerald-400 font-bold">Shaheen A1 works 100%</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                    <span>Child privacy & data monetization:</span>
                    <span className="text-emerald-400 font-bold">ZERO Cloud Exposure</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                    <span>Battery autonomy:</span>
                    <span className="text-emerald-400 font-bold">45 Days vs 18 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scene 5: Financial Projections */}
          {currentSceneIndex === 4 && (
            <div className="relative z-10 w-full max-w-5xl space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="p-3 bg-[#020617]/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Global TAM</div>
                  <div className="text-lg font-black text-emerald-400">$8.4 Billion</div>
                </div>
                <div className="p-3 bg-[#020617]/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">3-Yr Gross Revenue</div>
                  <div className="text-lg font-black text-cyan-400">$18.1 Million</div>
                </div>
                <div className="p-3 bg-[#020617]/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Exit Valuation</div>
                  <div className="text-lg font-black text-purple-400">$35.4 Million</div>
                </div>
                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/50">
                  <div className="text-[10px] text-emerald-300 font-bold">Seed Return Multiple</div>
                  <div className="text-xl font-black text-emerald-400">14.2x ROI</div>
                </div>
              </div>

              <div className="p-4 bg-[#020617]/90 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 mb-2 font-bold">3-YEAR REVENUE GROWTH & GROSS PROFIT TRAJECTORY ($M):</div>
                <div className="w-full h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dynamicChartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} unit="$M" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="hwRev" name="Hardware Rev ($M)" fill="#168FFF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="saasArr" name="SaaS ARR ($M)" fill="#00d2ff" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="totalRev" name="Total Revenue" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="profit" name="Gross Profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Scene 6: Sovereign Term Sheet */}
          {currentSceneIndex === 5 && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fadeIn">
              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-amber-500/50 space-y-2 text-xs">
                <div className="text-amber-400 font-mono font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>5 BINDING CONTRACTUAL CLAUSES:</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-amber-300">1. $50k LOI + $150k Signing Bonus:</strong> Upfront non-refundable retainers.
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-cyan-300">2. 3-Year BOT Handover:</strong> 100% operational reins transfer to founder.
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-emerald-300">3. A1 Profit Share ONLY:</strong> 0% dilution, founder free to launch products.
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-purple-300">4. Patents & Setup Covered:</strong> 100% legal fees borne by investor.
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-blue-300">5. Entity-to-Entity Parity:</strong> Bilateral corporate equality.
                </div>
              </div>

              <div className="p-6 bg-[#020617]/90 rounded-3xl border border-amber-500/50 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-400 shadow-[0_0_15px_#f59e0b]">
                      <img src={SHAHEEN_IMAGES.falconEmblem} alt="Emblem" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-amber-400">RATIFIED BY FOUNDER</div>
                      <div className="text-base font-black text-white">Eng. Ayman Al-Araishi</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic pt-2">
                    &quot;{currentLang === 'ar' ? 'إن كنتم جاهزين لصناعة هذا التحول التاريخي وحماية الأرواح، أهلاً بكم في شاهين.' : 'If you are ready to make history and preserve human life, welcome to Shaheen.'}&quot;
                  </p>
                </div>

                <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>SOVEREIGN COVENANT SEALED</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SUBTITLES / KARAOKE NARRATION STRIP */}
        <div className="p-4 sm:p-5 bg-slate-950/95 border-t border-amber-500/30 z-20 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span>{currentLang === 'ar' ? 'الناطق الصوتي والترجمة المباشرة (Voiceover Subtitles):' : 'Live Narration Subtitles:'}</span>
            </span>
            <span>{formatMinutesSeconds(elapsedTotalSeconds)} / {formatMinutesSeconds(totalDurationSeconds)}</span>
          </div>

          <p className="text-sm sm:text-base font-bold text-amber-200 leading-relaxed tracking-wide">
            &quot;{currentLang === 'ar' ? activeScene.scriptAr : activeScene.scriptEn}&quot;
          </p>
        </div>

        {/* BOTTOM VIDEO PLAYER CONTROLS & TIMELINE SCRUBBER */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 space-y-3 z-20">
          {/* Scrubber */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play, Reset, Time */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg transition-all ${
                  isPlaying ? 'bg-amber-500 text-slate-950 shadow-amber-500/30' : 'bg-cyan-500 text-slate-950 shadow-cyan-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? (currentLang === 'ar' ? 'إيقاف مؤقت' : 'PAUSE') : (currentLang === 'ar' ? 'تشغيل الفيديو (2:50)' : 'PLAY VIDEO (2:50)')}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-700 font-mono text-xs text-white">
                <span className="font-bold">{formatMinutesSeconds(elapsedTotalSeconds)}</span>
                <span className="text-slate-500"> / </span>
                <span className="text-slate-400">{formatMinutesSeconds(totalDurationSeconds)}</span>
              </div>
            </div>

            {/* Audio Settings & Chapters */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <button
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer ${
                  isVoiceEnabled ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isVoiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
              </button>

              <button
                onClick={() => setIsSoundFxEnabled(!isSoundFxEnabled)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer ${
                  isSoundFxEnabled ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                {isSoundFxEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                <span>{isSoundFxEnabled ? 'SFX ON' : 'SFX OFF'}</span>
              </button>

              <button
                onClick={() => setSpeechRate(prev => (prev === 1.0 ? 1.15 : prev === 1.15 ? 0.9 : 1.0))}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 cursor-pointer font-bold"
              >
                {speechRate}x SPEED
              </button>
            </div>
          </div>

          {/* 6 Chapter Markers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {studioScenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className={`p-2 rounded-xl border text-left text-[10px] font-mono cursor-pointer transition-all ${
                  currentSceneIndex === idx
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : idx < currentSceneIndex
                    ? 'bg-slate-950 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>Scene 0{scene.id} ({scene.durationSeconds}s)</div>
                <div className="truncate text-white font-bold">{currentLang === 'ar' ? scene.titleAr : scene.titleEn}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
