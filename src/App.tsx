/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_WEDDING_DATA, INITIAL_WISHES } from './data/defaultData';
import { WeddingData, GuestWish, GuestRsvp } from './types';
import { Navigation } from './components/Navigation';
import { EnvelopeModal } from './components/EnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { ScheduleSection } from './components/ScheduleSection';
import { VenuesSection } from './components/VenuesSection';
import { GallerySection } from './components/GallerySection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { PetalCanvas } from './components/PetalCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { MobileBottomDock } from './components/MobileBottomDock';
import { PhotoCustomizerModal } from './components/PhotoCustomizerModal';

export default function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      // Clear legacy cache to guarantee new updates and official wedding photos display immediately
      localStorage.removeItem('wedding_custom_data');
      localStorage.removeItem('wedding_custom_data_v3');
      localStorage.removeItem('wedding_custom_data_v4');
      const saved = localStorage.getItem('wedding_custom_data_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.groom?.name && parsed.heroImage) {
          return {
            ...parsed,
            groomBank: INITIAL_WEDDING_DATA.groomBank,
            brideBank: INITIAL_WEDDING_DATA.brideBank,
            venueCeremony: INITIAL_WEDDING_DATA.venueCeremony,
            venueReception: INITIAL_WEDDING_DATA.venueReception,
            groom: { ...parsed.groom, fatherName: '', motherName: '' },
            bride: { ...parsed.bride, fatherName: '', motherName: '' },
          };
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_WEDDING_DATA;
  });

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [guestName, setGuestName] = useState<string>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam) return decodeURIComponent(toParam);
      const saved = localStorage.getItem('wedding_guest_name');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return '';
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Photo Customizer Modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalTab, setPhotoModalTab] = useState<'hero' | 'groom' | 'bride' | 'gallery'>('hero');

  const handleOpenPhotoModal = (tab: 'hero' | 'groom' | 'bride' | 'gallery' = 'hero') => {
    setPhotoModalTab(tab);
    setIsPhotoModalOpen(true);
  };

  const handleUpdateWeddingData = (updated: WeddingData) => {
    setWeddingData(updated);
    try {
      localStorage.setItem('wedding_custom_data_v5', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  // Guest RSVP submission
  const handleAddRsvp = (rsvpData: Omit<GuestRsvp, 'id' | 'createdAt'>) => {
    const newRsvp: GuestRsvp = {
      ...rsvpData,
      id: `rsvp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem('wedding_rsvps');
      const currentList: GuestRsvp[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem('wedding_rsvps', JSON.stringify([newRsvp, ...currentList]));
    } catch {
      // ignore
    }

    // Automatically add congratulatory wish to guestbook
    if (rsvpData.message && rsvpData.message.trim()) {
      handleAddWish({
        name: rsvpData.guestName,
        relationship: rsvpData.side === 'groom' ? 'Khách Nhà Trai' : rsvpData.side === 'bride' ? 'Khách Nhà Gái' : 'Khách chung',
        message: rsvpData.message,
      });
    }
  };

  // Add guest wish
  const handleAddWish = (wishData: Omit<GuestWish, 'id' | 'likes' | 'createdAt' | 'avatarBg'>) => {
    const bgColors = ['#9B2C2C', '#2563EB', '#D97706', '#059669', '#7C3AED', '#DB2777'];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const newWish: GuestWish = {
      ...wishData,
      id: `wish_${Date.now()}`,
      likes: 1,
      createdAt: 'Vừa xong',
      avatarBg: randomBg,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Like a wish
  const handleLikeWish = (wishId: string) => {
    const updated = wishes.map((w) =>
      w.id === wishId ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const scrollToRsvp = () => {
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGuestbook = () => {
    const guestbookElement = document.getElementById('so-luu-but');
    if (guestbookElement) {
      guestbookElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EAE1] text-[#2C2724] relative selection:bg-[#E8DFC8]">
      
      {/* Falling Sakura Petals Subtle Background */}
      <PetalCanvas enabled={true} />

      {/* Wax-Sealed Envelope Modal (Accessible anytime) */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onClose={() => setIsEnvelopeOpen(false)}
        guestName={guestName}
        weddingData={weddingData}
        onOpenLetter={() => setAutoPlayMusic(true)}
      />

      {/* Photo Customizer Modal */}
      <PhotoCustomizerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        weddingData={weddingData}
        onUpdateWeddingData={handleUpdateWeddingData}
        initialActiveTab={photoModalTab}
      />

      {/* Floating Music Disc on top right */}
      <div className="fixed top-20 right-4 z-40">
        <MusicPlayer autoPlayTrigger={autoPlayMusic} />
      </div>

      {/* Mobile-First Container (Max-w-md on desktop with elegant shadow, full width on phones) */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#FAF7F2] shadow-2xl relative border-x border-[#E8DFC8]/50 flex flex-col">
        
        {/* Navigation Bar */}
        <Navigation
          weddingData={weddingData}
          onOpenEnvelope={() => setIsEnvelopeOpen(true)}
          onScrollToRsvp={scrollToRsvp}
          onOpenPhotoModal={() => handleOpenPhotoModal('hero')}
        />

        {/* Main Content */}
        <main className="flex-1 pb-16">
          {/* Hero Banner with Couple Photo & Countdown */}
          <HeroSection
            weddingData={weddingData}
            guestName={guestName}
            onScrollToRsvp={scrollToRsvp}
            onOpenEnvelope={() => setIsEnvelopeOpen(true)}
            onOpenPhotoModal={handleOpenPhotoModal}
          />

          {/* Bride & Groom Couple Section */}
          <CoupleSection
            weddingData={weddingData}
            onOpenPhotoModal={handleOpenPhotoModal}
          />

          {/* Wedding Day Schedule (10:00, 11:00, 11:30) */}
          <ScheduleSection schedule={weddingData.schedule} />

          {/* Time & Venue: Xóm Đậu 8b, Minh Đức, Phổ Yên, Thái Nguyên */}
          <VenuesSection
            venueCeremony={weddingData.venueCeremony}
            venueReception={weddingData.venueReception}
          />

          {/* Luxury Photo Album */}
          <GallerySection
            gallery={weddingData.gallery}
            onOpenPhotoModal={handleOpenPhotoModal}
          />

          {/* Gift Box (VietQR Bank accounts) */}
          <GiftBoxSection
            groomBank={weddingData.groomBank}
            brideBank={weddingData.brideBank}
          />

          {/* RSVP Confirmation */}
          <RsvpSection
            onAddRsvp={handleAddRsvp}
            guestNameInitial={guestName}
          />

          {/* Guest Wishes Guestbook */}
          <GuestbookSection
            wishes={wishes}
            onAddWish={handleAddWish}
            onLikeWish={handleLikeWish}
          />
        </main>

        {/* Footer */}
        <Footer weddingData={weddingData} />

        {/* Mobile Sticky Bottom Quick Action Dock */}
        <MobileBottomDock
          onScrollToRsvp={scrollToRsvp}
          onScrollToGuestbook={scrollToGuestbook}
          onOpenEnvelope={() => setIsEnvelopeOpen(true)}
          googleMapUrl={weddingData.venueReception.googleMapUrl}
        />
      </div>
    </div>
  );
}
