"use client";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {hovered && (
        <div className="bg-white rounded-2xl shadow-2xl px-4 py-3 border border-gray-100 animate-fade-up">
          <p className="font-body text-sm text-charcoal font-medium">Chat with us!</p>
          <p className="font-body text-xs text-gray-500 mt-0.5">We reply within minutes</p>
        </div>
      )}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20know%20more%20about%20YogAyur%20Bliss%20wellness%20programs"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 2C8.373 2 3 7.373 3 14C3 16.385 3.69 18.613 4.887 20.488L3 28L10.711 26.148C12.514 27.163 14.589 27.75 16.794 27.75C23.421 27.75 28.794 22.377 28.794 15.75C28.794 9.123 23.627 2 15 2Z"
            fill="white"
          />
          <path
            d="M21.024 18.021C20.725 18.879 19.478 19.591 18.508 19.806C17.845 19.948 16.987 20.061 14.228 18.966C10.707 17.571 8.444 14.002 8.274 13.774C8.11 13.547 6.94 11.996 6.94 10.39C6.94 8.784 7.765 8.003 8.092 7.668C8.363 7.391 8.804 7.264 9.226 7.264C9.362 7.264 9.484 7.271 9.593 7.278C9.921 7.292 10.086 7.313 10.3 7.853C10.565 8.521 11.193 10.127 11.272 10.297C11.351 10.467 11.43 10.694 11.317 10.921C11.21 11.155 11.117 11.26 10.947 11.451C10.776 11.643 10.614 11.791 10.443 12.003C10.287 12.188 10.112 12.387 10.308 12.714C10.504 13.034 11.186 14.113 12.168 14.991C13.437 16.12 14.479 16.484 14.843 16.641C15.121 16.762 15.456 16.733 15.659 16.517C15.918 16.239 16.234 15.779 16.556 15.326C16.786 15.001 17.071 14.958 17.37 15.079C17.676 15.193 19.275 15.982 19.603 16.151C19.93 16.321 20.145 16.4 20.224 16.535C20.302 16.669 20.302 17.29 20.024 18.021H21.024Z"
            fill="#25D366"
          />
        </svg>
        {/* Pulse ring */}
        <span className="absolute w-full h-full rounded-full bg-green-400 animate-pulse-ring" />
      </a>
    </div>
  );
}
