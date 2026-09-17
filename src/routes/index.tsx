import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Flame, Heart, RotateCcw, Sparkles, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type TouchEvent,
} from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Priye — A Birthday Story" },
      {
        name: "description",
        content: "A cinematic birthday journey made with love for Priye on 15 September 2026.",
      },
      { property: "og:title", content: "For Priye — A Birthday Story" },
      {
        property: "og:description",
        content: "A cinematic birthday journey made with love for Priye on 15 September 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayStory,
});

// ─── EASY-TO-EDIT STORY CONTENT ───────────────────────────────────────────────
const birthdayGirl = "Priya";
const nickname = "Priye";
const birthday = "15 September 2026";
const password = "1432";

const personalMessage = `Priye,

शायद मैं हर बात सही तरीके से बोल नहीं पाता,
लेकिन आज बस इतना कहना था कि
तू मेरे लिए बहुत special है।

तेरी छोटी-छोटी बातें,
तेरी smile,
तेरी आँखें,
और जिस तरह तू हर चीज़ को handle करती है,
ये सब मुझे हमेशा याद रहता है।

मैं नहीं जानता आगे क्या होगा,
लेकिन मैं हमेशा चाहता हूँ कि
तू खुश रहे,
smile करती रहे,
और जिंदगी में वो सब मिले जिसकी तू deserve करती है।

आज बस तेरा दिन है।

Happy Birthday, Priye. ❤️`;

const photoCaptions = [
  "innocent face...",
  "That look...",
  "that smile",
  "your besti",
  "A moment worth keeping forever.",
  "one of my favourite",
  "Your favourite",
  "This little moment... ❤️",
  "How can someone look this beautiful?",
  "The glow I could never forget.",
  "bullet raani",
  "A little piece of happiness.",
  "You make ordinary moments special.",
  "That unmistakable Priye magic.",
  "A memory I always return to.",
  "One frame. A thousand feelings.",
  "sunshine",
  "This one always makes me smile.",
  "Beautiful, without even trying.",
  "one of my favourite",
];

const photoPaths = Array.from(
  { length: 20 },
  (_, index) => `/assets/photos/photo${String(index + 1).padStart(2, "0")}.jpg`,
);

const scenes = [
  "Secret entry",
  "The road",
  "The mountains",
  "Birthday reveal",
  "The curtain",
  "Make a wish",
  "Memories",
  "Her eyes & smile",
  "Her strength",
  "A letter",
  "One last question",
  "Sunrise",
] as const;

const lineDelay = (index: number) =>
  ({ "--line-delay": `${0.55 + index * 1.65}s` }) as CSSProperties;

function BirthdayStory() {
  const [scene, setScene] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [litCandles, setLitCandles] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "think" | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // newadd---
  const musicRef = useRef<HTMLAudioElement | null>(null);
  // const [musicStarted, setMusicStarted] = useState(false);

  // newaddend---

  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scene]);

  const goToScene = useCallback((next: number) => {
    setTransitioning(true);
    window.setTimeout(() => {
      setScene(next);
      setTransitioning(false);
    }, 780);
  }, []);

  // edit---

  const submitPassword = (event: FormEvent) => {
    event.preventDefault();

    if (enteredPassword.trim().toLocaleLowerCase() === password) {
      setPasswordError("");

      if (!musicRef.current) {
        const audio = new Audio("/music/birthday.mp3");
        audio.loop = true;
        audio.volume = 0.65;
        musicRef.current = audio;
      }

      musicRef.current.play().catch((error) => {
        console.error("Music could not start:", error);
      });

      goToScene(1);
      return;
    }

    setPasswordError("Oops... that's not the answer I'm looking for ❤️");
  };

  // editend---

  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = "";
        musicRef.current = null;
      }
    };
  }, []);

  // new---
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = "";
        musicRef.current = null;
      }
    };
  }, []);

  // end---

  const lightCandles = () => {
    setCandlesBlown(false);
    setLitCandles(0);
    [1, 2, 3, 4, 5].forEach((count, index) => {
      window.setTimeout(() => setLitCandles(count), index * 430 + 150);
    });
  };

  const blowCandles = () => {
    setLitCandles(0);
    setCandlesBlown(true);
  };

  const resetStory = () => {
    setEnteredPassword("");
    setPasswordError("");
    setCurtainOpen(false);
    setLitCandles(0);
    setCandlesBlown(false);
    setViewerIndex(null);
    setQuestionOpen(false);
    setAnswer(null);
    goToScene(0);
  };

  const moveViewer = (direction: number) => {
    setViewerIndex((current) => {
      if (current === null) return null;
      return (current + direction + photoPaths.length) % photoPaths.length;
    });
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const distance = touch.clientX - touchStart.current;
    if (Math.abs(distance) > 45) moveViewer(distance > 0 ? -1 : 1);
    touchStart.current = null;
  };

  const handlePointer = (event: ReactPointerEvent<HTMLElement>) => {
    setPointer({
      x: (event.clientX / window.innerWidth - 0.5) * 2,
      y: (event.clientY / window.innerHeight - 0.5) * 2,
    });
  };

  const sceneContent = useMemo(() => {
    switch (scene) {
      case 0:
        return (
          <SecretEntry
            enteredPassword={enteredPassword}
            error={passwordError}
            onChange={setEnteredPassword}
            onSubmit={submitPassword}
          />
        );
      case 1:
        return <RoadJourney onContinue={() => goToScene(2)} />;
      case 2:
        return <WaterfallScene onContinue={() => goToScene(3)} />;
      case 3:
        return <BirthdayReveal onContinue={() => goToScene(4)} />;
      case 4:
        return (
          <CurtainScene
            open={curtainOpen}
            onOpen={() => setCurtainOpen(true)}
            onContinue={() => goToScene(5)}
          />
        );
      case 5:
        return (
          <CakeScene
            litCandles={litCandles}
            blown={candlesBlown}
            onLight={lightCandles}
            onBlow={blowCandles}
            onContinue={() => goToScene(6)}
          />
        );
      case 6:
        return (
          <MemoriesScene
            pointer={pointer}
            onOpen={setViewerIndex}
            onContinue={() => goToScene(7)}
          />
        );
      case 7:
        return <EmotionalScene type="eyes" onContinue={() => goToScene(8)} />;
      case 8:
        return <EmotionalScene type="strength" onContinue={() => goToScene(9)} />;
      case 9:
        return <LetterScene onContinue={() => goToScene(10)} />;
      case 10:
        return (
          <LastQuestion
            questionOpen={questionOpen}
            answer={answer}
            onOpen={() => setQuestionOpen(true)}
            onAnswer={setAnswer}
            onContinue={() => goToScene(11)}
          />
        );
      default:
        return <FinalScene onReplay={resetStory} />;
    }
  }, [
    scene,
    enteredPassword,
    passwordError,
    curtainOpen,
    litCandles,
    candlesBlown,
    pointer,
    questionOpen,
    answer,
    goToScene,
  ]);

  return (
    <main
      className="story-shell"
      onPointerMove={handlePointer}
      style={{ "--mouse-x": pointer.x, "--mouse-y": pointer.y } as CSSProperties}
    >
      <div className="story-progress" aria-label={`Scene ${scene + 1} of ${scenes.length}`}>
        <span style={{ width: `${((scene + 1) / scenes.length) * 100}%` }} />
      </div>
      <div key={scene} className="scene-frame">
        {sceneContent}
      </div>
      <div className={`cinematic-transition ${transitioning ? "is-active" : ""}`} />
      {viewerIndex !== null && (
        <PhotoViewer
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onMove={moveViewer}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = touch?.clientX ?? null;
          }}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </main>
  );
}

function StoryButton({
  children,
  onClick,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  return (
    <button className="story-button" type="button" onClick={onClick}>
      <span>{children}</span>
      {icon ?? <Heart size={17} fill="currentColor" />}
    </button>
  );
}

function Stars({ count = 34 }: { count?: number }) {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={
            {
              "--x": `${(index * 47) % 100}%`,
              "--y": `${(index * 83) % 100}%`,
              "--size": `${1 + (index % 3)}px`,
              "--delay": `${(index % 9) * -0.7}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Fireworks({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className={`fireworks ${subtle ? "is-subtle" : ""}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((burst) => (
        <div key={burst} className={`firework firework-${burst + 1}`}>
          {Array.from({ length: 16 }, (_, spark) => (
            <i key={spark} style={{ "--spark-angle": `${spark * 22.5}deg` } as CSSProperties} />
          ))}
        </div>
      ))}
    </div>
  );
}

function FloatingParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="floating-particles" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={
            {
              "--particle-x": `${(index * 37) % 100}%`,
              "--particle-delay": `${(index % 10) * -1.2}s`,
              "--particle-duration": `${9 + (index % 6)}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function SecretEntry({
  enteredPassword,
  error,
  onChange,
  onSubmit,
}: {
  enteredPassword: string;
  error: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <section className="scene scene-secret">
      <Stars count={46} />
      <FloatingParticles />
      <div className="aurora-light" aria-hidden="true" />
      <div className="secret-copy">
        <p className="cinematic-line line-1">Hey {nickname}...</p>
        <p className="cinematic-line line-2">I made something for you.</p>
        <p className="cinematic-line line-3">But before you enter...</p>
      </div>
      <form className="password-panel" onSubmit={onSubmit}>
        <span className="panel-glint" />
        <Heart className="password-heart" size={25} fill="currentColor" />
        <h1>Only one person can enter</h1>
        <label htmlFor="secret-password">The words that open this little world</label>
        <input
          id="secret-password"
          type="password"
          autoComplete="off"
          placeholder="Whisper the answer..."
          value={enteredPassword}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        />
        <button className="story-button" type="submit">
          <span>Enter My Little World</span>
          <Heart size={17} fill="currentColor" />
        </button>
        <p className={`password-error ${error ? "is-visible" : ""}`} aria-live="polite">
          {error || "A tiny secret stays between us."}
        </p>
      </form>
    </section>
  );
}

function Landscape({
  waterfall = false,
  sunrise = false,
}: {
  waterfall?: boolean;
  sunrise?: boolean;
}) {
  return (
    <div
      className={`landscape ${waterfall ? "is-waterfall" : ""} ${sunrise ? "is-sunrise" : ""}`}
      aria-hidden="true"
    >
      <div className="sun" />
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="cloud cloud-c" />
      <div className="mountain mountain-back" />
      <div className="mountain mountain-mid" />
      <div className="mountain mountain-front" />
      {waterfall ? (
        <>
          <div className="waterfall">
            <i />
            <i />
            <i />
          </div>
          <div className="river">
            <i />
            <i />
            <i />
          </div>
          <div className="birds">
            <i />
            <i />
            <i />
          </div>
          <div className="mist mist-a" />
          <div className="mist mist-b" />
        </>
      ) : sunrise ? null : (
        <>
          <div className="road">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="bike">
            <span className="wheel wheel-back" />
            <span className="wheel wheel-front" />
            <span className="bike-body" />
            <span className="rider" />
            <span className="headlight" />
          </div>
        </>
      )}
      <div className="tree-line tree-line-back" />
      <div className="tree-line tree-line-front" />
      <div className="scene-fog" />
    </div>
  );
}

function RoadJourney({ onContinue }: { onContinue: () => void }) {
  const lines = [
    `${nickname}...`,
    "कुछ सफ़र मंज़िल के लिए नहीं होते...",
    "कुछ सफ़र किसी खास इंसान तक पहुँचने के लिए होते हैं।",
    "Come with me...",
  ];
  return (
    <section className="scene scene-road">
      <Landscape />
      <div className="scene-vignette" />
      <div className="journey-copy">
        {lines.map((line, index) => (
          <p key={line} className={`story-line story-line-${index + 1}`} style={lineDelay(index)}>
            {line}
          </p>
        ))}
        <div className="delayed-action">
          <StoryButton onClick={onContinue}>Continue</StoryButton>
        </div>
      </div>
    </section>
  );
}

function WaterfallScene({ onContinue }: { onContinue: () => void }) {
  const lines = [
    "अगर खूबसूरती को किसी जगह में ढूँढना हो...",
    "तो शायद मैं तुझे ऐसे ही किसी पहाड़ के पास ले जाऊँ।",
    "लेकिन...",
    "आज मुझे तुझे कहीं ले जाने की जरूरत नहीं।",
    "क्योंकि आज पूरा दिन सिर्फ तेरा है। ❤️",
  ];
  return (
    <section className="scene scene-waterfall">
      <Landscape waterfall />
      <div className="scene-vignette" />
      <div className="journey-copy wide-copy">
        {lines.map((line, index) => (
          <p key={line} className="story-line" style={lineDelay(index)}>
            {line}
          </p>
        ))}
        <div className="delayed-action waterfall-action">
          <StoryButton onClick={onContinue}>Take me there</StoryButton>
        </div>
      </div>
    </section>
  );
}

function BirthdayReveal({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="scene scene-reveal">
      <Stars count={30} />
      <div className="fairy-lights" aria-hidden="true">
        {Array.from({ length: 15 }, (_, index) => (
          <i key={index} style={{ "--light-delay": `${index * 0.16}s` } as CSSProperties} />
        ))}
      </div>
      <div className="balloons" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <i
            key={index}
            className={`balloon balloon-${(index % 3) + 1}`}
            style={
              {
                "--balloon-delay": `${index * -1.7}s`,
                "--balloon-x": `${5 + index * 11}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <FloatingParticles count={32} />
      <Fireworks />
      <div className="reveal-copy">
        <p className="birthday-date">15 SEPTEMBER 2026</p>
        <h1>
          HAPPY BIRTHDAY
          <br />
          <strong>{nickname.toUpperCase()} ❤️</strong>
        </h1>
        <p>Happy Birthday to the girl I lovingly call {nickname}.</p>
        <div className="reveal-action">
          <StoryButton onClick={onContinue}>There's more</StoryButton>
        </div>
      </div>
    </section>
  );
}

function CurtainScene({
  open,
  onOpen,
  onContinue,
}: {
  open: boolean;
  onOpen: () => void;
  onContinue: () => void;
}) {
  return (
    <section className={`scene scene-curtain ${open ? "curtain-is-open" : ""}`}>
      <div className="stage-light" />
      <FloatingParticles count={30} />
      <div className="curtain-surprise">
        <Sparkles size={44} />
        <p>And now...</p>
        <h2>The sweetest wish.</h2>
        <StoryButton onClick={onContinue}>Walk into the light</StoryButton>
      </div>
      <div className="curtain curtain-left">
        <span />
      </div>
      <div className="curtain curtain-right">
        <span />
      </div>
      <div className="curtain-copy">
        <p>Wait {nickname}...</p>
        <h1>Birthday surprise अभी खत्म नहीं हुआ।</h1>
        {!open && <StoryButton onClick={onOpen}>Open the Curtain</StoryButton>}
      </div>
    </section>
  );
}

// editstart---

function CakeScene({
  blown,
  onBlow,
  onContinue,
}: {
  litCandles: number;
  blown: boolean;
  onLight: () => void;
  onBlow: () => void;
  onContinue: () => void;
}) {
  const [cakeCut, setCakeCut] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [activeWord, setActiveWord] = useState<{
    word: string;
    left: string;
    top: string;
  } | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const balloonWords = [
    "Happy",
    "Birthday",
    "To",
    "The",
    "Most",
    "Beautiful",
    "Girl",
    "In",
    "My",
    "World",
  ];

  const balloons = [
    { left: "5%", top: "38%", color: "#ff4f81" },
    { left: "16%", top: "58%", color: "#8b5cf6" },
    { left: "28%", top: "72%", color: "#22d3ee" },
    { left: "38%", top: "82%", color: "#f59e0b" },
    { left: "52%", top: "84%", color: "#ef4444" },
    { left: "65%", top: "78%", color: "#22c55e" },
    { left: "76%", top: "62%", color: "#ec4899" },
    { left: "88%", top: "40%", color: "#06b6d4" },
    { left: "12%", top: "82%", color: "#a855f7" },
    { left: "84%", top: "82%", color: "#f97316" },
  ];

  const popBalloon = (index: number) => {
    if (poppedBalloons.has(index)) return;

    const balloon = balloons[index];
    const word = balloonWords[poppedBalloons.size];

    setPoppedBalloons((previous) => {
      const next = new Set(previous);
      next.add(index);
      return next;
    });

    setActiveWord({
      word,
      left: balloon.left,
      top: balloon.top,
    });

    window.setTimeout(() => {
      setActiveWord(null);
    }, 850);

    if (poppedBalloons.size + 1 === balloons.length) {
      window.setTimeout(() => {
        setShowFinalMessage(true);
      }, 1100);
    }
  };

  const allBalloonsPopped = poppedBalloons.size === balloons.length;

  return (
    <section className={`scene scene-cake ${blown ? "wish-made" : ""}`}>
      <Stars count={28} />

      {blown && <Fireworks />}

      <FloatingParticles count={26} />

      <style>{`
        .custom-cake-copy {
          position: relative;
          z-index: 100;
          text-align: center;
          padding: 10px 20px;
        }

        .custom-cake-copy p {
          margin: 0 0 8px;
          opacity: .8;
          letter-spacing: .18em;
          text-transform: uppercase;
          font-size: .8rem;
        }

        .custom-cake-copy h1 {
          margin: 0;
          font-size: clamp(1.4rem, 4vw, 2.5rem);
          line-height: 1.15;
        }

        .cake-stage-new {
          position: relative;
          width: min(600px, 94vw);
          height: 370px;
          margin: 5px auto 0;
          z-index: 20;
        }

        .cake-body {
          position: absolute;
          left: 50%;
          bottom: 35px;
          width: 360px;
          height: 285px;
          transform: translateX(-50%);
        }

        .cake-half-new {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition:
            transform 1.45s cubic-bezier(.18,.85,.22,1),
            filter 1.2s ease;
          z-index: 5;
        }

        .cake-half-new.left {
          left: 0;
          clip-path: inset(0 0 0 0);
        }

        .cake-half-new.right {
          right: 0;
          clip-path: inset(0 0 0 0);
        }

        .cake-body.is-cut .cake-half-new.left {
          transform: translateX(-105px) rotate(-2deg);
        }

        .cake-body.is-cut .cake-half-new.right {
          transform: translateX(105px) rotate(2deg);
        }

        .cake-inside {
          position: absolute;
          left: 50%;
          top: 0;
          width: 360px;
          height: 285px;
          transform: translateX(-50%);
        }

        .cake-layer {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 13px;
          box-shadow:
            inset 0 -9px 0 rgba(0,0,0,.08),
            0 12px 25px rgba(0,0,0,.2);
        }

        .cake-layer.bottom {
          bottom: 12px;
          width: 320px;
          height: 82px;
          background:
            linear-gradient(
              180deg,
              #f7b267 0%,
              #e18a54 55%,
              #cf7045 100%
            );
        }

        .cake-layer.middle {
          bottom: 85px;
          width: 275px;
          height: 67px;
          background:
            linear-gradient(
              180deg,
              #ffd6a5 0%,
              #f4ad78 60%,
              #df895f 100%
            );
        }

        .cake-layer.top {
          bottom: 145px;
          width: 220px;
          height: 58px;
          background:
            linear-gradient(
              180deg,
              #ffe8ef 0%,
              #f9b0c7 65%,
              #ed8eac 100%
            );
        }

        .cake-layer::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -9px;
          height: 20px;
          border-radius: 50%;
          background: #fff5f8;
          box-shadow: 0 4px 8px rgba(0,0,0,.12);
        }

        .cake-layer::after {
          content: "•  •  •  •  •";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255,255,255,.75);
          letter-spacing: 7px;
          white-space: nowrap;
          font-size: 12px;
        }

        .cake-plate-new {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 350px;
          height: 20px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,.9),
            rgba(210,210,230,.6)
          );
          box-shadow: 0 12px 25px rgba(0,0,0,.25);
          z-index: 2;
        }

        .cake-candles-new {
          position: absolute;
          z-index: 15;
          left: 50%;
          bottom: 194px;
          transform: translateX(-50%);
          display: flex;
          gap: 22px;
        }

        .cake-candle-new {
          position: relative;
          width: 12px;
          height: 54px;
          border-radius: 5px;
          background:
            repeating-linear-gradient(
              -45deg,
              #ffffff 0px,
              #ffffff 6px,
              #ff7da6 6px,
              #ff7da6 10px
            );
          box-shadow: 0 3px 7px rgba(0,0,0,.15);
        }

        /* Candles are ALWAYS lit when the cake appears */
        .cake-candle-new::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -23px;
          width: 15px;
          height: 22px;
          transform: translateX(-50%);
          border-radius: 50% 50% 45% 45%;
          background:
            radial-gradient(
              circle at 50% 70%,
              #fff 0 15%,
              #ffd166 25%,
              #ff9f1c 60%,
              transparent 70%
            );
          filter: drop-shadow(0 0 9px #ffb703);
          animation: candleFlame 0.65s ease-in-out infinite alternate;
        }

        @keyframes candleFlame {
          from {
            transform: translateX(-50%) scale(.88) rotate(-4deg);
          }

          to {
            transform: translateX(-50%) scale(1.12) rotate(4deg);
          }
        }

        .cake-body.candles-blown .cake-candle-new::after {
  opacity: 0;
  animation: candleOut .55s ease forwards;
}

        @keyframes candleOut {
          0% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateX(-50%) scale(.15);
          }
        }

        .knife-new {
          position: absolute;
          z-index: 40;
          left: 50%;
          top: -25px;
          font-size: 58px;
          opacity: 0;
          pointer-events: none;
        }

        .cake-body.is-cut .knife-new {
          animation: knifeCutNew 1.25s ease-in-out forwards;
        }

        @keyframes knifeCutNew {
          0% {
            opacity: 0;
            transform:
              translate(-50%, -90px)
              rotate(-35deg);
          }

          15% {
            opacity: 1;
          }

          55% {
            opacity: 1;
            transform:
              translate(-50%, 130px)
              rotate(8deg);
          }

          75% {
            opacity: 1;
            transform:
              translate(-50%, 130px)
              rotate(8deg);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, 170px)
              rotate(15deg);
          }
        }

        .cut-line-new {
          position: absolute;
          z-index: 35;
          left: 50%;
          bottom: 25px;
          width: 6px;
          height: 200px;
          transform:
            translateX(-50%)
            scaleY(0);
          transform-origin: top;
          border-radius: 99px;
          background: white;
          opacity: 0;
          box-shadow:
            0 0 8px white,
            0 0 20px #ff9ed0,
            0 0 35px #ff5ca8;
        }

        .cake-body.is-cut .cut-line-new {
          animation: cutLineNew 1.25s ease-out forwards;
        }

        @keyframes cutLineNew {
          0% {
            opacity: 0;
            transform:
              translateX(-50%)
              scaleY(0);
          }

          35% {
            opacity: 1;
            transform:
              translateX(-50%)
              scaleY(1);
          }

          75% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translateX(-50%)
              scaleY(1);
          }
        }

        .balloon-layer-new {
          position: absolute;
          inset: 0;
          z-index: 80;
          pointer-events: none;
        }

        .birthday-balloon-new {
          position: absolute;
          width: 59px;
          height: 73px;
          border: none;
          padding: 0;
          border-radius: 50% 50% 46% 46%;
          cursor: pointer;
          pointer-events: auto;
          outline: none;
          touch-action: manipulation;
          box-shadow:
            inset -11px -12px 16px rgba(0,0,0,.15),
            inset 9px 8px 14px rgba(255,255,255,.42),
            0 8px 20px rgba(0,0,0,.2);
          animation:
            balloonFloatNew 2.8s ease-in-out infinite;
        }

        .birthday-balloon-new:hover {
          transform: scale(1.12);
        }

        .birthday-balloon-new::before {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -5px;
          width: 9px;
          height: 9px;
          transform: translateX(-50%) rotate(45deg);
          background: inherit;
        }

        .birthday-balloon-new::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          width: 1px;
          height: 70px;
          background: rgba(255,255,255,.65);
        }

        @keyframes balloonFloatNew {
          0%, 100% {
            margin-top: 0;
          }

          50% {
            margin-top: -13px;
          }
        }

        .birthday-balloon-new.popping {
          animation:
            balloonPopNew .48s ease-out forwards !important;
          pointer-events: none;
        }

        @keyframes balloonPopNew {
          0% {
            opacity: 1;
            transform: scale(1);
          }

          35% {
            opacity: 1;
            transform: scale(1.4);
          }

          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .word-pop-new {
          position: absolute;
          z-index: 120;
          transform: translate(-50%, -50%);
          pointer-events: none;
          color: white;
          font-size: clamp(1.1rem, 3vw, 1.8rem);
          font-weight: 900;
          letter-spacing: .04em;
          text-shadow:
            0 0 8px white,
            0 0 18px #ff75b5,
            0 0 35px #ff4f9a;
          animation: wordPopNew .85s ease-out forwards;
          white-space: nowrap;
        }

        @keyframes wordPopNew {
          0% {
            opacity: 0;
            transform: translate(-50%, -20%)
              scale(.5);
          }

          25% {
            opacity: 1;
            transform: translate(-50%, -50%)
              scale(1.25);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -100%)
              scale(1);
          }
        }

        .final-birthday-new {
          position: absolute;
          inset: 0;
          z-index: 200;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 25px;
          background:
            radial-gradient(
              circle at center,
              rgba(255,80,160,.16),
              transparent 65%
            );
          animation: finalAppearNew 1.2s ease-out forwards;
        }

        @keyframes finalAppearNew {
          from {
            opacity: 0;
            transform: scale(.75);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .final-birthday-new h2 {
          margin: 0;
          max-width: 850px;
          font-size: clamp(2rem, 7vw, 5rem);
          line-height: 1.05;
          font-weight: 900;
          color: white;
          text-shadow:
            0 0 12px white,
            0 0 30px #ff69b4,
            0 0 65px rgba(255,80,170,.75);
          animation: finalGlowNew 1.8s ease-in-out infinite alternate;
        }

        @keyframes finalGlowNew {
          from {
            filter: brightness(1);
          }

          to {
            filter: brightness(1.25);
          }
        }

        .final-birthday-new .final-hearts {
          margin-top: 20px;
          font-size: 2rem;
          letter-spacing: 10px;
          animation: heartFloatNew 2s ease-in-out infinite;
        }

        @keyframes heartFloatNew {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        .final-button-new {
          margin-top: 30px;
          pointer-events: auto;
        }
      `}</style>

      {/* Heading */}
      <div className="custom-cake-copy">
        <p>{nickname}...</p>

        <h1>
          {!blown
            ? "Make a wish... then blow the candles ❤️"
            : !cakeCut
              ? "The candles are out... now cut the cake 🎂"
              : !allBalloonsPopped
                ? "Now pop the balloons 🎈"
                : "❤️"}
        </h1>
      </div>

      {/* CAKE */}
      <div className="cake-stage-new">
        <div className={`cake-body ${blown ? "candles-blown" : ""} ${cakeCut ? "is-cut" : ""}`}>
          {/* LEFT HALF */}
          <div className="cake-half-new left">
            <div className="cake-inside">
              <div className="cake-layer bottom" />
              <div className="cake-layer middle" />
              <div className="cake-layer top" />
            </div>
          </div>

          {/* RIGHT HALF */}
          <div className="cake-half-new right">
            <div className="cake-inside">
              <div className="cake-layer bottom" />
              <div className="cake-layer middle" />
              <div className="cake-layer top" />
            </div>
          </div>

          {/* ALREADY LIT CANDLES */}
          {!cakeCut && (
            <div className="cake-candles-new">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="cake-candle-new" />
              ))}
            </div>
          )}

          {/* Knife + glowing cut */}
          {cakeCut && (
            <>
              <div className="knife-new">🔪</div>
              <div className="cut-line-new" />
            </>
          )}

          <div className="cake-plate-new" />
        </div>
      </div>

      {/* BALLOONS */}
      {cakeCut && !showFinalMessage && (
        <div className="balloon-layer-new">
          {balloons.map((balloon, index) => {
            const popped = poppedBalloons.has(index);

            return (
              <button
                key={index}
                type="button"
                className={`birthday-balloon-new ${popped ? "popping" : ""}`}
                aria-label={`Pop balloon ${index + 1}`}
                onClick={(event) => {
                  event.preventDefault();
                  popBalloon(index);
                }}
                style={{
                  left: balloon.left,
                  top: balloon.top,
                  background: balloon.color,
                  animationDelay: `${index * 0.12}s`,
                }}
              />
            );
          })}

          {/* ONE WORD AFTER EACH BALLOON */}
          {activeWord && (
            <div
              className="word-pop-new"
              style={{
                left: activeWord.left,
                top: activeWord.top,
              }}
            >
              {activeWord.word}
            </div>
          )}
        </div>
      )}

      {/* FINAL MESSAGE */}
      {showFinalMessage && (
        <div className="final-birthday-new">
          <h2>Happy Birthday To The Most Beautiful Girl In My World ❤️</h2>

          <div className="final-hearts">✨ ❤️ ✨</div>

          <div className="final-button-new">
            <StoryButton onClick={onContinue}>Open Your Memories ❤️</StoryButton>
          </div>
        </div>
      )}

      {/* BUTTONS */}
      <div className="cake-actions">
        {!blown && <StoryButton onClick={onBlow}>💨 Blow the Candles</StoryButton>}

        {blown && !cakeCut && (
          <StoryButton
            onClick={() => {
              setCakeCut(true);
            }}
          >
            🔪 Cut the Cake
          </StoryButton>
        )}
      </div>
    </section>
  );
}

// editend---

function PhotoPlaceholder({ index }: { index: number }) {
  return (
    <div className={`photo-placeholder placeholder-${(index % 5) + 1}`}>
      <Heart size={28} fill="currentColor" />
      <span>PHOTO {String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function MemoryPhoto({ index, className = "" }: { index: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <PhotoPlaceholder index={index} />
  ) : (
    <img
      className={className}
      src={photoPaths[index]}
      alt={`Memory ${index + 1} with ${birthdayGirl}`}
      onError={() => setFailed(true)}
    />
  );
}

function MemoriesScene({
  pointer,
  onOpen,
  onContinue,
}: {
  pointer: { x: number; y: number };
  onOpen: (index: number) => void;
  onContinue: () => void;
}) {
  return (
    <section className="scene scene-memories">
      <Stars count={38} />
      <div className="memory-heading">
        <p>A constellation of little moments</p>
        <h1>Twenty memories of {nickname}</h1>
      </div>
      <div
        className="photo-orbit"
        style={{
          transform: `perspective(1200px) rotateY(${pointer.x * 2}deg) rotateX(${pointer.y * -1.5}deg)`,
        }}
      >
        {photoPaths.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`memory-card memory-card-${index + 1}`}
            onClick={() => onOpen(index)}
            aria-label={`Open memory ${index + 1}`}
            style={
              {
                "--card-delay": `${index * -0.45}s`,
                "--card-rotation": `${((index % 5) - 2) * 2.4}deg`,
              } as CSSProperties
            }
          >
            <MemoryPhoto index={index} />
            <span>{photoCaptions[index]}</span>
          </button>
        ))}
      </div>
      <div className="memory-action">
        <StoryButton onClick={onContinue}>Keep going</StoryButton>
      </div>
    </section>
  );
}

function PhotoViewer({
  index,
  onClose,
  onMove,
  onTouchStart,
  onTouchEnd,
}: {
  index: number;
  onClose: () => void;
  onMove: (direction: number) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onMove]);

  return (
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`Memory ${index + 1}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Stars count={24} />
      <button
        className="viewer-control viewer-close"
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
      >
        <X />
      </button>
      <button
        className="viewer-control viewer-prev"
        type="button"
        onClick={() => onMove(-1)}
        aria-label="Previous photo"
      >
        <ArrowLeft />
      </button>
      <figure key={index}>
        <div className="viewer-image">
          <MemoryPhoto index={index} />
        </div>
        <figcaption>
          <span>{String(index + 1).padStart(2, "0")} / 20</span>
          {photoCaptions[index]}
        </figcaption>
      </figure>
      <button
        className="viewer-control viewer-next"
        type="button"
        onClick={() => onMove(1)}
        aria-label="Next photo"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

function EmotionalScene({
  type,
  onContinue,
}: {
  type: "eyes" | "strength";
  onContinue: () => void;
}) {
  const isEyes = type === "eyes";
  const lines = isEyes
    ? [
        `${nickname}...`,
        "तेरी आँखों में कुछ ऐसा है...",
        "जिसे शायद मैं कभी ठीक से शब्दों में नहीं बता पाऊँगा।",
        "और तेरी smile...",
        "बस उसे देखकर mood अच्छा हो जाता है। ❤️",
      ]
    : [
        "मैंने हमेशा एक चीज़ notice की है...",
        "तू कितनी भी परेशान हो...",
        "कितनी भी मुश्किल चीज़ सामने हो...",
        "तू फिर भी संभाल लेती है।",
        "और शायद इसी strength की मैं सबसे ज्यादा respect करता हूँ।",
      ];
  return (
    <section className={`scene scene-emotional ${isEyes ? "is-eyes" : "is-strength"}`}>
      <Stars count={54} />
      <div className="emotional-halo" />
      <div className="emotional-lines">
        {lines.map((line, index) => (
          <p key={line} className="story-line" style={lineDelay(index)}>
            {line}
          </p>
        ))}
        <div className="delayed-action emotional-action">
          <StoryButton onClick={onContinue}>
            {isEyes ? "And something more..." : "Read my letter"}
          </StoryButton>
        </div>
      </div>
    </section>
  );
}

function LetterScene({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="scene scene-letter">
      <div className="letter-desk" />
      <FloatingParticles count={16} />
      <article className="letter-paper">
        <span className="letter-pin">
          <Heart size={18} fill="currentColor" />
        </span>
        <p className="letter-kicker">Something I wanted to tell you...</p>
        <div className="letter-message">{personalMessage}</div>
        <span className="letter-sign">— just for {nickname}</span>
      </article>
      <div className="letter-action">
        <StoryButton onClick={onContinue}>One last thing</StoryButton>
      </div>
    </section>
  );
}

function LastQuestion({
  questionOpen,
  answer,
  onOpen,
  onAnswer,
  onContinue,
}: {
  questionOpen: boolean;
  answer: "yes" | "think" | null;
  onOpen: () => void;
  onAnswer: (answer: "yes" | "think") => void;
  onContinue: () => void;
}) {
  const introLines = [
    `${nickname}...`,
    "एक आखिरी बात है।",
    "I made all of this...",
    "because you're special to me.",
  ];
  return (
    <section className="scene scene-question">
      <Stars count={40} />
      {answer === "yes" && (
        <>
          <Fireworks />
          <div className="heart-rain" aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => (
              <Heart
                key={i}
                fill="currentColor"
                style={
                  {
                    "--heart-x": `${(i * 43) % 100}%`,
                    "--heart-delay": `${i * -0.4}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </>
      )}
      {!questionOpen ? (
        <div className="question-intro">
          {introLines.map((line, index) => (
            <p key={line} className="story-line" style={lineDelay(index)}>
              {line}
            </p>
          ))}
          <div className="delayed-action question-action">
            <StoryButton onClick={onOpen}>One Last Question</StoryButton>
          </div>
        </div>
      ) : (
        <div className="question-card">
          {!answer ? (
            <>
              <Heart size={38} fill="currentColor" />
              <h1>Will you stay a little longer in my story? ❤️</h1>
              <div className="answer-actions">
                <StoryButton onClick={() => onAnswer("yes")}>Yes</StoryButton>
                <button className="quiet-button" type="button" onClick={() => onAnswer("think")}>
                  Let me think...
                </button>
              </div>
            </>
          ) : (
            <div className="answer-copy">
              <h1>
                {answer === "yes"
                  ? "Then let's see where this story goes... ❤️"
                  : `Take your time, ${nickname}.`}
              </h1>
              {answer === "think" && <p>Some answers are worth waiting for. ❤️</p>}
              <StoryButton onClick={onContinue}>See the sunrise</StoryButton>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function FinalScene({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="scene scene-final">
      <Landscape sunrise />
      <div className="scene-vignette" />
      <div className="final-copy">
        <p className="final-eyebrow">{birthday}</p>
        <h1>
          Happy Birthday,
          <br />
          <strong>{nickname} ❤️</strong>
        </h1>
        <p className="final-date">
          15 <i /> 09 <i /> 2026
        </p>
        <p className="final-wish">
          May your life always have
          <br />
          reasons to smile,
          <br />
          places to explore,
          <br />
          people who truly care,
          <br />
          and dreams that come true.
        </p>
        <p className="final-signoff">
          Made with ❤️
          <br />
          <span>just for you.</span>
        </p>
        <StoryButton icon={<RotateCcw size={17} />} onClick={onReplay}>
          Replay Our Story
        </StoryButton>
      </div>
    </section>
  );
}
