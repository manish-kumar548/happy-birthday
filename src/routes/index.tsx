import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Heart,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
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
const password = "i love you";

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

const lineDelay = (index: number) => ({ "--line-delay": `${0.55 + index * 1.65}s` }) as CSSProperties;

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

  const submitPassword = (event: FormEvent) => {
    event.preventDefault();
    if (enteredPassword.trim().toLocaleLowerCase() === password) {
      setPasswordError("");
      goToScene(1);
      return;
    }
    setPasswordError("Oops... that's not the answer I'm looking for ❤️");
  };

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

function StoryButton({ children, onClick, icon }: { children: ReactNode; onClick?: () => void; icon?: ReactNode }) {
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

function Landscape({ waterfall = false, sunrise = false }: { waterfall?: boolean; sunrise?: boolean }) {
  return (
    <div className={`landscape ${waterfall ? "is-waterfall" : ""} ${sunrise ? "is-sunrise" : ""}`} aria-hidden="true">
      <div className="sun" />
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="cloud cloud-c" />
      <div className="mountain mountain-back" />
      <div className="mountain mountain-mid" />
      <div className="mountain mountain-front" />
      {waterfall ? (
        <>
          <div className="waterfall"><i /><i /><i /></div>
          <div className="river"><i /><i /><i /></div>
          <div className="birds"><i /><i /><i /></div>
          <div className="mist mist-a" />
          <div className="mist mist-b" />
        </>
      ) : sunrise ? null : (
        <>
          <div className="road"><i /><i /><i /><i /></div>
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
          <p key={line} className={`story-line story-line-${index + 1}`} style={lineDelay(index)}>{line}</p>
        ))}
        <div className="delayed-action"><StoryButton onClick={onContinue}>Continue</StoryButton></div>
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
          <p key={line} className="story-line" style={lineDelay(index)}>{line}</p>
        ))}
        <div className="delayed-action waterfall-action"><StoryButton onClick={onContinue}>Take me there</StoryButton></div>
      </div>
    </section>
  );
}

function BirthdayReveal({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="scene scene-reveal">
      <Stars count={30} />
      <div className="fairy-lights" aria-hidden="true">
        {Array.from({ length: 15 }, (_, index) => <i key={index} style={{ "--light-delay": `${index * 0.16}s` } as CSSProperties} />)}
      </div>
      <div className="balloons" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} className={`balloon balloon-${(index % 3) + 1}`} style={{ "--balloon-delay": `${index * -1.7}s`, "--balloon-x": `${5 + index * 11}%` } as CSSProperties} />)}
      </div>
      <FloatingParticles count={32} />
      <Fireworks />
      <div className="reveal-copy">
        <p className="birthday-date">15 SEPTEMBER 2026</p>
        <h1>HAPPY BIRTHDAY<br /><strong>{nickname.toUpperCase()} ❤️</strong></h1>
        <p>Happy Birthday to the girl I lovingly call {nickname}.</p>
        <div className="reveal-action"><StoryButton onClick={onContinue}>There's more</StoryButton></div>
      </div>
    </section>
  );
}

function CurtainScene({ open, onOpen, onContinue }: { open: boolean; onOpen: () => void; onContinue: () => void }) {
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
      <div className="curtain curtain-left"><span /></div>
      <div className="curtain curtain-right"><span /></div>
      <div className="curtain-copy">
        <p>Wait {nickname}...</p>
        <h1>Birthday surprise अभी खत्म नहीं हुआ।</h1>
        {!open && <StoryButton onClick={onOpen}>Open the Curtain</StoryButton>}
      </div>
    </section>
  );
}

function CakeScene({
  litCandles,
  blown,
  onLight,
  onBlow,
  onContinue,
}: {
  litCandles: number;
  blown: boolean;
  onLight: () => void;
  onBlow: () => void;
  onContinue: () => void;
}) {
  return (
    <section className={`scene scene-cake ${litCandles > 0 ? "candles-lit" : ""} ${blown ? "wish-made" : ""}`}>
      <Stars count={28} />
      {blown && <Fireworks />}
      <FloatingParticles count={26} />
      <div className="cake-copy">
        <p>{nickname}...</p>
        <h1>{blown ? `Happy Birthday, ${nickname} ❤️` : litCandles === 5 ? "Now make your wish..." : "Make a wish."}</h1>
      </div>
      <div className="cake" aria-label="A three-tier birthday cake with five candles">
        <div className="candles">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`candle candle-${index + 1}`}>
              <i className={index < litCandles ? "flame is-lit" : "flame"} />
            </span>
          ))}
        </div>
        <div className="cake-tier cake-top"><span className="icing" /><i /><i /><i /></div>
        <div className="cake-tier cake-middle"><span className="icing" /><i /><i /><i /><i /></div>
        <div className="cake-tier cake-bottom"><span className="icing" /><i /><i /><i /><i /><i /></div>
        <div className="cake-plate" />
      </div>
      <div className="cake-actions">
        {litCandles === 0 && !blown && <StoryButton icon={<Flame size={17} />} onClick={onLight}>Light the Candles</StoryButton>}
        {litCandles === 5 && !blown && <StoryButton onClick={onBlow}>Blow the Candles</StoryButton>}
        {blown && <StoryButton onClick={onContinue}>Open your memories</StoryButton>}
      </div>
    </section>
  );
}

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
    <img className={className} src={photoPaths[index]} alt={`Memory ${index + 1} with ${birthdayGirl}`} onError={() => setFailed(true)} />
  );
}

function MemoriesScene({ pointer, onOpen, onContinue }: { pointer: { x: number; y: number }; onOpen: (index: number) => void; onContinue: () => void }) {
  return (
    <section className="scene scene-memories">
      <Stars count={38} />
      <div className="memory-heading">
        <p>A constellation of little moments</p>
        <h1>Twenty memories of {nickname}</h1>
      </div>
      <div className="photo-orbit" style={{ transform: `perspective(1200px) rotateY(${pointer.x * 2}deg) rotateX(${pointer.y * -1.5}deg)` }}>
        {photoPaths.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`memory-card memory-card-${index + 1}`}
            onClick={() => onOpen(index)}
            aria-label={`Open memory ${index + 1}`}
            style={{ "--card-delay": `${index * -0.45}s`, "--card-rotation": `${(index % 5 - 2) * 2.4}deg` } as CSSProperties}
          >
            <MemoryPhoto index={index} />
            <span>{photoCaptions[index]}</span>
          </button>
        ))}
      </div>
      <div className="memory-action"><StoryButton onClick={onContinue}>Keep going</StoryButton></div>
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
    <div className="photo-viewer" role="dialog" aria-modal="true" aria-label={`Memory ${index + 1}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Stars count={24} />
      <button className="viewer-control viewer-close" type="button" onClick={onClose} aria-label="Close photo viewer"><X /></button>
      <button className="viewer-control viewer-prev" type="button" onClick={() => onMove(-1)} aria-label="Previous photo"><ArrowLeft /></button>
      <figure key={index}>
        <div className="viewer-image"><MemoryPhoto index={index} /></div>
        <figcaption>
          <span>{String(index + 1).padStart(2, "0")} / 20</span>
          {photoCaptions[index]}
        </figcaption>
      </figure>
      <button className="viewer-control viewer-next" type="button" onClick={() => onMove(1)} aria-label="Next photo"><ArrowRight /></button>
    </div>
  );
}

function EmotionalScene({ type, onContinue }: { type: "eyes" | "strength"; onContinue: () => void }) {
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
        {lines.map((line, index) => <p key={line} className="story-line" style={lineDelay(index)}>{line}</p>)}
        <div className="delayed-action emotional-action"><StoryButton onClick={onContinue}>{isEyes ? "And something more..." : "Read my letter"}</StoryButton></div>
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
        <span className="letter-pin"><Heart size={18} fill="currentColor" /></span>
        <p className="letter-kicker">Something I wanted to tell you...</p>
        <div className="letter-message">{personalMessage}</div>
        <span className="letter-sign">— just for {nickname}</span>
      </article>
      <div className="letter-action"><StoryButton onClick={onContinue}>One last thing</StoryButton></div>
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
    "और शायद...",
    "मैं तुझे ये कभी ठीक से बता नहीं पाया।",
  ];
  return (
    <section className="scene scene-question">
      <Stars count={40} />
      {answer === "yes" && <><Fireworks /><div className="heart-rain" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <Heart key={i} fill="currentColor" style={{ "--heart-x": `${(i * 43) % 100}%`, "--heart-delay": `${i * -0.4}s` } as CSSProperties} />)}</div></>}
      {!questionOpen ? (
        <div className="question-intro">
          {introLines.map((line, index) => <p key={line} className="story-line" style={lineDelay(index)}>{line}</p>)}
          <div className="delayed-action question-action"><StoryButton onClick={onOpen}>One Last Question</StoryButton></div>
        </div>
      ) : (
        <div className="question-card">
          {!answer ? (
            <>
              <Heart size={38} fill="currentColor" />
              <h1>Will you stay a little longer in my story? ❤️</h1>
              <div className="answer-actions">
                <StoryButton onClick={() => onAnswer("yes")}>Yes</StoryButton>
                <button className="quiet-button" type="button" onClick={() => onAnswer("think")}>Let me think...</button>
              </div>
            </>
          ) : (
            <div className="answer-copy">
              <h1>{answer === "yes" ? "Then let's see where this story goes... ❤️" : `Take your time, ${nickname}.`}</h1>
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
        <h1>Happy Birthday,<br /><strong>{nickname} ❤️</strong></h1>
        <p className="final-date">15 <i /> 09 <i /> 2026</p>
        <p className="final-wish">May your life always have<br />reasons to smile,<br />places to explore,<br />people who truly care,<br />and dreams that come true.</p>
        <p className="final-signoff">Made with ❤️<br /><span>just for you.</span></p>
        <StoryButton icon={<RotateCcw size={17} />} onClick={onReplay}>Replay Our Story</StoryButton>
      </div>
    </section>
  );
}
