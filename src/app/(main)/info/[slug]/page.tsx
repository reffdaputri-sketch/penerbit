import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import styles from './info.module.css';

// Revalidate the page every 60 seconds
export const revalidate = 60;

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!page || !page.content) {
    notFound();
  }

  // Convert newlines to <br/> tags for simple formatting, 
  // or dangerouslySetInnerHTML if you plan to use rich HTML editor later.
  // We'll use dangerouslySetInnerHTML here since we mentioned HTML tags in the admin helper text.
  
  // Basic newline replacement for users who just hit Enter
  const formattedContent = page.content.replace(/\n/g, '<br/>');

  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={`${styles.contentWrapper} glass-panel`}>
        <h1 className={styles.title}>{page.title}</h1>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    </div>
  );
}
