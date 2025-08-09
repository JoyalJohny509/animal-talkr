import React, { useState, useRef, useEffect } from 'react';

// Using inline SVGs instead of a library to ensure compatibility.
const Mic = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>;
const MicOff = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>;
const Play = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const Pause = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>;
const Volume2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>;
const Star = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const Heart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const Camera = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>;
const CameraOff = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path></svg>;
const Sparkles = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3zM5 21l1.9-5.8L1 13.3l5.8-1.9L5 21zM23 1l-1.9 5.8L15.3 5l5.8 1.9L23 1z"></path></svg>;
const ChevronsRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>;
const Music = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


// --- Helper Component for the Animated Dog Face ---
const AnimatedDogFace = () => {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
    const [isInitialized, setIsInitialized] = useState(false);
    const [cameraError, setCameraError] = useState(false);

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };
    
    useEffect(() => {
        const setupFaceAPI = async () => {
            try {
                await loadScript("https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js");
                const faceapi = window.faceapi;
                
                const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights';
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setIsInitialized(true);
            } catch (err) {
                console.error("Initialization failed:", err);
                setCameraError(true);
            }
        };

        setupFaceAPI();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleVideoPlay = () => {
        intervalRef.current = setInterval(async () => {
            if (videoRef.current && window.faceapi && !videoRef.current.paused) {
                const detections = await window.faceapi.detectSingleFace(videoRef.current, new window.faceapi.TinyFaceDetectorOptions());
                if (detections) {
                    const videoWidth = videoRef.current.videoWidth;
                    const videoHeight = videoRef.current.videoHeight;
                    const faceCenterX = detections.box.x + detections.box.width / 2;
                    const faceCenterY = detections.box.y + detections.box.height / 2;
                    const pupilX = ((faceCenterX / videoWidth) * 2 - 1) * 6;
                    const pupilY = ((faceCenterY / videoHeight) * 2 - 1) * 6;
                    setPupilPos({ x: -pupilX, y: pupilY });
                }
            }
        }, 100);
    };

    if (cameraError) {
        return ( <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg"><CameraOff className="mx-auto mb-2" size={48} /><p className="font-bold">Camera Error</p><p className="text-sm">Please grant camera permission!</p></div> );
    }

    if (!isInitialized) {
        return ( <div className="text-center text-purple-600"><Camera className="mx-auto mb-2 animate-pulse" size={48} /><p>Initializing Camera...</p></div> );
    }

    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <g>
                    <path d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z" fill="#E6A23C"/>
                    <path d="M10,20 C0,40 10,60 25,50 Z" fill="#A0522D" transform="rotate(-15, 15, 40)"/>
                    <path d="M90,20 C100,40 90,60 75,50 Z" fill="#A0522D" transform="rotate(15, 85, 40)"/>
                    <circle cx="35" cy="45" r="10" fill="white"/><circle cx="65" cy="45" r="10" fill="white"/>
                    <circle cx="35" cy="45" r="5" fill="black" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`, transition: 'transform 0.2s ease-out' }}/><circle cx="65" cy="45" r="5" fill="black" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`, transition: 'transform 0.2s ease-out' }}/>
                    <path d="M45,65 Q50,75 55,65 Z" fill="black"/><path d="M40,75 Q50,85 60,75" stroke="black" strokeWidth="2" fill="none"/>
                </g>
            </svg>
            <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted playsInline className="absolute w-px h-px opacity-0 -z-10"></video>
        </div>
    );
};

// --- Helper Component for the Animal Quiz ---
const AnimalQuiz = ({ onComplete }) => {
    const questions = [
        { question: "How do you greet your friends?", answers: { "Dog": "With a huge, excited hug!", "Cat": "With a cool, subtle nod.", "Cow": "With a quiet, thoughtful smile.", "Duck": "With a cheerful wave and a loud 'Hello!'" } },
        { question: "What's your ideal weekend activity?", answers: { "Monkey": "Running around outside and playing games.", "Lion": "Napping in a cozy, sunny spot.", "Cow": "Quietly thinking or reading a book.", "Cat": "Observing everything from a comfy perch." } },
        { question: "A mysterious box appears. What do you do?", answers: { "Duck": "Open it immediately! I love surprises!", "Lion": "Observe it from a distance before approaching.", "Dog": "Sniff it excitedly from all angles!", "Monkey": "Try to figure out how to get it open, maybe shake it!" } }
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ Dog: 0, Cat: 0, Cow: 0, Duck: 0, Lion: 0, Monkey: 0 });

    const handleAnswer = (animal) => {
        const newScores = { ...scores, [animal]: scores[animal] + 1 };
        setScores(newScores);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const finalWinner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
            onComplete(finalWinner);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">Question {currentQuestion + 1}</h3>
                <p className="text-xl font-semibold text-gray-700 mb-6">{questions[currentQuestion].question}</p>
                <div className="grid grid-cols-1 gap-3">
                    {Object.entries(questions[currentQuestion].answers).map(([animal, answerText]) => (
                        <button key={animal} onClick={() => handleAnswer(animal)} className="w-full text-left p-4 bg-white/80 rounded-lg font-semibold text-gray-800 hover:bg-white hover:scale-105 transition-transform duration-200 shadow-sm">{answerText}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Helper Component for the Animal Smule Page ---
const AnimalSmule = ({ animal, songs, onClose }) => {
    const [playingSong, setPlayingSong] = useState(null);
    const synthRef = useRef(null);
    const seqRef = useRef(null);

    useEffect(() => {
        if(window.Tone) {
            synthRef.current = new window.Tone.Synth({ oscillator: { type: 'fatsawtooth' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.2, release: 0.4 } }).toDestination();
        }
        return () => {
            if (window.Tone && window.Tone.Transport.state === 'started') {
                window.Tone.Transport.stop();
            }
            if (seqRef.current) seqRef.current.dispose();
            if (synthRef.current) synthRef.current.dispose();
        };
    }, []);

    const playSong = (song) => {
        if (!window.Tone) return;

        if (playingSong === song.name) {
            window.Tone.Transport.stop();
            setPlayingSong(null);
            return;
        }
        if (seqRef.current) seqRef.current.stop().dispose();
        
        seqRef.current = new window.Tone.Sequence((time, note) => {
            synthRef.current.triggerAttackRelease(note, '8n', time);
        }, song.melody, '4n').start(0);
        
        window.Tone.Transport.on('stop', () => {
            setPlayingSong(null);
        });

        window.Tone.Transport.start();
        setPlayingSong(song.name);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 bg-red-400 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors"><X size={20}/></button>
                <Music className="mx-auto text-purple-500 mb-2" size={32}/>
                <h2 className="text-3xl font-bold text-purple-700 mb-2">Critter Concert</h2>
                <div className="text-8xl my-4 animate-bounce">{animal.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">{animal.name}'s Playlist</h3>
                <div className="grid grid-cols-1 gap-3">
                    {songs[animal.name].map((song) => (
                        <button key={song.name} onClick={() => playSong(song)} className={`w-full text-left p-4 rounded-lg font-semibold transition-all duration-200 shadow-sm flex items-center justify-between ${ playingSong === song.name ? 'bg-green-200 text-green-800 scale-105' : 'bg-white/80 text-gray-800 hover:bg-white'}`}>
                            <span>{song.name}</span>
                            {playingSong === song.name ? <Pause size={20}/> : <Play size={20}/>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Helper Component for the Animal Dating Page ---
const AnimalDating = ({ animals, onClose }) => {
    const [wagged, setWagged] = useState({});

    const handleWag = (name) => {
        setWagged(prev => ({ ...prev, [name]: true }));
        setTimeout(() => setWagged(prev => ({ ...prev, [name]: false })), 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 bg-red-400 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors"><X size={20}/></button>
                <Heart className="mx-auto text-red-500 mb-2" size={32}/>
                <h2 className="text-3xl font-bold text-red-700 mb-4">Critter Cupid</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
                    {animals.map(animal => (
                        <div key={animal.name} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 text-left shadow-lg">
                            <img src={animal.image} alt={animal.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"/>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{animal.datingName}</h3>
                                <p className="text-sm text-gray-600 italic">"{animal.bio}"</p>
                                <button onClick={() => handleWag(animal.name)} className="mt-2 px-4 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors flex items-center gap-1 relative">
                                    {wagged[animal.name] && <Heart className="absolute -top-5 -left-2 text-red-500 animate-ping" size={24}/>}
                                    <Heart size={14}/> Wag
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Main AnimalTalkr Component ---
const AnimalTalkr = () => {
    const [selectedAnimal, setSelectedAnimal] = useState('Dog');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [translation, setTranslation] = useState(null);
    const [ssmlOutput, setSsmlOutput] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSupported, setAudioSupported] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [showSmule, setShowSmule] = useState(false);
    const [showDating, setShowDating] = useState(false);
    
    const timerRef = useRef(null);

    const animals = [ 
        { name: 'Dog', emoji: '🐶', datingName: "Sir Barks-a-Lot", bio: "Loves long walks and chasing squirrels. Will steal your heart (and your socks).", image: "https://placehold.co/96x96/E6A23C/FFFFFF?text=🐶" },
        { name: 'Cat', emoji: '🐱', datingName: "The Notorious C.A.T.", bio: "Independent thinker seeking a quiet lap for world domination plotting. Must provide snacks.", image: "https://placehold.co/96x96/A9A9A9/FFFFFF?text=🐱" },
        { name: 'Cow', emoji: '🐄', datingName: "Moo-na Lisa", bio: "Gentle soul who enjoys quiet pastures and deep thoughts. Looking for someone to chew the cud with.", image: "https://placehold.co/96x96/D2B48C/FFFFFF?text=🐄" },
        { name: 'Duck', emoji: '🦆', datingName: "Quack Nicholson", bio: "Life's a pond, just splash in it! Seeking a partner for bread-based adventures.", image: "https://placehold.co/96x96/2E8B57/FFFFFF?text=🦆" },
        { name: 'Lion', emoji: '🦁', datingName: "Leonardo DiCatprio", bio: "King of the jungle seeking a queen. Must enjoy 20-hour naps and the finer things in life.", image: "https://placehold.co/96x96/FFA500/FFFFFF?text=🦁" },
        { name: 'Monkey', emoji: '🐵', datingName: "Chimp Chimperson", bio: "Just hanging around! Looking for a fellow adventurer to swing through life with. Bananas are a plus.", image: "https://placehold.co/96x96/8B4513/FFFFFF?text=🐵" }
    ];

    const songs = {
        Dog: [ { name: "Twinkle, Twinkle", melody: ["C4", "C4", "G4", "G4", "A4", "A4", "G4"] }, { name: "Old MacDonald", melody: ["G4", "G4", "G4", "D4", "E4", "E4", "D4"] } ],
        Cat: [ { name: "Meow Mix Theme", melody: ["E5", "D5", "C5", "D5", "E5", "E5", "E5"] }, { name: "A-Tisket, A-Tasket", melody: ["G4", "F4", "G4", "A4", "G4", "F4", "G4"] } ],
        Cow: [ { name: "Home on the Range", melody: ["G3", "C4", "C4", "C4", "D4", "E4", "E4"] }, { name: "Moo-dy Blues", melody: ["C3", "E3", "G3", "A3", "G3", "E3", "C3"] } ],
        Duck: [ { name: "Six Little Ducks", melody: ["C5", "C5", "C5", "A4", "A4", "G4", "G4"] }, { name: "Quacky Blues", melody: ["G4", "A4", "G4", "F4", "E4", "D4", "C4"] } ],
        Lion: [ { name: "The Lion Sleeps Tonight", melody: ["C4", "E4", "G4", "E4", "C4", "G4", "E4"] }, { name: "Roar of the King", melody: ["G2", "G2", "A2", "A2", "G2", "F2", "F2"] } ],
        Monkey: [ { name: "Monkey See, Monkey Do", melody: ["C5", "G4", "C5", "G4", "A4", "G4", "F4"] }, { name: "Jungle Jive", melody: ["G4", "C5", "E5", "G4", "C5", "E5", "G4"] } ],
    };

    useEffect(() => {
        const checkSupport = () => setAudioSupported('speechSynthesis' in window && window.speechSynthesis.getVoices().length > 0);
        checkSupport();
        window.speechSynthesis.onvoiceschanged = checkSupport;
        const toneScript = document.createElement('script');
        toneScript.src = "https://unpkg.com/tone";
        document.body.appendChild(toneScript);
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            if (window.Tone) window.Tone.Transport.stop().dispose();
        };
    }, []);

    const generateSSMLTranslation = (animal) => {
        const translations = {
            'Dog': ['<speak><prosody rate="fast" pitch="high">Ball! Ball! <emphasis level="strong">BALL!</emphasis></prosody> <break time="0.5s"/> Did someone say walkies?!</speak>', '<speak>I buried your sock <prosody rate="slow" pitch="low">somewhere safe</prosody> <break time="1s"/> <prosody rate="fast">but I forgot where!</prosody></speak>', '<speak><emphasis level="strong">Best day ever!</emphasis> <prosody pitch="high">You\'re home, you\'re home, you\'re HOME!</prosody></speak>', '<speak><prosody rate="fast">Squirrel alert! Squirrel alert!</prosody> <break time="0.5s"/> <prosody pitch="high">This is not a drill!</prosody></speak>', '<speak>I love you <prosody pitch="high" rate="fast">so so so much</prosody> <break time="0.5s"/> <emphasis level="strong">forever and ever!</emphasis></speak>'],
            'Cat': ['<speak><prosody rate="slow" pitch="low">Your service</prosody> <break time="0.5s"/> <emphasis level="strong">is inadequate.</emphasis> More treats, peasant.</speak>', '<speak>I knocked your pen off the desk <break time="1s"/> <prosody pitch="high">for science!</prosody></speak>', '<speak><prosody rate="fast">Feed me, pet me, worship me</prosody> <break time="0.5s"/> <prosody rate="slow">in that exact order.</prosody></speak>', '<speak><prosody pitch="low">I am</prosody> <break time="1s"/> <prosody pitch="high" rate="fast">the ruler of this house!</prosody></speak>', '<speak>That red dot disappeared and I <emphasis level="strong">demand answers</emphasis> <prosody pitch="high">immediately!</prosody></speak>'],
            'Cow': ['<speak><prosody rate="slow" pitch="low">Why do we stand in fields</prosody> <break time="1s"/> <prosody pitch="high">when we could sit in cafés?</prosody></speak>', '<speak>This grass tastes like <emphasis level="moderate">rainbow sprinkles</emphasis> and <prosody pitch="high">happiness!</prosody></speak>', '<speak><prosody rate="slow">Moooo means</prosody> <break time="0.5s"/> <prosody rate="fast" pitch="high">I love you in cow language!</prosody></speak>'],
            'Duck': ['<speak><prosody rate="fast" pitch="high">Got any bread?</prosody> <break time="0.5s"/> I\'ll trade you my <emphasis level="strong">finest duck jokes!</emphasis></speak>', '<speak>This pond is <prosody pitch="high">my swimming pool</prosody> <break time="0.5s"/> <prosody rate="fast">and I\'m doing the backstroke!</prosody></speak>'],
            'Lion': ['<speak><prosody pitch="low" rate="slow">ROAR means</prosody> <break time="1s"/> <prosody pitch="high">I\'m brave but also love cuddles!</prosody></speak>', '<speak>My mane is <emphasis level="strong">my crown</emphasis> <break time="0.5s"/> <prosody pitch="high">and I\'m the jungle king!</prosody></speak>'],
            'Monkey': ['<speak><prosody rate="fast" pitch="high">Ooh ooh ah ah means</prosody> <break time="0.5s"/> <emphasis level="strong">let\'s swing from tree to tree!</emphasis></speak>', '<speak>I love bananas <prosody pitch="high">more than kids love ice cream!</prosody></speak>']
        };
        const animalTranslations = translations[animal] || ['<speak>I am speaking the magical language of animals!</speak>'];
        return animalTranslations[Math.floor(Math.random() * animalTranslations.length)];
    };

    const ssmlToText = (ssml) => ssml.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');

    const playTranslation = () => {
        if (!audioSupported || !ssmlOutput) return;
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }
        const utterance = new SpeechSynthesisUtterance(ssmlToText(ssmlOutput));
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };

    const startRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        setTranslation(null);
        timerRef.current = setInterval(() => setRecordingTime(prev => prev + 0.1), 100);
        setTimeout(() => {
            if (timerRef.current) stopRecording();
        }, Math.random() * 2000 + 3000);
    };

    const stopRecording = () => {
        if (!isRecording) return;
        setIsRecording(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (recordingTime >= 0.5) {
            const ssml = generateSSMLTranslation(selectedAnimal);
            setSsmlOutput(ssml);
            setTranslation({ message: ssmlToText(ssml) });
        } else {
            setRecordingTime(0);
        }
    };

    const handleQuizComplete = (result) => {
        setQuizResult(result);
        setShowQuiz(false);
    };

    const selectedAnimalData = animals.find(a => a.name === selectedAnimal);

    return (
        <>
            <style>{`
                @keyframes float { 
                    0% { transform: translateY(0px) rotate(0deg); } 
                    50% { transform: translateY(-20px) rotate(10deg); } 
                    100% { transform: translateY(0px) rotate(0deg); } 
                } 
                @keyframes fade-in { 
                    from { opacity: 0; transform: scale(0.9); } 
                    to { opacity: 1; transform: scale(1); } 
                } 
                .animate-float { animation: float 6s ease-in-out infinite; } 
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100 p-4 font-sans relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <Sparkles className="absolute top-[10%] left-[10%] text-5xl text-yellow-300 opacity-70 animate-float" style={{animationDelay: '0s'}} />
                    <Heart className="absolute top-[20%] left-[85%] text-4xl text-pink-400 opacity-70 animate-float" style={{animationDelay: '1s'}} />
                    <Star className="absolute top-[70%] left-[15%] text-6xl text-violet-400 opacity-70 animate-float" style={{animationDelay: '2s'}} />
                    <Sparkles className="absolute top-[80%] left-[90%] text-3xl text-yellow-300 opacity-70 animate-float" style={{animationDelay: '0.5s'}} />
                    <svg className="absolute top-[50%] left-[5%] w-16 h-16 text-blue-300 opacity-60 animate-float" style={{animationDelay: '1.5s'}} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M30 70 q 20 -40 40 0" /></svg>
                    <svg className="absolute top-[85%] left-[20%] w-20 h-20 text-green-300 opacity-60 animate-float" style={{animationDelay: '3s'}} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20,80 Q50,20 80,80" /></svg>
                    <svg className="absolute top-[15%] left-[40%] w-12 h-12 text-red-300 opacity-60 animate-float" style={{animationDelay: '2.5s'}} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 50 h 60" /><path d="M50 20 v 60" /></svg>
                </div>
                {showQuiz && <AnimalQuiz onComplete={handleQuizComplete} />}
                {showSmule && selectedAnimalData && <AnimalSmule animal={selectedAnimalData} songs={songs} onClose={() => setShowSmule(false)} />}
                {showDating && <AnimalDating animals={animals} onClose={() => setShowDating(false)} />}
                <div className="max-w-md mx-auto relative z-10">
                    <div className="text-center mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>TailTok!</h1>
                        <p className="text-purple-700 text-lg font-semibold">Talk to the animals... and have them watch you!</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
                            {!quizResult ? (
                                <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 text-center">
                                    <Sparkles className="mx-auto text-yellow-400 mb-2" size={32}/>
                                    <h2 className="text-xl font-bold text-purple-700 mb-3">Which Animal Are You?</h2>
                                    <button onClick={() => setShowQuiz(true)} className="px-5 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full hover:scale-110 active:scale-100 transition-transform duration-200 shadow-lg">Take the Quiz</button>
                                </div>
                            ) : (
                                <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 text-center animate-fade-in">
                                    <p className="text-md text-purple-800 font-semibold">Your spirit animal is the...</p>
                                    <div className="text-6xl my-1">{animals.find(a => a.name === quizResult)?.emoji}</div>
                                    <h2 className="text-2xl font-bold text-purple-700 mb-2">{quizResult}!</h2>
                                    <button onClick={() => setSelectedAnimal(quizResult)} className="px-4 py-1.5 text-sm bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 transition-colors flex items-center gap-1 mx-auto hover:scale-110 active:scale-100 transform duration-200">Set as my animal <ChevronsRight size={16}/></button>
                                </div>
                            )}
                            <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 text-center">
                                <Music className="mx-auto text-blue-400 mb-2" size={32}/>
                                <h2 className="text-xl font-bold text-blue-700 mb-3">Critter Concert</h2>
                                <button onClick={() => setShowSmule(true)} className="px-5 py-2 bg-gradient-to-r from-blue-400 to-teal-500 text-white font-bold rounded-full hover:scale-110 active:scale-100 transition-transform duration-200 shadow-lg">Visit the Stage</button>
                            </div>
                        </div>
                        
                        <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                            <Heart className="mx-auto text-red-400 mb-2" size={32}/>
                            <h2 className="text-xl font-bold text-red-700 mb-3">Critter Cupid</h2>
                            <button onClick={() => setShowDating(true)} className="px-5 py-2 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold rounded-full hover:scale-110 active:scale-100 transition-transform duration-200 shadow-lg">Meet the Singles</button>
                        </div>

                        <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
                            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Choose Your Animal</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {animals.map((animal) => (
                                    <button key={animal.name} onClick={() => setSelectedAnimal(animal.name)}
                                        className={`p-4 rounded-2xl border-4 transition-all duration-300 transform hover:scale-110 active:scale-105 ${
                                            selectedAnimal === animal.name ? 'border-purple-400 bg-purple-100 shadow-inner' : 'border-transparent bg-white/70'
                                        }`}>
                                        <div className="text-5xl mb-2">{animal.emoji}</div>
                                        <div className="text-sm font-bold text-gray-700">{animal.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-8 text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
                            <div className="h-32 flex items-center justify-center mb-4">
                                {selectedAnimal === 'Dog' ? <AnimatedDogFace /> : <div className="text-7xl animate-bounce">{selectedAnimalData?.emoji}</div>}
                            </div>
                            <h2 className="text-2xl font-bold text-orange-700 mb-6">Ready to Translate?</h2>
                            {isRecording && <div className="text-red-500 font-bold text-xl mb-3 animate-pulse">Listening... {recordingTime.toFixed(1)}s</div>}
                            <button onClick={isRecording ? stopRecording : startRecording}
                                className={`px-10 py-5 rounded-full text-white font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-xl transform hover:scale-110 active:scale-100 mx-auto ${
                                    isRecording ? 'bg-red-500' : 'bg-green-500'
                                }`}>
                                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                                {isRecording ? 'Stop' : 'Start'}
                            </button>
                        </div>

                        {translation && (
                            <div className="bg-white/60 backdrop-blur-md border-2 border-white/50 rounded-3xl shadow-lg p-6 animate-fade-in">
                                <div className="text-center mb-4">
                                    <h3 className="text-2xl font-bold text-orange-800">Your {selectedAnimal} friend says:</h3>
                                </div>
                                <div className="bg-white rounded-2xl p-6 border-2 border-orange-300">
                                    <p className="text-gray-800 text-xl font-semibold text-center italic mb-4">"{translation.message}"</p>
                                    {audioSupported && (
                                        <div className="text-center">
                                            <button onClick={playTranslation}
                                                className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 flex items-center gap-2 mx-auto transform hover:scale-110 active:scale-100 ${
                                                    isPlaying ? 'bg-red-500' : 'bg-green-500'
                                                }`}>
                                                {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />} Hear It!
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnimalTalkr;