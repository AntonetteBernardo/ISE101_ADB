import type {
  Announcement,
  ApiAnnouncement,
} from '@/types/announcement';

export function formatStudentName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getUnreadAnnouncements(items: Announcement[]): Announcement[] {
  return items.filter((item) => !item.read);
}

export function getAnnouncementTitles(items: Announcement[]): string[] {
  return items.map((item) => item.title);
}

export function sumNumbers(numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

export async function loadAnnouncements(): Promise<ApiAnnouncement[]> {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    );

    if (!response.ok) {
      throw new Error(`Announcement request failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Announcement response was not a list');
    }

    return data
      .filter((item): item is ApiAnnouncement => {
        return (
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          'title' in item &&
          (typeof item.id === 'number' || typeof item.id === 'string') &&
          typeof item.title === 'string'
        );
      })
      .map((item) => ({
        id: String(item.id),
        title: item.title,
      }));
  } catch (error) {
    console.error('Unable to load announcements:', error);
    throw error;
  }
}
