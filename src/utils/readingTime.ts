/**
 * Calculate estimated reading time for content
 * @param content - The raw text/markdown content
 * @param lang - Language code ('en' or 'zh')
 * @returns Reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string, lang: 'en' | 'zh' = 'en'): number {
  // Remove markdown syntax for more accurate count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
    .replace(/[#*_~>\-|]/g, '') // Remove markdown symbols
    .trim();

  if (lang === 'zh') {
    // Chinese: count characters, ~400 chars per minute
    const charCount = plainText.replace(/\s/g, '').length;
    return Math.max(1, Math.ceil(charCount / 400));
  } else {
    // English: count words, ~200 words per minute
    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }
}

/**
 * Format reading time with localized label
 */
export function formatReadingTime(minutes: number, lang: 'en' | 'zh' = 'en'): string {
  if (lang === 'zh') {
    return `${minutes} 分钟阅读`;
  }
  return `${minutes} min read`;
}
