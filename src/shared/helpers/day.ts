export function parseDayIndexToString(dayIndex: number): string {
  const daysString = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return daysString[dayIndex];
}
