"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Send, Gift, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Types
interface Mood {
  emoji: string
  label: string
}

interface DoodleProps {
  className?: string
  style?: React.CSSProperties
}

export default function GrievancePortal() {
  // State management
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [grievanceText, setGrievanceText] = useState("")
  const [grievanceCount, setGrievanceCount] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Constants
  const MOODS: Mood[] = [
    { emoji: "😡", label: "Angry" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😊", label: "Happy" },
    { emoji: "❤️", label: "Love" },
  ]

  const SURPRISE_MESSAGES = [
    "Meri Jaaaan You are the only one who keep me motivated! 💖",
    "Kl raat mene apko khuwab me dekha😗",
    "Teri soorat se hai aalam me baharon ko sabat 🌻",
    "My Pretty Little Baby❤",
    "Adan meri jaan i dk how do you feel about me but my eyes, these eyes, they are always looking for you! 👀",
    "Jeeee janna i am sorry na if i have dome something wrong, i am just a human being and i make mistakes, but i will always try to be better for you! 💕",
    "You're my favorite notification! ",
    "Apka Number mil jaye ga Gul e Rana! ",
    "I love the way you make me feel, like I'm floating on a cloud of happiness! ",
    "Apka apna haider😘",
  ]

  const API_ENDPOINT = "https://grev-fastapi-render.onrender.com/grievance"
  const ANIMATION_DURATION = 200
  const TOTAL_DOODLES = 40
  const TOTAL_SCRIBBLES = 15

  // Effects
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Event handlers
  const handleSubmit = useCallback(async () => {
    if (!grievanceText.trim() || !selectedMood) return

    setIsSending(true)

    try {
      const moodLabel = MOODS.find(mood => mood.emoji === selectedMood)?.label.toLowerCase() || 'neutral'
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: grievanceText,
          mood: moodLabel
        })
      })

      if (response.ok) {
        setGrievanceCount(prev => prev + 1)
        setGrievanceText("")
        setSelectedMood(null)
      }
    } catch (error) {
      console.error('Error submitting grievance:', error)
    } finally {
      setTimeout(() => setIsSending(false), ANIMATION_DURATION)
    }
  }, [grievanceText, selectedMood])

  const handleMysteryButton = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SURPRISE_MESSAGES.length)
    setDialogMessage(SURPRISE_MESSAGES[randomIndex])
    setShowDialog(true)
  }, [])

  const closeDialog = useCallback(() => {
    setShowDialog(false)
  }, [])

  // Doodle Components
  const DoodleHeart: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 35C20 35 33 26 33 16C33 10 29 7 24 7C21 7 20 9 20 9C20 9 19 7 16 7C11 7 7 10 7 16C7 26 20 35 20 35Z"
        stroke="#FF6B95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(255, 107, 149, 0.1)"
      />
    </svg>
  )

  const DoodleStar: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 3L18 9L25 10L20 15L21 22L15 19L9 22L10 15L5 10L12 9L15 3Z"
        stroke="#7EB2DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(126, 178, 221, 0.1)"
      />
    </svg>
  )

  const DoodleFlower: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 10C19.5 7 22.5 6 24.5 8C26.5 10 25.5 13 22.5 15C25.5 17 26.5 20 24.5 22C22.5 24 19.5 23 17.5 20C15.5 23 12.5 24 10.5 22C8.5 20 9.5 17 12.5 15C9.5 13 8.5 10 10.5 8C12.5 6 15.5 7 17.5 10Z"
        stroke="#E783B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(231, 131, 185, 0.1)"
      />
      <circle cx="17.5" cy="15" r="2" fill="#E783B9" />
      <path d="M17.5 17V25" stroke="#7EB2DD" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  const DoodleCloud: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="45"
      height="30"
      viewBox="0 0 45 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20C6 20 3 17 3 13C3 9 6 6 10 6C10 4 12 1 16 1C20 1 22 4 22 6C22 4 24 3 26 3C28 3 30 4 30 6C34 6 37 9 37 13C37 17 34 20 30 20C28 24 24 26 20 26C16 26 12 24 10 20Z"
        stroke="#A5C7E9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(165, 199, 233, 0.1)"
      />
    </svg>
  )

  const DoodleSparkle: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5 2V23M2 12.5H23M5 5L20 20M20 5L5 20" stroke="#FFD1DC" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  const DoodleSunflower: React.FC<DoodleProps> = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="6" fill="#FFD700" stroke="#E8A317" strokeWidth="1.5" />
      <path
        d="M20 8V2M26 10L30 5M30 20H36M26 30L30 35M20 32V38M14 30L10 35M10 20H4M14 10L10 5"
        stroke="#E8A317"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M23 14L27 10M27 30L23 26M17 26L13 30M13 10L17 14"
        stroke="#E8A317"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )

  // Generate random doodles
  const generateDoodles = useCallback(() => {
    const doodles = []
    const doodleComponents = [DoodleHeart, DoodleStar, DoodleFlower, DoodleCloud, DoodleSparkle, DoodleSunflower]

    // Floating doodles
    for (let i = 0; i < TOTAL_DOODLES; i++) {
      const DoodleComponent = doodleComponents[Math.floor(Math.random() * doodleComponents.length)]
      doodles.push(
        <DoodleComponent
          key={`doodle-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${0.5 + Math.random() * 1}) rotate(${Math.random() * 360}deg)`,
            opacity: 0.4 + Math.random() * 0.4,
            animation: `floatDoodle ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />,
      )
    }

    // Scribble lines
    for (let i = 0; i < TOTAL_SCRIBBLES; i++) {
      const lineLength = 50 + Math.random() * 100
      const curvature = 20 + Math.random() * 30
      const startX = Math.random() * 100
      const startY = Math.random() * 100

      doodles.push(
        <svg
          key={`scribble-${i}`}
          className="absolute pointer-events-none"
          width={lineLength}
          height={curvature * 2}
          viewBox={`0 0 ${lineLength} ${curvature * 2}`}
          style={{
            top: `${startY}%`,
            left: `${startX}%`,
            opacity: 0.2 + Math.random() * 0.2,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          <path
            d={`M0,${curvature} C${lineLength * 0.3},${curvature - curvature * 0.8} ${lineLength * 0.7},${
              curvature + curvature * 0.8
            } ${lineLength},${curvature}`}
            stroke={`rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${
              200 + Math.random() * 55
            }, 0.4)`}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={Math.random() > 0.7 ? "4 2" : ""}
          />
        </svg>,
      )
    }

    return doodles
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF9FA] flex flex-col items-center justify-center p-4 relative overflow-hidden font-doodle">
      {/* Sky blue corners */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-sky-200 rounded-br-[100px] opacity-60 z-0" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-sky-200 rounded-bl-[100px] opacity-60 z-0" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-200 rounded-tr-[100px] opacity-60 z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-200 rounded-tl-[100px] opacity-60 z-0" />

      {/* Notebook paper background */}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 z-0" />

      {/* Background doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {generateDoodles()}
      </div>

      {/* Main content */}
      <div
        className={cn(
          "w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 relative transition-all duration-1000 overflow-visible z-10",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
        style={{
          boxShadow: "0 10px 30px rgba(255, 182, 193, 0.2), 0 4px 10px rgba(173, 216, 230, 0.15)",
          border: "2px dashed #FFB6C1",
        }}
      >
        {/* Header */}
        <header className="text-center mb-6 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <DoodleSparkle />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-500 font-doodle">
            Grievance Portal for My Sunflower 🌻
          </h1>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-3">
            <svg width="100%" height="100%" viewBox="0 0 100 10">
              <path 
                d="M0,5 C25,0 75,10 100,5" 
                stroke="#FFB6C1" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
        </header>

        {/* Mood selector */}
        <section className="mb-6">
          <div className="flex justify-between bg-pink-50 p-3 rounded-2xl relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-pink-200" />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pink-200" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-pink-200" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-pink-200" />

            {MOODS.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => setSelectedMood(mood.emoji)}
                className={cn(
                  "text-2xl md:text-3xl p-2 rounded-full transition-all duration-300",
                  selectedMood === mood.emoji
                    ? "bg-pink-200 transform scale-125 shadow-md"
                    : "hover:bg-blue-100 hover:scale-110"
                )}
                aria-label={`Select mood: ${mood.label}`}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </section>

        {/* Textarea with doodle border */}
        <section className="relative mb-6">
          <div className="absolute -top-3 left-5">
            <DoodleHeart />
          </div>
          <div className="absolute -top-3 right-5">
            <DoodleStar />
          </div>
          <Textarea
            value={grievanceText}
            onChange={(e) => setGrievanceText(e.target.value)}
            placeholder="Hukm kren meri jaan💗"
            className="min-h-[150px] text-lg rounded-2xl bg-pink-50 bg-opacity-70 shadow-inner font-doodle"
            style={{ border: "2px dashed #FFB6C1" }}
          />
          <div className="absolute -bottom-3 left-5">
            <DoodleFlower />
          </div>
          <div className="absolute -bottom-3 right-5">
            <DoodleCloud />
          </div>
        </section>

        {/* Counter */}
        <section className="text-center mb-6 relative">
          <div className="py-2 px-6 inline-block relative">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 40">
              <path
                d="M20,5 Q40,0 100,5 Q160,10 180,5 Q190,20 180,35 Q140,40 100,35 Q60,40 20,35 Q10,20 20,5"
                fill="rgba(255, 182, 193, 0.2)"
                stroke="#FFB6C1"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            </svg>
            <span className="relative z-10 text-gray-700 font-medium font-doodle">
              Total grievances filed: {grievanceCount} 💀
            </span>
          </div>
        </section>

        {/* Action buttons */}
        <section className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!grievanceText.trim() || !selectedMood || isSending}
            className={cn(
              "flex-1 rounded-xl py-6 text-lg font-doodle relative transition-all duration-200",
              isSending 
                ? "bg-white text-pink-400 border-pink-400" 
                : "bg-pink-400 hover:bg-pink-500 text-white"
            )}
            style={{ border: "2px solid #FF8FAB" }}
          >
            <div className="absolute inset-0 bg-[url('/button-scribble.png')] opacity-10 mix-blend-overlay rounded-xl" />
            <Send className="mr-2 h-5 w-5" /> 
            {isSending ? "Sending..." : "Send"}
          </Button>

          <Button
            onClick={handleMysteryButton}
            variant="outline"
            className="flex-1 bg-blue-50 border-blue-300 text-blue-500 hover:bg-blue-100 rounded-xl py-6 text-lg font-doodle relative"
            style={{ border: "2px dashed #A5C7E9" }}
          >
            <div className="absolute inset-0 bg-[url('/button-scribble.png')] opacity-10 mix-blend-overlay rounded-xl" />
            <Gift className="mr-2 h-5 w-5" /> Mystery Button 🎁
          </Button>
        </section>
      </div>

      {/* Modal Dialog */}
      {showDialog && (
        <>
          <div
            className="fixed inset-0 bg-pink-50 bg-opacity-70 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={closeDialog}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div
              className="bg-white rounded-2xl p-6 max-w-md w-[90%] mx-auto pointer-events-auto relative overflow-visible"
              style={{
                border: "3px dashed #FFB6C1",
                boxShadow: "0 10px 25px rgba(255, 182, 193, 0.3)",
                animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              <button
                onClick={closeDialog}
                className="absolute -top-3 -right-3 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-300 text-pink-500 hover:bg-pink-200 transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>

              <div className="absolute -top-4 -left-4">
                <DoodleHeart />
              </div>
              <div className="absolute -top-4 -right-4 mr-6">
                <DoodleStar />
              </div>
              <div className="absolute -bottom-4 -left-4">
                <DoodleFlower />
              </div>
              <div className="absolute -bottom-4 -right-4">
                <DoodleCloud />
              </div>

              <div className="text-center text-pink-600 text-xl flex items-center justify-center gap-2 font-doodle mb-4">
                <Sparkles className="h-5 w-5 text-pink-500" />
                Surprise Message! 💝
                <Sparkles className="h-5 w-5 text-pink-500" />
              </div>

              <div
                className="text-center text-lg py-6 px-4 text-gray-700 bg-pink-50 rounded-xl font-doodle"
                style={{ border: "2px dashed #FFB6C1" }}
              >
                {dialogMessage}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes floatDoodle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, -15px) rotate(5deg);
          }
        }
        
        @keyframes handwriting {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        
        button:hover {
          animation: wiggle 0.5s ease-in-out;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes popIn {
          0% { 
            opacity: 0; 
            transform: scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      {/* Made with love footer */}
<footer className="mt-8 text-center relative z-10">
  <div className="text-sm text-pink-400 font-doodle bg-white bg-opacity-60 backdrop-blur-sm rounded-full px-6 py-2 inline-block shadow-sm border border-pink-150">
    Made with 💗 By Haider!
  </div>
</footer>
    </div>
  )
}