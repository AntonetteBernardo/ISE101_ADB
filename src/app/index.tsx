import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import {
  formatStudentName,
  getUnreadAnnouncements,
  loadAnnouncements,
  sumNumbers,
} from '@/services/announcementUtils';
import type { Announcement, ApiAnnouncement, StudentProfile } from '@/types/announcement';

const appName: string = 'Campus Connect';

const sampleAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Enrollment reminders', category: 'Academic', read: false },
  { id: 'a2', title: 'Campus orientation', category: 'Events', read: true },
  { id: 'a3', title: 'Library schedule', category: 'Notice', read: false },
];

const student: StudentProfile = {
  id: 's1',
  fullName: formatStudentName('Mathew', 'David'),
  course: 'Mobile Programming',
};

export default function HomeScreen() {
  const [apiAnnouncements, setApiAnnouncements] = useState<ApiAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const unread = getUnreadAnnouncements(sampleAnnouncements);
  let sampleTotal: number = sumNumbers([1, 2, 3]);
  sampleTotal += 1;

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const items = await loadAnnouncements();
        setApiAnnouncements(items);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load announcements');
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{appName}</Text>
      <Text style={styles.subtitle}>Welcome,</Text>
      <Text style={styles.description}>One campus. Connected students.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <Text style={styles.count}>Unread: {unread.length}</Text>
        {sampleAnnouncements.map((item) => (
          <Text key={item.id} style={styles.listItem}>• {item.title}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Week 2 demo</Text>
        <Text style={styles.description}>Number array sum: {sampleTotal}</Text>
      </View>

      <View style={styles.card}>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F4F7FB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1E3A5F',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  count: {
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 8,
  },
  listItem: {
    color: '#374151',
    lineHeight: 24,
  },
  error: {
    color: '#B91C1C',
  },
});
