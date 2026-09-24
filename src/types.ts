export interface CouplePerson {
  name: string;
  roleTitle: string;
  fatherName: string;
  motherName: string;
  hometown: string;
  bio: string;
  avatar: string;
}

export interface VenueInfo {
  title: string;
  subtitle: string;
  time: string;
  date: string;
  venueName: string;
  address: string;
  mapQuery: string;
  googleMapUrl: string;
}

export interface LoveMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  tag: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  colSpan?: number;
}

export interface BankAccountInfo {
  owner: string;
  bankName: string;
  accountNumber: string;
  branch: string;
  qrUrl?: string;
}

export interface WeddingData {
  groom: CouplePerson;
  bride: CouplePerson;
  weddingDate: string; // ISO format e.g. "2026-11-28T11:00:00"
  tagline: string;
  quote: string;
  quoteAuthor: string;
  heroImage: string;
  venueCeremony: VenueInfo;
  venueReception: VenueInfo;
  loveMilestones: LoveMilestone[];
  schedule: ScheduleItem[];
  gallery: GalleryImage[];
  groomBank: BankAccountInfo;
  brideBank: BankAccountInfo;
}

export interface GuestRsvp {
  id: string;
  guestName: string;
  phone: string;
  side: 'groom' | 'bride' | 'both';
  status: 'attending' | 'not_attending';
  guestsCount: number;
  diet?: string;
  message?: string;
  createdAt: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  likes: number;
  createdAt: string;
  avatarBg: string;
}
