import { LandingContent } from '../components/landing/LandingMobileView';

type LandingEventLike = {
  title?: string | null;
  event_type?: string | null;
  date?: string | null;
  city?: string | null;
  venue_name?: string | null;
  venue_city?: string | null;
};

type LandingPageLike = {
  published?: boolean | null;
  content_json?: string | null;
  title?: string | null;
  date?: string | null;
  location?: string | null;
  cover_image?: string | null;
  message?: string | null;
  dress_code?: string | null;
};

const DEFAULT_SCHEDULE = [
  { time: '18:00', activity: 'Cocteil de bun venit' },
  { time: '19:00', activity: 'Ceremonia' },
  { time: '20:00', activity: 'Cina festiva' },
  { time: '22:00', activity: 'Petrecere' },
];

export const buildDefaultLandingContent = (event: LandingEventLike | null): LandingContent => ({
  published: false,
  coverImage: '',
  galleryImages: [],
  title: event?.event_type || event?.title || 'Evenimentul nostru',
  subtitle: 'Va invitam sa sarbatorim impreuna',
  date: event?.date || '',
  time: '18:00',
  location: event?.venue_name || event?.venue_city || event?.city || '',
  locationAddress: '',
  heroMessage: 'Cu drag va asteptam sa fiti alaturi de noi in aceasta zi speciala!',
  dateDescription: 'Pastrati data in calendar si pregatiti-va pentru o seara memorabila alaturi de noi.',
  detailsDescription: 'Vom reveni cu toate detaliile importante pentru ca voi sa va bucurati de eveniment fara griji.',
  dressCode: 'Tinuta eleganta',
  schedule: DEFAULT_SCHEDULE,
  timingIcons: [],
  colorPrimary: '#960010',
  colorSecondary: '#ec4899',
});

export const normalizeLandingContent = (
  value: Partial<LandingContent> | null | undefined,
  event: LandingEventLike | null
): LandingContent => {
  const defaults = buildDefaultLandingContent(event);
  const legacyMessage = (value as Partial<LandingContent> & { message?: string } | null | undefined)?.message;

  return {
    ...defaults,
    ...value,
    heroMessage: value?.heroMessage ?? legacyMessage ?? defaults.heroMessage,
    dateDescription: value?.dateDescription ?? legacyMessage ?? defaults.dateDescription,
    detailsDescription: value?.detailsDescription ?? legacyMessage ?? defaults.detailsDescription,
    published: Boolean(value?.published),
    galleryImages: Array.isArray(value?.galleryImages) ? value.galleryImages : defaults.galleryImages,
    schedule: Array.isArray(value?.schedule) ? value.schedule : defaults.schedule,
    timingIcons: Array.isArray(value?.timingIcons) ? value.timingIcons : defaults.timingIcons,
  };
};

export const parseLandingContentJson = (
  contentJson: string | null | undefined,
  event: LandingEventLike | null
): LandingContent | null => {
  if (!contentJson) {
    return null;
  }

  try {
    return normalizeLandingContent(JSON.parse(contentJson), event);
  } catch (error) {
    console.error('Failed to parse landing content from backend:', error);
    return null;
  }
};

export const buildLandingContentFromApi = (
  landingPage: LandingPageLike,
  event: LandingEventLike | null
): LandingContent => {
  return (
    parseLandingContentJson(landingPage.content_json, event) ||
    normalizeLandingContent(
      {
        published: Boolean(landingPage.published),
        title: landingPage.title || undefined,
        date: landingPage.date || undefined,
        location: landingPage.location || undefined,
        coverImage: landingPage.cover_image || undefined,
        heroMessage: landingPage.message || undefined,
        dateDescription: landingPage.message || undefined,
        detailsDescription: landingPage.message || undefined,
        dressCode: landingPage.dress_code || undefined,
      },
      event
    )
  );
};
